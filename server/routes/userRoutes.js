const express = require("express");
const router = express.Router();
const connectPool = require("../models/dbConnect");
const { promisify } = require("util");
const query = promisify(connectPool.query).bind(connectPool);
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { json } = require("express");
const {
  registerValidation,
  loginValidation,
  exerciseRecordsValidation,
} = require("../models/validation");
const { userPassport, adminPassport } = require("../models/passport");

// middleware
router.use((req, res, next) => {
  console.log("A request is coming in to userRoute!");
  next();
});

// routes
// async/await
router.post("/register", async (req, res) => {
  try {
    // 檢查傳入格式
    const { error: validError } = registerValidation(req.body);
    if (validError)
      return res.json({
        success: false,
        message: validError.details[0].message,
      });

    const { email, password, username, phone, address } = req.body;

    // 檢查email是否已經存在
    const checkEmailSql = "SELECT COUNT(*) AS count FROM users WHERE email = ?";
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

      // 新增使用者
      let userId = Math.floor(1000000000 + Math.random() * 9000000000);
      const userData = {
        userId,
        email,
        password: hashedPassword,
        username,
        phone,
        birthday,
        address,
      };
      let insertSql = "INSERT INTO users SET ?";
      const result = await query(insertSql, userData);
      const affectedRows = result.affectedRows;
      if (affectedRows === 1) {
        res.status(201).json({
          success: true,
          message: `會員資料新增 ${result.affectedRows}筆 成功 ${result.insertId}`,
          userId,
        });
      } else {
        res.json({ success: false, message: "無法新增會員資料" });
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
    // 檢查輸入資料的格式
    const { error: validError } = loginValidation(req.body);
    if (validError) {
      return res.json({
        success: false,
        message: validError.details[0].message,
      });
    }

    const { email, password } = req.body;
    // 檢查email是否已經存在
    const checkEmailSql = "SELECT * FROM users WHERE email = ?";
    const checkResults = await query(checkEmailSql, [email]);

    if (checkResults.length === 0) {
      // email不存在
      return res.json({ success: false, message: "email 不存在" });
    } else {
      const matchUser = checkResults[0];
      // 驗證密碼
      const isMatch = await bcrypt.compare(password, matchUser.password);
      if (isMatch) {
        // 密碼正確
        let expDate = Date.now() + 1000 * 60 * 60;
        const tokenObj = {
          _id: matchUser.userId,
          email: matchUser.email,
          exp: expDate,
        };
        let token = jwt.sign(tokenObj, process.env.PASSPORT_SECRET);

        return res.status(200).send({
          success: true,
          message: `會員登入成功`,
          userId: matchUser.userId,
          token: "JWT " + token,
          exp: expDate,
        });
      } else {
        // 密碼錯誤
        return res.json({
          success: false,
          message: `密碼錯誤 ${matchUser.userId}`,
        });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "伺服器錯誤",
    });
  }
});

// check
router.get(
  "/check",
  userPassport,
  (req, res) => {
    console.log("anything come this OK fn");
    return res.status(200).json({
      success: true,
      message: "已認證 Token",
      user: req.user,
    });
  },
  (err, req, res, next) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Token 錯誤，請重新登入",
      });
    }
  }
);

//body_specific
router.post("/exercise_records", userPassport, async (req, res) => {
  try {
    const userId = req.user[0].userId;
    const { gender, birthday, weight, height, exercise_level, record_date } =
      req.body;
    // // 檢查輸入資料的格式
    const { error: validError } = exerciseRecordsValidation(req.body);
    if (validError) {
      return res.json({
        success: false,
        message: validError.details[0].message,
      });
    }
    let recordId = uuidv4();
    const bodyData = {
      exercise_records_id: recordId,
      user_id: userId,
      gender: gender,
      birthday: birthday,
      weight: weight,
      height: height,
      exercise_level: exercise_level,
      record_date: record_date,
    };
    let insertSql = "INSERT INTO exercise_records SET ?";
    const result = await query(insertSql, bodyData);
    const affectedRows = result.affectedRows;
    console.log(result);
    if (affectedRows === 1) {
      return res.status(201).json({
        success: true,
        message: `會員體態追蹤新增 ${result.affectedRows}筆 成功 ${result.insertId}`,
        userId,
      });
    } else {
      return res.json({ success: false, message: "無法新增會員體態追蹤" });
    }
  } catch {
    return res.send("WEEEEEE");
  }
});

module.exports = router;
