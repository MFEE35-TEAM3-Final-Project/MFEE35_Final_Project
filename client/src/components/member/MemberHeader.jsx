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
      Cookies.remove("authToken");
      // 重置用戶相關狀態或資料
      setToken("");
      // 導向登出後的頁面（例如返回登入頁面）

      navigate("/LoginPage");
    }
  };

  return (
    <div className="memberHeader">
      <div className="memberTopnav">
        <a href="#">LOGO</a>
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
            <li>會員首頁</li>
          </Link>
          <Link to="/MemberData">
            <li>會員資料</li>
          </Link>
          <Link to="/calculator">
            <li>計算機</li>
          </Link>
          <Link to="/diet-record">
            <li>飲食紀錄</li>
          </Link>
          <Link to="/MemberChartList">
            <li>數據圖表</li>
          </Link>
          <Link to="/tracking-list">
            <li>追蹤清單</li>
          </Link>
          <Link to="/order-history">
            <li>訂單查詢</li>
          </Link>
          <Link to="/blog">
            <li>部落格</li>
          </Link>
          <Link to="/shop">
            <li>商城</li>
          </Link>
        </div>
        <div className="logout">
          <button id="membersignoutBtn" onClick={handleLogout}>
            登出
          </button>
        </div>
      </nav>
    </div>
  );
}

export default MemberHeader;
