const express = require("express");
const router = express.Router();
const connectPool = require("../models/dbConnect");
const { promisify } = require("util");
const query = promisify(connectPool.query).bind(connectPool);
const registerValidation = require("../models/validation").registerValidation;
const loginValidation = require("../models/validation").loginValidation;
const userRegister = require("../models/user").userRegister;

// middleware
router.use((req, res, next) => {
  console.log("A request is coming in to userRoute!");
  next();
});

// routes
// async/await
router.post("/register", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    // 檢查email是否已經存在
    const checkEmailSql = "SELECT COUNT(*) AS count FROM users WHERE email = ?";
    const checkResults = await query(checkEmailSql, [email]);
    let count = checkResults[0].count;
    if (count > 0) {
      // email已存在，傳回error
      res.status(400).json({ success: false, message: "email 已經存在" });
      return;
    }
    // email不存在，新增使用者
    let userId = Math.floor(1000000000 + Math.random() * 9000000000);
    const userData = { userId, username, password, email };
    let insertSql = "INSERT INTO users SET ?";
    const result = await query(insertSql, userData);
    const affectedRows = result.affectedRows;
    if (affectedRows === 1) {
      res.status(201).json({
        success: true,
        message: `會員資料新增 ${result.affectedRows}筆 成功 ${result.insertId}`,
        userId
      });
    } else {
      res.status(500).json({ message: "無法新增會員資料" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "伺服器發生錯誤" });
  }
});

module.exports = router;
