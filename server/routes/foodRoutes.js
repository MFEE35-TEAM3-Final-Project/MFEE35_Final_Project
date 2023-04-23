const express = require("express");
const router = express.Router();
const connectPool = require("../models/dbConnect");
const { promisify } = require("util");
const query = promisify(connectPool.query).bind(connectPool);
const { json } = require("express");
const { error } = require("console");

// middleware
router.use((req, res, next) => {
  console.log("A request is coming in to FOOOOOD~");
  next();
});

router.get("", async (req, res) => {
  try {
    const Category = req.query.Category;
    let getResults;
    if (Category === "all") {
      let getAllCategorySql =
        "SELECT GROUP_CONCAT(DISTINCT Category ORDER BY Category) as categories FROM food";
      getResults = await query(getAllCategorySql);
      const allCategories = getResults[0].categories.split(",");
      return res.status(200).json({
        success: true,
        categories: allCategories
      });
    } else if (Category !== "") {
      let getAllCategorySql = "SELECT * FROM food WHERE Category= ?";
      getResults = await query(getAllCategorySql, [Category]);
      return res.status(200).json({
        success: true,
        results: getResults
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Nothing"
      });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
