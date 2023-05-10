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
    // 取得產品資料並處理圖片欄位
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

// 計算產品的頁數
// router.get("/getProductsTotalPages", async (req, res) => {  // ch 更改路由
//   try {
//     // 計算產品總數
//     const countSql = "SELECT COUNT(*) AS count FROM onlineProducts";
//     const countResult = await query(countSql);
//     const count = countResult[0].count;

//     // 計算總共有多少頁
//     const perPage = 12;
//     //  Math.ceil() 函式將計算出的頁數向上取整 Ex 3/2 = 2
//     const totalPages = Math.ceil(count / perPage);

//     return res.json(totalPages);
//   } catch (err) {
//     console.error(err);
//     return res.sendStatus(500);
//   }
// });

// 根據 category來進行分類,若沒有帶初值為提取全部的產品
// 種類的下一頁，合再一起
router.get("/getProductsByCategory", async (req, res) => {
  try {
    const { category, page = 1 } = req.query || "";
    const limit = 12;
    const offset = (page - 1) * limit;

    if (category === "") {
      // 計算產品總數
      const countSql = "SELECT COUNT(*) AS count FROM onlineProducts";
      const countResult = await query(countSql);
      const count = countResult[0].count;
      //  Math.ceil() 函式將計算出的頁數向上取整 Ex 3/2 = 2
      const totalPages = Math.ceil(count / limit);

      const sql = "SELECT * FROM onlineProducts LIMIT ? OFFSET ?";
      const results = await query(sql, [limit, offset]);
      results.forEach((product) => {
        product.image = product.image
          .split(",")
          .filter((img) => img.trim() !== "");
      });
      return res.json({ totalPages, results });
    } else {
      // 計算產品總數
      const countSql =
        "SELECT COUNT(*) AS count FROM onlineProducts WHERE category = ?";
      const countResult = await query(countSql, [category]);
      const count = countResult[0].count;
      //  Math.ceil() 函式將計算出的頁數向上取整 Ex 3/2 = 2
      const totalPages = Math.ceil(count / limit);

      const sql =
        "SELECT * FROM onlineProducts WHERE category = ? LIMIT ? OFFSET ?";
      const results = await query(sql, [category, limit, offset]);
      results.forEach((product) => {
        product.image = product.image
          .split(",")
          .filter((img) => img.trim() !== "");
      });
      return res.json({ totalPages, results });
    }
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

// 根據 產品id來進行分類,若沒有帶初值為提取全部的產品
router.get("/getProductsById", async (req, res) => {
  try {
    const { productId } = req.query || "";
    if (productId === "") {
      const sql = "SELECT * FROM onlineProducts";
      const results = await query(sql);
      results.forEach((product) => {
        product.image = product.image
          .split(",")
          .filter((img) => img.trim() !== "");
      });
      return res.json(results);
    } else {
      const sql = "SELECT * FROM onlineProducts WHERE productId = ?";
      const results = await query(sql, [productId]);
      results.forEach((product) => {
        product.image = product.image
          .split(",")
          .filter((img) => img.trim() !== "");
      });
      return res.json(results);
    }
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

// 需帶參數page 若沒有帶初值為1 ,一次拿取12個產品(固定)
router.get("/getProductsPage", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
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
