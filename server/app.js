const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

//跨域設定
app.use(cors());
//解析POST請求的JSON主機
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//路由
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

app.get("/api/users/all", (req, res) => {
  const sql = "SELECT * FROM users";
  connection.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Database error" });
      return;
    }

    res.json(results);
  });
});

// 開始監聽
app.listen(8080, () => {
  console.log(`Server running on port 8080`);
});
