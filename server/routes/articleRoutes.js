const express = require("express");
const router = express.Router();
const connectPool = require("../models/dbConnect");
const { promisify } = require("util");
const query = promisify(connectPool.query).bind(connectPool);
const { v4: uuidv4 } = require("uuid");
const { articleValid } = require("../models/validation");
const { userPassport, adminPassport } = require("../models/passport");

// 不須驗證的取得文章get
router.get("/", async (req, res) => {
  try {
    let { page, per_page, article_id: articleId } = req.query;

    // 確認頁數
    let perPage = parseInt(per_page) || 20;
    let nowPage = parseInt(page) || 1;
    let countSql = "SELECT COUNT(*) AS total_count FROM articles ";
    let countPrams = [];
    if (articleId) {
      countSql += "WHERE article_id = ?";
      countPrams.push(articleId);
    }
    const [{ total_count: totalCount }] = await query(countSql, countPrams);
    let totalPages = Math.ceil(totalCount / perPage);
    totalPages = totalPages === 0 ? 1 : totalPages;
    nowPage = nowPage > totalPages ? totalPages : nowPage;

    // 取得文章
    let getArticlesSql =
      "SELECT article_id, admin_id, title, is_published, created_at, updated_at FROM articles ";
    let getPrams = [];

    if (articleId) {
      getArticlesSql += "WHERE article_id = ? ";
      getPrams.push(articleId);
    }

    getArticlesSql += "ORDER BY created_at DESC ";

    if (!isNaN(nowPage) && nowPage > 0) {
      getArticlesSql += "LIMIT ? OFFSET ? ";
      getPrams.push(perPage);
      getPrams.push((nowPage - 1) * perPage);
    }
    const getResults = await query(getArticlesSql, getPrams);

    const pagination = {
      total_pages: totalPages,
      current_page: nowPage,
      per_page: perPage,
      has_pre: nowPage >= 2,
      has_next: nowPage < totalPages,
    };

    if (getResults.length === 0) {
      return res.status(404).json({
        success: false,
        message: "沒有符合的資料",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "成功取得文章",
        article_count: totalCount,
        articles: getResults,
        pagination,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "伺服器錯誤",
    });
  }
});

// 取得特定文章
router.get("/id=:article_id", async (req, res) => {
  try {
    const articleId = req.params.article_id;
    let getSql = "SELECT * FROM articles WHERE article_id = ?";
    const [getResult] = await query(getSql, [articleId]);
    if (getResult) {
      return res.status(200).json({
        success: true,
        message: "成功取得文章",
        article: getResult,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "沒有符合的文章",
      });
    }
  } catch {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "伺服器錯誤",
    });
  }
});

router.get("/article_meg/:article_id", async (req, res) => {
  try {
    const articleId = req.params.article_id;
    const getSql = "SELECT * FROM article_meg WHERE article_id = ?";
    const getResults = await query(getSql, [articleId]);
    res.status(200).json({
      success: true,
      message: "文章編輯成功",
      article_id: articleId,
      comments: getResults,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "伺服器錯誤",
    });
  }
});
module.exports = router;
