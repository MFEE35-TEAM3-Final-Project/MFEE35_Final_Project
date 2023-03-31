const express = require("express");
const router = express.Router();
// const dbConnect = require("../models/dbConnect");
const registerValidation = require("../models/validation").registerValidation;
const loginValidation = require("../models/validation").loginValidation;
const userRegister = require("../models/user").userRegister;

// middleware
router.use((req, res, next) => {
  console.log("A request is coming in to userRoute!");
  next();
});

// routes
router.post("/register", async (req, res) => {
  console.log("register!!");
  // 檢查傳入格式
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  // 檢查email是否已經存在
  const connection = req.app.get("connection");
  const { username, password, email } = req.body;
  const checkEmailSql = "SELECT COUNT(*) AS count FROM users WHERE email = ?";

  connection.query(checkEmailSql, [email], (err, checkResults) => {
    if (err) throw err;
    let count = checkResults[0].count;
    if (count > 0) {
      // email已存在，傳回error
      res.status(400).json({ sussecc: false, message: "email 已經存在" });
    } else {
      // email不存在，新增使用者
      let userId = Math.floor(1000000000 + Math.random() * 9000000000);
      const userData = { userId, username, password, email };
      let sql = "INSERT INTO users SET ?";
      connection.query("INSERT INTO users SET ?", userData, (err, result) => {
        const affectedRows = result.affectedRows;
        if (affectedRows === 1) {
          return res.status(201).json({
            message: `會員資料新增 ${result.affectedRows}筆 成功 ${result.insertId}`,
            userId,
          });
        }
        return res.status(500).json({ message: "無法新增會員資料" });
      });
    }
  });
});

module.exports = router;
