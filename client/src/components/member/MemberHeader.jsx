import React from "react";
import { Link } from "react-router-dom";

/* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

function MemberHeader() {
  return (
    <div className="header">
      <div className="topnav">
        <a href="#">LOGO</a>
      </div>

      <nav className="navbar">
        <div id="openNavBtn" onClick={openNav}>
          ☰
        </div>
        <div id="mySidenav" className="sidenav">
          {/* <a href="javascript:void(0)" className="closebtn" onClick={closeNav}> */}
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
          <button id="signoutBtn">登出</button>
        </div>
      </nav>
    </div>
  );
}

export default MemberHeader;
