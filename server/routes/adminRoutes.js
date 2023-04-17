const express = require("express");
const router = express.Router();
const connectPool = require("../models/dbConnect");
const { promisify } = require("util");
const query = promisify(connectPool.query).bind(connectPool);
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { json } = require("express");
const {
  adminRegValidation,
  adminLoginValidation
} = require("../models/validation");
const { adminPassport } = require("../models/passport");

// middleware
router.use((req, res, next) => {
  console.log("A request is coming in to AAAAAAAAAAdmin ROute!");
  next();
});

// routes
// async/await
router.post("/register", async (req, res) => {
  try {
    // 檢查傳入格式
    const { error: validError } = adminRegValidation(req.body);
    if (validError)
      return res.json({
        success: false,
        message: validError.details[0].message
      });

    const { adminname, password, email } = req.body;

    // 檢查email是否已經存在
    const checkEmailSql =
      "SELECT COUNT(*) AS count FROM admins WHERE email = ?";
    const checkResults = await query(checkEmailSql, [email]);
    let count = checkResults[0].count;
    if (count > 0) {
      // email已存在，傳回error
      res.json({ success: false, message: "email 已經存在" });
      return;
    } else {
      // email不存在
      // 密碼加密
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      // console.log(hashedPassword);
      // 新增使用者
      let adminId = Math.floor(1000000000 + Math.random() * 9000000000);
      const adminData = { adminId, adminname, password: hashedPassword, email };
      let insertSql = "INSERT INTO admins SET ?";
      const result = await query(insertSql, adminData);
      const affectedRows = result.affectedRows;
      if (affectedRows === 1) {
        res.status(201).json({
          success: true,
          message: `管理員資料新增 ${result.affectedRows}筆 成功 ${result.insertId}`,
          adminId
        });
      } else {
        res.json({ success: false, message: "無法新增管理員資料" });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "伺服器發生錯誤" });
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    // 檢查輸入參數的格式
    const { error: validError } = adminLoginValidation(req.body);
    if (validError) {
      return res.json({
        success: false,
        message: validError.details[0].message
      });
    }

    const { email, password } = req.body;
    // 檢查email是否已經存在
    const checkEmailSql = "SELECT * FROM admins WHERE email = ?";
    const checkResults = await query(checkEmailSql, [email]);
    console.log("result", checkResults);
    if (checkResults.length === 0) {
      // email不存在
      return res.json({ success: false, message: "email 不存在" });
    } else {
      const matchAdmin = checkResults[0];
      // 驗證密碼
      const isMatch = await bcrypt.compare(password, matchAdmin.password);
      if (isMatch) {
        // 密碼正確
        const tokenObj = {
          _id: matchAdmin.adminId,
          email: matchAdmin.email,
          exp: Math.floor(Date.now() / 1000) + 5
        };
        let token = jwt.sign(tokenObj, process.env.PASSPORT_SECRET);
        return res.status(200).send({
          success: true,
          message: `管理員登入成功 ID:${matchAdmin.adminId}`,
          token: "JWT " + token
        });
      } else {
        // 密碼錯誤
        return res.json({
          success: false,
          message: `密碼錯誤 ${matchAdmin.adminId}`
        });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "伺服器錯誤"
    });
  }
});

// check
router.get(
  "/check",
  adminPassport,
  (req, res) => {
    console.log("anything come this OK fn");
    return res.status(200).json({
      success: true,
      message: "已認證 Token",
      user: req.user
    });
  },
  (err, req, res, next) => {
    if (err) {
      return res.json({
        success: false,
        message: "Token 錯誤，請重新登入"
      });
    }
  }
);

module.exports = router;
