import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Nav from "./components/Nav";
// import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import RegisterPage from "./pages/RegisterPage";
import "./styles/all.css";
import LoginPage from "./pages/LoginPage";
import UserProfiles from "./pages/user/UserProfile";
import UserSelfies from "./pages/user/UserSelfies";
import UserDashboard from "./pages/user/UserDashboard";

function App() {
  return (
    <div className="App">
      <Nav />
      <div style={{ paddingTop: "90px" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* user page */}
          <Route element={<UserDashboard />}>
            <Route path="/user/profile" element={<UserProfiles />} />
            <Route path="/user/selfies" element={<UserSelfies />} />
          </Route>
        </Routes>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
