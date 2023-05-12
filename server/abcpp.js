const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });

//  joold Routes
const activityRoutes = require("./routes_old/activityRoutes");
const discountRoutes = require("./routes_old/discountRoutes");
const productsRoutes = require("./routes_old/productsRoutes");

//跨域設定
app.use(cors());
//解析POST請求的JSON主機
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//  joold 路由
app.use("/api/activity", activityRoutes);
app.use("/api/discount", discountRoutes);
app.use("/api/products", productsRoutes);

// 開始監聽
app.listen(8080, () => {
  console.log(`Server running on port 8080`);
});
