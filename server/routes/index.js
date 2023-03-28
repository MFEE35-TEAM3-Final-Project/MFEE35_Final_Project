const express = require("express");
<<<<<<< HEAD
const router = express.Router();

// 導入其他路由模組
const usersRoutes = require("./users");

// 設定路由
router.use("/user", usersRoutes);
=======
const router = require("express").Router();

router.use((req, res, next) => {
  console.log("A request is coming in to auth.js");
  next();
});

router.get("/testAPI", (req, res) => {
  const msgObj = {
    message: "Test API is working",
  };
  return res.json(msgObj);
});
>>>>>>> caaff70bb000b850c4d589858f28f9eef0a799de

module.exports = router;
