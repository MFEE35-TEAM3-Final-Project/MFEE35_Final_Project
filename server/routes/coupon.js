const express = require("express");
const app = express();
const db =require("./mysql.js")
const cors = require("cors");
app.use( express.json() );
app.use( express.urlencoded( {extended: true}) );
app.use(cors());

app.listen(3000,function(){
    console.log("Connected to database.");
});
app.get("/", function(req,res) {
    res.send("Welcome");
})

app.get('/shopping_cart/:user_id', (req, res) => {
    const user_id = req.params.user_id;
  
    // 查詢購物車中所有商品
    const query = `SELECT c.user_id, c.product_id, p.name, c.quantity, p.price, (c.quantity * p.price) AS total_price
                   FROM shopping_cart AS c
                   JOIN products AS p ON c.product_id = p.product_id
                   WHERE c.user_id = ?`;
    db.connection.query(query, [user_id], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({
          success: false,
          message: "Server error"
        });
        return;
      }
  
      // 如果沒有任何商品在購物車中，則返回空陣列
      if (results.length === 0) {
        res.status(200).json({
          success: true,
          message: "該會員購物車內沒內容"
        });
        return;
      }
  
      // 將查詢結果轉換為JSON格式
      const cartItems = results.map(item => ({
        id: item.id,
        product_id: item.product_id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        totalPrice: item.total_price
      }));
  
      res.status(200).json({
        success: true,
        items: cartItems
      });
    });
  });
  

  app.post('/shopping_cart/add', (req, res) => {
    const user_id = req.body.user_id;
    const product_id = req.body.product_id;
    const quantity = req.body.quantity;
  
    // 檢查用戶ID和商品ID是否存在
    if (!user_id || !product_id) {
      res.status(400).json({
        success: false,
        message: "User ID and product ID are required"
      });
      return;
    }
  
    // 檢查數量是否大於0
    if (quantity <= 0) {
      res.status(400).json({
        success: false,
        message: "數量必須大於0"
      });
      return;
    }
  
    // 檢查是否已經存在相同的記錄
    const query = `SELECT * FROM shopping_cart WHERE user_id = ? AND product_id = ?`;
    db.connection.query(query, [user_id, product_id], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({
          success: false,
          message: "Server error "
        });
        return;
      }
  
      if (results.length > 0) {
        // 如果存在相同的記錄，更新數量
        const updateQuery = `UPDATE shopping_cart SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?`;
        db.connection.query(updateQuery, [quantity, user_id, product_id], (error, results) => {
          if (error) {
            console.error(error);
            res.status(500).json({
              success: false,
              message: "Server error "
            });
            return;
          }
  
          res.status(200).json({
            success: true,
            message: "商品數量更新成功"
          });
        });
      } else {
        // 如果不存在相同的記錄，插入新的購物車記錄
        const insertQuery = `INSERT INTO shopping_cart (user_id, product_id, quantity) VALUES (?, ?, ?)`;
        db.connection.query(insertQuery, [user_id, product_id, quantity], (error, results) => {
          if (error) {
            console.error(error);
            res.status(500).json({
              success: false,
              message: "Server error "
            });
            return;
          }
  
          res.status(200).json({
            success: true,
            message: "商品已成功加入購物車"
          });
        });
      }
    });
  });

  app.put('/shopping_cart/change', (req, res) => {
    const user_id = req.body.user_id;
    const product_id = req.body.product_id;
    const quantity = req.body.quantity;
  
  
    // 檢查數量是否大於0
    if (quantity <= 0) {
      res.status(400).json({
        success: false,
        message: "數量必須大於0"
      });
      return;
    }
  
    // 檢查是否已經存在相同的記錄
    const query = `SELECT * FROM shopping_cart WHERE user_id = ? AND product_id = ?`;
    db.connection.query(query, [user_id, product_id], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({
          success: false,
          message: "Server error "
        });
        return;
      }
  
      if (results.length > 0) {
        // 如果存在相同的記錄，更新數量
        const updateQuery = `UPDATE shopping_cart SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?`;
        db.connection.query(updateQuery, [quantity, user_id, product_id], (error, results) => {
          if (error) {
            console.error(error);
            res.status(500).json({
              success: false,
              message: "Server error "
            });
            return;
          }
  
          res.status(200).json({
            success: true,
            message: "商品數量更新成功"
          });
        });
      } else {
        // 如果不存在相同的記錄，插入新的購物車記錄
        const insertQuery = `INSERT INTO shopping_cart (user_id, product_id, quantity) VALUES (?, ?, ?)`;
        db.connection.query(insertQuery, [user_id, product_id, quantity], (error, results) => {
          if (error) {
            console.error(error);
            res.status(500).json({
              success: false,
              message: "Server error "
            });
            return;
          }
  
          res.status(200).json({
            success: true,
            message: "商品已成功加入購物車"
          });
        });
      }
    });
  });

  app.delete("/shopping_cart/delete/:product_id", (req, res) => {
    const user_id = req.body.user_id;
    const product_id = req.params.product_id;
  
    // 刪除購物車記錄
    const query = `DELETE FROM shopping_cart WHERE product_id = ? AND user_id = ?`;
    db.connection.query(query, [product_id,user_id], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({
          success: false,
          message: "Server error"
        });
        return;
      }
      if (results.affectedRows === 0) {
        // 購物車記錄不存在
        res.status(404).json({
          success: false,
          message: "Product not found in cart"
        });
        return;
      }
  
      res.status(200).json({
        success: true,
        message: "Product deleted from cart successfully"
      });
    });
  });
  