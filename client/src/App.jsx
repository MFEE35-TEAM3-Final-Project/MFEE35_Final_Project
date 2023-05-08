import React from "react";
import { Routes, Route } from "react-router-dom";
// import Nav from "./components/Nav";
// import Footer from "./components/Footer";
// import HomePage from "./pages/HomePage";
// import RegisterPage from "./pages/RegisterPage";
// import "./styles/all.css";
// import LoginPage from "./pages/LoginPage";
// import UserProfiles from "./pages/user/UserProfile";
// import UserSelfies from "./pages/user/UserSelfies";
// import UserDashboard from "./pages/user/UserDashboard";
// import Articles from "./pages/admin/Article";
// import Food from "./pages/user/Food";

// style
import "./styles/membercss/body.css";
import "./styles/membercss/main.css";
import "./styles/membercss/MemberHeader.css";
import "./styles/membercss/memberHome.css";
import "./styles/membercss/user_foodRecord.css";
import "./styles/membercss/footer.css";

// Route
import MemberHome from "./pages/user/MemberHome";

function App() {
  return (
    <div className="App">
      {/* <Nav /> */}
      {/* <div style={{ paddingTop: "90px" }}> */}
      <Routes>
        <Route path="/" element={<MemberHome />} />
        {/* <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} /> */}
        {/* user page */}
        {/* <Route element={<UserDashboard />}>
            <Route path="/user/profile" element={<UserProfiles />} />
            <Route path="/user/selfies" element={<UserSelfies />} />
          </Route>
          <Route path="/articles" element={<Articles />} />
          <Route path="/food" element={<Food />} /> */}
      </Routes>
      {/* </div> */}
      {/* <Footer /> */}
    </div>
  );
}

export default App;
