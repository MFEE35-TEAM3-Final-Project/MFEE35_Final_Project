const express = require("express");
const router = express.Router();

// 導入其他路由模組
const usersRoutes = require("./users");

// 設定路由
router.use("/user", usersRoutes);

module.exports = router;
