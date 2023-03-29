const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const userRoutes = require("./routes/userRoutes");

//跨域設定
app.use(cors());
//解析POST請求的JSON主機
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//connect to mysql server

// const connection = mysql.createConnection({
//   host: process.env.RDS_HOSTNAME,
//   user: process.env.RDS_USERNAME,
//   password: process.env.RDS_PASSWORD,
//   port: process.env.RDS_PORT,
//   database: process.env.RDS_DB_NAME,
// });

// connection.connect((err) => {
//   if (err) {
//     console.error("Database connection failed: " + err.stack);
//     return;
//   }
//   console.log("connect to database");
// });

//路由
app.use("/api/user", userRoutes);

// app.get("/api/users", (req, res) => {
//   const sql = "SELECT * FROM users";
//   connection.query(sql, (err, results) => {
//     if (err) {
//       console.error(err);
//       res.status(500).json({ error: "Database error" });
//       return;
//     }

//     res.json(results);
//   });
// });

// 開始監聽
app.listen(8080, () => {
  console.log(`Server running on port 8080`);
});
