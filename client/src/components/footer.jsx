import React from "react";
import "../styles/footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8">
          <div>網站地圖</div>
          <div>
            <a href="https://www.notion.so/API-d1f95cd8d0b346a3a973ca2ec52297cf">
              關於
            </a>
            <a href="https://www.notion.so/API-d1f95cd8d0b346a3a973ca2ec52297cf">
              商城
            </a>
            <a href="https://www.notion.so/API-d1f95cd8d0b346a3a973ca2ec52297cf">
              計算機
            </a>
            <a href="https://www.notion.so/API-d1f95cd8d0b346a3a973ca2ec52297cf">
              會員專區
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
