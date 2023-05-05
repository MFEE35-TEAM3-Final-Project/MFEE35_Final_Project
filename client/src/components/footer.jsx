import React from "react";
import '../css/footer.css';

const Footer = () => {
    return (
        <div>

            <div className="footer">
                <div className="iconGroup">
                    <img className="logoPic" src="./image/store/logo.png" alt="LOGO"/>
                        <div className="socialSite">
                            <a className="sitepicGroup" href="http://localhost:3000/goods"><img className="sitePic" src="./image/store/insta.webp" alt="Ins" /></a>
                            <a className="sitepicGroup" href="http://localhost:3000/goods"><img className="sitePic" src="./image/store/fb.webp" alt="FB" /></a>
                            <a className="sitepicGroup" href="http://localhost:3000/goods"><img className="sitePic" src="./image/store/twitter.png" alt="Twitter" /></a>
                            <a className="sitepicGroup" href="http://localhost:3000/goods"><img className="sitePic" src="./image/store/line.png" alt="Line" /></a>
                        </div>
                </div>

                <div className="siteMap">
                    <div className="siteSmalltitle">網站地圖</div>
                    <div>
                        <hr/>
                    </div>
                    <div className="footerSelection">
                        <a className="siteText" href="http://localhost:3000/goods">關於</a>
                        <a className="siteText" href="http://localhost:3000/goods">商城</a>
                        <a className="siteText" href="http://localhost:3000/goods">計算機</a>
                        <a className="siteText" href="http://localhost:3000/goods">會員專區</a>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Footer;