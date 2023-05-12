import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

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
import Articles from "./pages/admin/Article";
import Food from "./pages/user/Food";

function App() {
  const [isBack, setIsBack] = useState(false);
  useEffect(() => {
    const currentPath = window.location.pathname;
    setIsBack(currentPath.startsWith("/admin"));
  }, []);

  return (
    <div className="App">
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
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
          <Route path="/foodRecord" element={<FoodRecordNumber />} />
        </Routes>
      </div>
      {isBack ? "" : <Footer />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/store" element={<StorePage />} />
        <Route
          path="/goods/:productId/:activityid/:foodId"
          element={<GoodsPage />}
        />
        <Route path="/cart" element={<ShoppingcartPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
