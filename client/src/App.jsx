import React from "react";
import { Routes, Route } from "react-router-dom";

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
  return (
    <div className="App">
      <ScrollTop />
      <Routes>
        <Route path="/LoginPage" element={<MemberLoginPage />} />
        <Route path="/MemberHomePage" element={<MemberHomePage />} />
        <Route path="/MemberRegister1" element={<MemberRegister1 />} />
        <Route path="/MemberRegister2" element={<MemberRegister2 />} />
        <Route path="/MemberChartList" element={<MemberChartList />} />
        <Route path="/MemberData" element={<MemberData />} />
      </Routes>
    </div>
  );
}

export default App;
