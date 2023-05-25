import React from "react";
import { Link } from "react-router-dom";
import "../styles/footer.css";

const footer = () => {
  return (
    <div id="footer">
      <div className="footer">
        <div className="iconGroup">
          <img
            className="logoPic"
            src={require("../image/logo-black.png")}
            alt="LOGO"
          />
          <div className="socialSite">
            <Link className="sitepicGroup" to="#">
              <img
                className="sitePic"
                src={require("../image/footer/insta.webp")}
                alt="Ins"
              />
            </Link>
            <Link className="sitepicGroup" to="#">
              <img
                className="sitePic"
                src={require("../image/footer/fb.webp")}
                alt="FB"
              />
            </Link>
            <Link className="sitepicGroup" to="#">
              <img
                className="sitePic"
                src={require("../image/footer/twitter.png")}
                alt="Twitter"
              />
            </Link>
            <Link className="sitepicGroup" to="#">
              <img
                className="sitePic"
                src={require("../image/footer/line.png")}
                alt="Line"
              />
            </Link>
          </div>
        </div>

        <div className="siteMap">
          <div className="siteSmalltitle">網站地圖</div>
          <div>
            <hr />
          </div>
          <div className="footerSelection">
            <Link className="siteText" to="#">
              關於
            </Link>
            <Link className="siteText" to="#">
              商城
            </Link>
            <Link className="siteText" to="#">
              計算機
            </Link>
            <Link className="siteText" to="#">
              會員專區
            </Link>
            <a className="siteText" href="/admin/backstage">
              管理員專區
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default footer;
