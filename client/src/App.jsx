import React from "react";
import { Routes, Route } from "react-router-dom";

// style
import "./styles/member/body.css";
import "./styles/member/main.css";
import "./styles/member/MemberHeader.css";

import "./styles/member/footer.css";

// Route
import MemberLoginPage from "./pages/MemberLoginPage";
import MemberRegister1 from "./pages/memberRegister1";
import MemberRegister2 from "./pages/memberRegister2";
import MemberHomePage from "./pages/user/MemberHomePage";
import MemberChartList from "./pages/user/MemberChartList";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/LoginPage" element={<MemberLoginPage />} />
        <Route path="/MemberHomePage" element={<MemberHomePage />} />
        <Route path="/MemberRegister1" element={<MemberRegister1 />} />
        <Route path="/MemberRegister2" element={<MemberRegister2 />} />
        <Route path="/MemberChartList" element={<MemberChartList />} />
      </Routes>
    </div>
  );
}

export default App;
