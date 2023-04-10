import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
// import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import Aboutpage from "./pages/Aboutpage";
import UserRegister from "./pages/user/UserRegister";
import "./styles/all.css";
import UserLogin from "./pages/user/UserLogin";
import AdminProfile from "./pages/admin/AdminProfile";

function App() {
  return (
    <div className="App">
      <Nav />
      <div style={{ paddingTop: "90px" }}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<Aboutpage />} />
          <Route path="/user/register" element={<UserRegister />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
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
