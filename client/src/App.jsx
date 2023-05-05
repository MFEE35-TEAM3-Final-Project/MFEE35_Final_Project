import React from "react";
import { Routes, Route } from "react-router-dom";
// import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import "./styles/all.css";
import LoginPage from "./pages/LoginPage";
import UserProfiles from "./pages/user/UserProfile";
import UserSelfies from "./pages/user/UserSelfies";
import UserDashboard from "./pages/user/UserDashboard";
import Articles from "./pages/admin/Article";
import Food from "./pages/user/Food";

import StorePage from "./pages/StorePage";
import GoodsPage from "./pages/GoodsPage";
import ShoppingcartPage from "./pages/ShoppingcartPage";

function App() {
  return (
    <div className="App">
      <div style={{ paddingTop: "90px" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/store" element={<StorePage />} />
          <Route path="/goods" element={<GoodsPage />} />
          <Route path="/cart" element={<ShoppingcartPage />} />
          {/* user page */}
          <Route element={<UserDashboard />}>
            <Route path="/user/profile" element={<UserProfiles />} />
            <Route path="/user/selfies" element={<UserSelfies />} />
          </Route>
          <Route path="/articles" element={<Articles />} />
          <Route path="/food" element={<Food />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
