import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// Component
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ScrollTop from "./components/ScrollTop";
// Pages
import HomePage from "./pages/HomePage";
import Blog from "./pages/Blog";
import Article from "./pages/Article";
import Calculator from "./pages/Calculator";
import StorePage from "./pages/StorePage";
import GoodsPage from "./pages/GoodsPage";
import ShoppingcartPage from "./pages/ShoppingcartPage";
import FoodRecordNumber from "./pages/FoodRecordNumber";
import AdminBoard from "./pages/admin/AdminBoard";
import BackStage from "./pages/admin/BackStage";
import MemberLoginPage from "./pages/MemberLoginPage";
import MemberRegister1 from "./pages/MemberRegister1";
import MemberHomePage from "./pages/user/MemberHomePage";
import MemberChartList from "./pages/user/MemberChartList";
import MemberData from "./pages/user/MemberData";

// SCSS生成的CSS
import "./styles/all.css";

function App() {
  const [isBack, setIsBack] = useState(false);
  useEffect(() => {
    const currentPath = window.location.pathname;
    setIsBack(currentPath.startsWith("/admin"));
  }, []);

  return (
    <div>
      {/* <Nav /> */}
      <ScrollTop />

      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/store" element={<StorePage />} />
          <Route
            path="/goods/:productId/:activityid/:foodId"
            element={<GoodsPage />}
          />
          <Route path="/cart" element={<ShoppingcartPage />} />
          <Route path="/foodRecord" element={<FoodRecordNumber />} />
          <Route element={<AdminBoard />}>
            <Route path="/admin/backstage" element={<BackStage />} />
          </Route>
          {/* user page */}
          <Route path="/LoginPage" element={<MemberLoginPage />} />
          <Route path="/MemberHomePage" element={<MemberHomePage />} />
          <Route path="/MemberRegister1" element={<MemberRegister1 />} />
          <Route path="/MemberChartList" element={<MemberChartList />} />
          <Route path="/MemberData" element={<MemberData />} />
        </Routes>
      </div>
      {isBack ? "" : <Footer />}
      <ScrollTop />
    </div>
  );
}

export default App;
