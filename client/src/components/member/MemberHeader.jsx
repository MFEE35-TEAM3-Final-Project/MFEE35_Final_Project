import React from "react";

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
          <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>
            &times;
          </a>
          <a href="#">
            <li>首頁</li>
          </a>
          <a href="#">
            <li>會員資料</li>
          </a>
          <a href="#">
            <li>計算機</li>
          </a>
          <a href="#">
            <li>飲食紀錄</li>
          </a>
          <a href="#">
            <li>數據圖表</li>
          </a>
          <a href="#">
            <li>追蹤清單</li>
          </a>
          <a href="#">
            <li>訂單查詢</li>
          </a>
          <a href="#">
            <li>部落格</li>
          </a>
          <a href="#">
            <li>商城</li>
          </a>
        </div>
        <div className="logout">
          <button id="signoutBtn">登出</button>
        </div>
      </nav>
    </div>
  );
}

export default MemberHeader;
