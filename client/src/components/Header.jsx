import React, { useEffect } from "react";
import "../styles/header.css";

function Header() {
  useEffect(() => {
    /* Set the width of the side navigation to 250px */
    function openNav() {
      const mySidenav = document.getElementById("mySidenav");
      if (mySidenav) {
        mySidenav.style.width = "250px";
      }
    }

    /* Set the width of the side navigation to 0 */
    let closeNav = () => {
      const mySidenav = document.getElementById("mySidenav");
      if (mySidenav) {
        mySidenav.style.width = "0";
      }
    };

    const openNavBtn = document.getElementById("openNavBtn");
    const closeBtn = document.querySelector("#mySidenav .closebtn");

    if (openNavBtn && closeBtn) {
      openNavBtn.addEventListener("click", openNav);
      closeBtn.addEventListener("click", closeNav);
    }

    return () => {
      if (openNavBtn && closeBtn) {
        openNavBtn.removeEventListener("click", openNav);
        closeBtn.removeEventListener("click", closeNav);
      }
    };
  }, []);

  // useEffect(() => {
  //   /* Set the width of the side navigation to 250px */
  //   function openNav() {
  //     document.getElementById("mySidenav").style.width = "250px";
  //   }

  //   /* Set the width of the side navigation to 0 */
  //   let closeNav = () => {
  //     document.getElementById("mySidenav").style.width = "0";
  //   };

  //   document.getElementById("openNavBtn").addEventListener("click", openNav);
  //   document
  //     .getElementById("mySidenav")
  //     .querySelector(".closebtn")
  //     .addEventListener("click", closeNav);

  //   return () => {
  //     document
  //       .getElementById("openNavBtn")
  //       .removeEventListener("click", openNav);
  //     document
  //       .getElementById("mySidenav")
  //       .querySelector(".closebtn")
  //       .removeEventListener("click", closeNav);
  //   };
  // }, []);

  return (
    <div className="header">
      <div className="topnav">
        <a href="https://www.google.com.tw/">LOGO</a>
      </div>
      <nav className="navbar">
        <div id="openNavBtn">☰</div>
        <div id="mySidenav" className="sidenav">
          <a href="https://www.google.com.tw/" className="closebtn">
            &times;
          </a>
          <a href="https://www.google.com.tw/">
            <li>首頁</li>
          </a>
          <a href="https://www.google.com.tw/">
            <li>會員資料</li>
          </a>
          <a href="https://www.google.com.tw/">
            <li>計算機</li>
          </a>
          <a href="https://www.google.com.tw/">
            <li>飲食紀錄</li>
          </a>
          <a href="https://www.google.com.tw/">
            <li>數據圖表</li>
          </a>
          <a href="https://www.google.com.tw/">
            <li>追蹤清單</li>
          </a>
          <a href="https://www.google.com.tw/">
            <li>訂單查詢</li>
          </a>
          <a href="https://www.google.com.tw/">
            <li>部落格</li>
          </a>
          <a href="https://www.google.com.tw/">
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

export default Header;
