const express = require("express");
const router = express.Router();
const connectPool = require("../models/dbConnect");
const { promisify } = require("util");
const query = promisify(connectPool.query).bind(connectPool);

// middleware
router.use((req, res, next) => {
  console.log("有人要瀏覽商品清單了喔~");
  next();
});

// 瀏覽全部的商品清單
router.get("/getProductsAll", async (req, res) => {
  try {
    const sql = "SELECT * FROM onlineProducts";
    const results = await query(sql);
    results.forEach((product) => {
      product.image = product.image
        .split(",")
        .filter((img) => img.trim() !== "");
    });

    return res.json(results);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

// 瀏覽第一頁商品清單，每頁12個品項
router.get("/getProductsPage", async (req, res) => {
// router.get("/getProductsPage?page=1", async (req, res) => {
  try {
    // page如果沒有給參數，會自動帶入初始值 = 1; 1代表第一頁的產品共有12個 (1-12)，如果帶入2代表會是第二頁的產品 13-24
    const page = parseInt(req.query.page) || 1;
    // 限制一次get 12個
    const limit = 12;
    const offset = (page - 1) * limit;
    const sql = `SELECT * FROM onlineProducts LIMIT ${limit} OFFSET ${offset};`;
    const results = await query(sql);
    results.forEach((product) => {
      product.image = product.image
        .split(",")
        .filter((img) => img.trim() !== "");
    });

    return res.json(results);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

module.exports = router;
