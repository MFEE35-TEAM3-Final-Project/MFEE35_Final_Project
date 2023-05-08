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
          <a class="sitepicGroup" href="#">
            <img class="sitePic" src={insta} alt="Ins" />
          </a>
          <a class="sitepicGroup" href="#">
            <img class="sitePic" src={fb} alt="FB" />
          </a>
          <a class="sitepicGroup" href="#">
            <img class="sitePic" src={twitter} alt="Twitter" />
          </a>
          <a class="sitepicGroup" href="#">
            <img class="sitePic" src={line} alt="Line" />
          </a>
        </div>
      </div>

      <div class="siteMap">
        <div class="siteSmalltitle">網站地圖</div>
        <div>
          <hr />
        </div>
        <div class="footerSelection">
          <a class="siteText" href="">
            關於
          </a>
          <a class="siteText" href="">
            商城
          </a>
          <a class="siteText" href="">
            計算機
          </a>
          <a class="siteText" href="">
            會員專區
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
