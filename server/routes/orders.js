const express = require("express");
const router = express.Router();
const connectPool = require("../models/dbConnect");
const { promisify } = require("util");
const query = promisify(connectPool.query).bind(connectPool);
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  registerValidation,
  loginValidation,
  exerciseRecordsValidation,
  articleMegValid,
  mealRecordValid
} = require("../models/validation");
const { userPassport } = require("../models/passport");
const xss = require("xss");

// middleware
router.use((req, res, next) => {
  console.log("A request is coming in to userRoute!");
  next();
});

共用
GET / orders / search：查詢訂單 要合併
GET / orders / phone /: phone：根據電話查詢訂單 V
GET / orders / email /: email：根據 email 查詢訂單 合併
/////////////////////

// 根據訂單編號查詢單個訂單 


//根據email查詢訂單(非會員)
router.get("/orders/:email", (req, res) => {
  const email = req.params.email;
  const query = `SELECT * FROM orders WHERE email = ?`;
  db.connection.query(query, [email], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({
        success: false,
        message: "Order not found1",
      });
      return;
    }

    const order = results[0];

    const detailQuery = `SELECT * FROM order_details WHERE order_id IN ( SELECT order_id FROM orders WHERE email = ? )`;
    db.connection.query(detailQuery, [email], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({
          success: false,
          message: "Server error2",
        });
        return;
      }

      const orderWithDetails = {
        order_id: order.order_id,
        user_id: order.user_id,
        phone: order.phone,
        name: order.name,
        coupon_id: order.coupon_id,
        total_quantity: order.total_quantity,
        total_price: order.total_price,
        payment_method: order.payment_method,
        shipping_address: order.shipping_address,
        ship_store: order.ship_store,
        status: order.status,
        order_details: results,
      };

      res.status(200).json({
        success: true,
        data: orderWithDetails,
      });
    });
  });
});

module.exports = router;