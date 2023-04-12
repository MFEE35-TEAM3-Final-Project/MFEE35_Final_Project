import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
// import Footer from "./components/Footer";
import Homepage from "./pages/HomePage";
import Aboutpage from "./pages/AboutPage";
import RegisterPage from "./pages/RegisterPage";
import "./styles/all.css";
import LoginPage from "./pages/LoginPage";
import UserProfiles from "./pages/user/UserProfiles";
// import UserDashboard from "./pages/user/UserDashboard";

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
          <Route element={<ProtectedRoutes />}>
            <Route path="/user/profile" element={<UserProfiles />} />
          </Route>
          {/* <Route path="/user/*" element={<Dashboard />}>
            <Route path="register" element={<UserRegister />} />
            <Route path="login" element={<UserLogin />} />
          </Route> */}
        </Routes>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
