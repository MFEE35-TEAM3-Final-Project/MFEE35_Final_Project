import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// Component
import Nav from "./components/Nav";
import Footer from "./components/Footer";
// Pages
import HomePage from "./pages/HomePage";
import Blog from "./pages/blog";
import Article from "./pages/Article";
import Calculator from "./pages/Calculator";
import StorePage from "./pages/StorePage";
import GoodsPage from "./pages/GoodsPage";
import ShoppingcartPage from "./pages/ShoppingcartPage";

import "./styles/all.css";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import UserProfiles from "./pages/user/UserProfile";
import UserSelfies from "./pages/user/UserSelfies";
import UserDashboard from "./pages/user/UserDashboard";
// import Articles from "./pages/admin/Article";
import Food from "./pages/user/Food";

// style
import "./styles/member/main.css";
import "./styles/member/MemberHeader.css";
import "./styles/member/footer.css";
import "./styles/member/user_foodRecord.css";
import "./styles/member/memberHome.css";
import "./styles/member/userinfo.css";
import "./styles/member/chartlist.css";

// Route
import MemberLoginPage from "./pages/MemberLoginPage";
import MemberRegister1 from "./pages/MemberRegister1";
import MemberRegister2 from "./pages/MemberRegister2";
import MemberHomePage from "./pages/user/MemberHomePage";
import MemberChartList from "./pages/user/MemberChartList";
import MemberData from "./pages/user/MemberData";
import ScrollTop from "./components/ScrollTop";

function App() {
  const [isBack, setIsBack] = useState(false);
  useEffect(() => {
    const currentPath = window.location.pathname;
    setIsBack(currentPath.startsWith("/admin"));
  }, []);

  return (
    <div className="App">
      <Nav />
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
          <Route path="/MemberRegister2" element={<MemberRegister2 />} />
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
