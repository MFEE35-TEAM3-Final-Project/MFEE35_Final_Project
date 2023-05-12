import React from "react";
import logo from "../../images/footer/logo.png";
import insta from "../../images/footer/insta.webp";
import fb from "../../images/footer/fb.webp";
import twitter from "../../images/footer/twitter.png";
import line from "../../images/footer/line.png";

function Footer() {
  return (
    <div className="footer">
      {/* 其他 footer 內容 */}
      <div className="iconGroup">
        <img className="logoPic" src={logo} alt="LOGO" />
        <div className="socialSite">
          <a className="sitepicGroup" href="#">
            <img className="sitePic" src={insta} alt="Ins" />
          </a>
          <a className="sitepicGroup" href="#">
            <img className="sitePic" src={fb} alt="FB" />
          </a>
          <a className="sitepicGroup" href="#">
            <img className="sitePic" src={twitter} alt="Twitter" />
          </a>
          <a className="sitepicGroup" href="#">
            <img className="sitePic" src={line} alt="Line" />
          </a>
        </div>
      </div>

      <div className="siteMap">
        <div className="siteSmalltitle">網站地圖</div>
        <div>
          <hr />
        </div>
        <div className="footerSelection">
          <a className="siteText" href="">
            關於
          </a>
          <a className="siteText" href="">
            商城
          </a>
          <a className="siteText" href="">
            計算機
          </a>
          <a className="siteText" href="">
            會員專區
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
