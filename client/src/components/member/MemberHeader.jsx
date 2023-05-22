import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Cookies from "js-cookie";

import "../../../src/styles/member/MemberHeader.css";

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

function MemberHeader() {
  const [token, setToken] = useState("");
  const navigate = useNavigate(); // 新增此行

  const handleLogout = () => {
    const confirmLogout = window.confirm("確定要登出嗎？");
    if (confirmLogout) {
      // 在這裡處理登出邏輯
      // 清除本地存儲的身份驗證憑證
      Cookies.remove("jwtToken");
      // 重置用戶相關狀態或資料
      setToken("");
      // 導向登出後的頁面（例如返回登入頁面）

      navigate("/LoginPage");
    }
  };

  return (
    <div className="memberHeader">
      <div className="memberTopnav">
        <Link to="/">
          <img
            src={require("../../image/logo/logo.png")}
            alt="logo"
            id="memberNavLogo"
          />
        </Link>
      </div>

      <nav className="navbar">
        <div id="openMemberNavBtn" onClick={openNav}>
          ☰
        </div>
        <div id="mySidenav" className="memberSidenav">
          <a href="#" className="closebtn" onClick={closeNav}>
            &times;
          </a>
          <Link to="/MemberHomePage">
            <li className="memberNavList">會員首頁</li>
          </Link>
          <Link to="/MemberData">
            <li className="memberNavList">會員資料</li>
          </Link>
          <Link to="/calculator">
            <li className="memberNavList">計算機</li>
          </Link>
          <Link to="/foodRecord">
            <li className="memberNavList">飲食紀錄</li>
          </Link>
          <Link to="/MemberChartList">
            <li className="memberNavList">數據圖表</li>
          </Link>
          <Link to="/MemberFav">
            <li className="memberNavList">追蹤清單</li>
          </Link>
          <Link to="/MemberOrders">
            <li className="memberNavList">訂單查詢</li>
          </Link>
          <Link to="/blog">
            <li className="memberNavList">部落格</li>
          </Link>
          <Link to="/store">
            <li className="memberNavList">商城</li>
          </Link>
        </div>
        <div className="logout">
          <button
            id="membersignoutBtn"
            onClick={handleLogout}
            style={{ fontSize: "28px" }}
          >
            登出
          </button>
        </div>
      </nav>
    </div>
  );
}

export default MemberHeader;
