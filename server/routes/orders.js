

app.listen(3000, function () {
  console.log("Connected to database.");
});


// 新增訂單 加上非會員 會員 中加上token




// -------------------------------------------------------------

//修改訂單 
app.put("/orders/:order_id", (req, res) => {
  const orderId = req.params.order_id;
  const { phone, name, coupon_id, total_quantity, total_price, payment_method, shipping_address, ship_store, status } = req.body;
  const query = `UPDATE orders SET phone = ?, name = ?, coupon_id = ?, total_quantity = ?, total_price = ?, payment_method = ?, shipping_address = ?, ship_store = ?, status = ? WHERE order_id = ?`;
  pool.connection.query(query, [phone, name, coupon_id, total_quantity, total_price, payment_method, shipping_address, ship_store, status, orderId], (error, results) => {
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
