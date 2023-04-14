import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Nav from "./components/Nav";
// import Footer from "./components/Footer";
import Homepage from "./pages/HomePage";
import Aboutpage from "./pages/AboutPage";
import RegisterPage from "./pages/RegisterPage";
import "./styles/all.css";
import LoginPage from "./pages/LoginPage";
import UserDashboard from "./pages/user/UserDashboard";
import UserProfile from "./pages/user/UserProfile";
import UserSelfies from "./pages/user/UserSelfies";
import PrivateRoute from "./components/PrivateRoute";
import UserProfilesCopy from "./pages/user/UserProfile copy";

function App() {
  return (
    <div className="App">
      <Nav />
      <div style={{ paddingTop: "90px" }}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<Aboutpage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* 登入使用者且為會員 */}
          <Route element={<UserDashboard redirectPath="/login" />}>
            <Route path="/user/profile" element={<UserProfile />} />
            <Route path="/user/selfies" element={<UserSelfies />} />
          </Route>
          {/* 登入使用者且為會員 v2 */}
          {/* <PrivateRoute path="/user/profile" element={<UserProfile />} /> */}
          <Route path="/user/profile2" element={<UserProfilesCopy />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
