const express = require("express");
const app = express();
const db = require("./mysql")
const cors = require("cors");
const { v4: uuidv4 } = require('uuid');
// const { userPassport, adminPassport } = require('../models/passport.js');
// const jwt = require("jsonwebtoken");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.listen(3000, function () {
  console.log("Connected to database.");
});


// 新增訂單 加上非會員 會員 中加上token
app.post('/orders', (req, res) => {
  // 從請求中取得訂單資料
  const { user_id, phone, name, coupon_id, total_quantity, total_price, payment_method, shipping_address, ship_store, order_details } = req.body;
  const status = 'created';

  // 產生UUID作為order_id
  const order_id = uuidv4();

  // 將訂單資料插入到orders資料表中
  const add_order_sql = "INSERT INTO orders (order_id, user_id, phone, name, coupon_id, total_quantity, total_price, payment_method, shipping_address, ship_store, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const order_values = [order_id, user_id, phone, name, coupon_id, total_quantity, total_price, payment_method, shipping_address, ship_store, status];
  db.connection.query(add_order_sql, order_values, (err, result) => {
    if (err) throw err;

    // 將訂單商品細節插入到order_detail資料表中
    order_details.forEach(detail => {
      const { product_id, quantity, price } = detail;
      const add_detail_sql = "INSERT INTO order_details (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)";
      const detail_values = [order_id, product_id, quantity, price];
      db.connection.query(add_detail_sql, detail_values, (err, result) => {
        if (err) throw err;

        // 更新product資料表中的庫存數量
        const update_product_sql = "UPDATE products SET stock_quantity = stock_quantity - ? WHERE product_id = ?";
        const update_values = [quantity, product_id];
        db.connection.query(update_product_sql, update_values, (err, result) => {
          if (err) throw err;
        });
      });
    });

    // 回傳新增訂單的order_id
    res.status(201).json({ order_id });
  });
});


//查詢全部訂單 須加上 會員驗證/管理員驗證
app.get("/orders", (req, res) => {
  const query = `SELECT * FROM orders`;
  db.connection.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: results,
    });
  });
});


//會員查詢訂單 
app.get("/users/:user_id/orders", (req, res) => {
  const user_id = req.params.user_id;
  const query = `SELECT * FROM orders WHERE user_id = ?`;
  db.connection.query(query, [user_id], (error, results) => {
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
        message: "Order not found",
      });
      return;
    }

    const orders = [];

    results.forEach((order) => {
      const detailQuery = `SELECT * FROM order_details WHERE order_id = ?`;
      db.connection.query(detailQuery, [order.order_id], (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).json({
            success: false,
            message: "Server error",
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

        orders.push(orderWithDetails);

        if (orders.length === results.length) {
          res.status(200).json({
            success: true,
            data: orders,
          });
        }
      });
    });
  });
});

//會員查詢單個訂單 
app.get("/users/:user_id/orders/:order_id", (req, res) => {
  const user_id = req.params.user_id;
  const order_id = req.params.order_id;
  const query = `SELECT * FROM orders WHERE user_id = ? AND order_id = ?`;
  db.connection.query(query, [user_id, order_id], (error, results) => {
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
        message: "Order not found",
      });
      return;
    }

    const order = results[0];

    const detailQuery = `SELECT * FROM order_details WHERE order_id = ?`;
    db.connection.query(detailQuery, [order.order_id], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({
          success: false,
          message: "Server error",
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

// 根據訂單編號查詢單個訂單 
app.get("/users/:user_id/orders", (req, res) => {
  const user_id = req.params.user_id;
  const query = `SELECT * FROM orders WHERE user_id = ?`;
  db.connection.query(query, [user_id], (error, results) => {
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
        message: "Order not found",
      });
      return;
    }

    const orders = [];

    results.forEach((order) => {
      const detailQuery = `SELECT * FROM order_details WHERE order_id = ?`;
      db.connection.query(detailQuery, [order.order_id], (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).json({
            success: false,
            message: "Server error",
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

        orders.push(orderWithDetails);

        if (orders.length === results.length) {
          res.status(200).json({
            success: true,
            data: orders,
          });
        }
      });
    });
  });
});

//根據電話查詢訂單(非會員)
app.get("/orders/phone/:phone", (req, res) => {
  const phone = req.params.phone;
  const query = `SELECT * FROM orders WHERE phone = ?`;
  db.connection.query(query, [phone], (error, results) => {
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

    const detailQuery = `SELECT * FROM order_details WHERE order_id IN ( SELECT order_id FROM orders WHERE phone = ? )`;
    db.connection.query(detailQuery, [phone], (error, results) => {
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

//根據email查詢訂單(非會員)
app.get("/orders/order/:email", (req, res) => {
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

//根據狀態來查詢訂單(管理員)
app.get("/orders/status/:status", (req, res) => {
  const status = req.params.status;
  const query = `SELECT * FROM orders WHERE status = ?`;
  db.connection.query(query, [status], (error, results) => {
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
        message: "Order not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: results,
    });
  });
});


//根據訂單時間來查詢
app.get("/orders/date/:start/:end", (req, res) => {
  const start = req.params.start;
  const end = req.params.end;
  const query = `SELECT * FROM orders WHERE order_time BETWEEN ? AND ?`;
  db.connection.query(query, [start, end], (error, results) => {
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
        message: "Order not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: results,
    });
  });
});

//根據產品來查詢訂單
app.get("/orders/product/:product_id", (req, res) => {
  const product_id = req.params.product_id;
  const query = `
    SELECT orders.*, order_details.* 
    FROM orders 
    INNER JOIN order_details ON orders.order_id = order_details.order_id 
    WHERE order_details.product_id = ?`;
  db.connection.query(query, [product_id], (error, results) => {
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
        message: "Order not found",
      });
      return;
    }

    const orders = {};

    results.forEach((row) => {
      const order_id = row.order_id;

      if (!orders[order_id]) {
        orders[order_id] = {
          order_id: order_id,
          user_id: row.user_id,
          phone: row.phone,
          name: row.name,
          coupon_id: row.coupon_id,
          total_quantity: row.total_quantity,
          total_price: row.total_price,
          payment_method: row.payment_method,
          shipping_address: row.shipping_address,
          ship_store: row.ship_store,
          status: row.status,
          order_details: [],
        };
      }

      const order_detail = {
        order_detail_id: row.order_detail_id,
        product_id: row.product_id,
        quantity: row.quantity,
        price: row.price,
      };

      orders[order_id].order_details.push(order_detail);
    });

    res.status(200).json({
      success: true,
      data: Object.values(orders),
    });
  });
});


// -------------------------------------------------------------

//修改訂單 
app.put("/orders/:order_id", (req, res) => {
  const orderId = req.params.order_id;
  const { phone, name, coupon_id, total_quantity, total_price, payment_method, shipping_address, ship_store, status } = req.body;
  const query = `UPDATE orders SET phone = ?, name = ?, coupon_id = ?, total_quantity = ?, total_price = ?, payment_method = ?, shipping_address = ?, ship_store = ?, status = ? WHERE order_id = ?`;
  db.connection.query(query, [phone, name, coupon_id, total_quantity, total_price, payment_method, shipping_address, ship_store, status, orderId], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Order updated successfully",
    });
  });
});

// 刪除訂單 根據訂單編號
app.delete("/orders/:order_id", (req, res) => {
  const orderId = req.params.order_id;

  const detailQuery = "DELETE FROM order_details WHERE order_id = ?";
  db.connection.query(detailQuery, [orderId], (error, detailResults) => {
    if (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
      return;
    }

    const orderQuery = "DELETE FROM orders WHERE order_id = ?";
    db.connection.query(orderQuery, [orderId], (error, orderResults) => {
      if (error) {
        console.error(error);
        res.status(500).json({
          success: false,
          message: "Server error",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Order deleted successfully",
      });
    });
  });
});
