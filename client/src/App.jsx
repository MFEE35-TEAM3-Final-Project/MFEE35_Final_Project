import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import "./styles/Nav.css";
// import Footer from "./components/Footer";
// import HomePage from "./pages/HomePage";

import StorePage from "./pages/StorePage";
import GoodsPage from "./pages/GoodsPage";
import ShoppingcartPage from "./pages/ShoppingcartPage";

import "./styles/all.css";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import UserProfiles from "./pages/user/UserProfile";
import UserSelfies from "./pages/user/UserSelfies";
import UserDashboard from "./pages/user/UserDashboard";
// import Articles from "./pages/admin/Article";
import Food from "./pages/user/Food";
import Blog from "./pages/blog";
import Calculator from "./pages/Calculator";
import Article from "./pages/Article";
// style
import "./styles/member/main.css";
import "./styles/member/MemberHeader.css";
import "./styles/member/footer.css";
import "./styles/member/user_foodRecord.css";
import "./styles/member/memberHome.css";
import "./styles/member/userinfo.css";
import "./styles/member/chartlist.css";
import "bootstrap/dist/css/bootstrap.css";

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
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* user page */}
          <Route path="/articles" element={<Articles />} />
          <Route path="/food" element={<Food />} />
          <Route element={<UserDashboard />}>
            <Route path="/user/profile" element={<UserProfiles />} />
            <Route path="/user/selfies" element={<UserSelfies />} />
          </Route>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<AdminBoard />}>
            <Route path="/admin/backstage" element={<BackStage />} />
          </Route>
          <Route path="/articles" element={<Articles />} />
          <Route path="/food" element={<Food />} />
          <Route path="/foodRecord" element={<FoodRecordNumber />} />{" "}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/store" element={<StorePage />} />
          <Route
            path="/goods/:productId/:activityid/:foodId"
            element={<GoodsPage />}
          />
          <Route path="/cart" element={<ShoppingcartPage />} />{" "}
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
