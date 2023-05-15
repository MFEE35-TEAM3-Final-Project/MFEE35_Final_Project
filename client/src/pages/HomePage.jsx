import React, { useEffect, useState } from "react";
import AOS from "aos";
import Slider from "react-slick";
import DoughnutChart from "../components/DoughnutChart copy";
import LineChart from "../components/LineChart";
import "aos/dist/aos.css";
import "../styles/homepage.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.js";

export default function HomePage() {
  useEffect(() => {
    AOS.init();
  }, []);
  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    centerMode: false,

    lazyLoad: "ondemand",
    responsive: [
      {
        breakpoint: 1652,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 528,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const [topImgWidth, setTopImgWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // 計算出當前滾動位置對應的top-img的寬度值
      const windowHeight = window.innerHeight;
      const topImgOffset = document
        .querySelector(".top-img")
        .getBoundingClientRect().top;
      const scrollDistance = windowHeight - topImgOffset;
      const maxScrollDistance = windowHeight / 1;
      const width = Math.min((scrollDistance / maxScrollDistance) * 100, 100);

      // 更新state變量
      setTopImgWidth(width);
    };

    // 監聽視窗的滾動事件
    window.addEventListener("scroll", handleScroll);
  });

  return (
    <div>
      <div className="Banner">
        <div className="decoration">
          <div className="Dtext">
            <p className="p-decoration-1">HOW TO EAT</p>
            <p className="p-decoration-2">HOW TO FITNESS</p>
            <p className="p-decoration-3">HEALTHY DIET</p>
            <p className="p-decoration-4">HEALTHY BODY</p>
          </div>
        </div>
      </div>
      <div className="Feature">
        <div className="Feature-Banner">
          <p className="Title">.FEATURE</p>
          <div
            className="recommend F-container"
            data-aos="fade-up"
            data-aos-duration="2000"
          >
            <div className="recommend-text">
              <div className="recommend-text-introduce">
                <div className="more">
                  <a href="/calculator">了解更多</a>
                </div>
              </div>
              <div className="recommend-text-introduce">
                <p>
                  基礎代謝意思是身體為了要維持運作，
                  <br />
                  在休息時消耗掉的熱量。
                  <br />
                  基礎代謝率佔了總熱量消耗的一大部分。只要你弄懂熱量赤字，減肥是可以不用挨餓。每個人每日所需的熱量都不同，取決於運動量、基因、年齡等。
                </p>
              </div>
              <div className="recommend-text-title">
                <p className="title-num">01</p>
                <p className="title-eng">Tdee Calculator</p>
                <span>
                  基礎代謝率
                  <br />
                  了解熱量消耗
                </span>
              </div>
            </div>
            <div className="recommend-img">
              <DoughnutChart />
            </div>
          </div>
          <div
            className="recommend F-container"
            data-aos="fade-up"
            data-aos-duration="2000"
          >
            <div className="recommend-text">
              <div className="recommend-text-introduce">
                <div className="more">
                  <a href="/user/selfies">了解更多</a>
                </div>
              </div>
              <div className="recommend-text-introduce">
                <p>
                  如果你有在減重或體重管理的話，除了運動之外第一個想到的就是飲食控制了。我們每天都會吃很多東西，追蹤自己每天都吃了什麼，最好的方式就是記錄起來，觀察自己的飲食情況能更有效地管理體態，分析每日攝取的營養素、卡路里。
                </p>
              </div>
              <div className="recommend-text-title">
                <p className="title-num">02</p>
                <p className="title-eng">AnalysisRecord</p>
                <span>
                  分析飲食 <br />
                  紀錄每日熱量
                </span>
              </div>
            </div>
            <div className="recommend-img line">
              <LineChart />
            </div>
          </div>
          <div
            className="recommend F-container"
            data-aos="fade-up"
            data-aos-duration="2000"
          >
            <div className="recommend-text">
              <div className="recommend-text-introduce">
                <div className="more">
                  <a href="/blog">了解更多</a>
                </div>
              </div>
              <div className="recommend-text-introduce">
                <p>
                  最基本的是三大營養素及纖維素的攝取，因此盡量選擇有全榖雜糧類、豆魚蛋肉類以及蔬菜類的餐盒。再來是看維生素礦物質，加工食物營養成分比較低，選擇以原形食物為主，減少不必要的加工以及調味。
                </p>
              </div>
              <div className="recommend-text-title">
                <p className="title-num">03</p>
                <p className="title-eng">Eating clean</p>
                <span>
                  科學飲食
                  <br />
                  了解食物影響
                </span>
              </div>
            </div>
            <div className="recommend-img" style={{ position: "relative" }}>
              <div className="top-imgbox">
                <div className="top-img" style={{ width: `${topImgWidth}%` }}>
                  <img src={require("../image/top-img.png")} alt="Top image" />
                </div>
              </div>
              <div className="bottom-img">
                <img
                  className="img-fluid"
                  src={require("../image/bottom.png")}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="benefit">
        <div className="F-container">
          <p className="Title">.BENEFIT</p>
        </div>
        <div className="L-text">Benefit</div>
        <div className="benefit-item d-flex justify-content-center">
          <div className="item-box">
            <div className="item-box-img">
              <img src={require("../image/7.png")} />
            </div>
            <div className="item-box-text">
              <span>吃的健康</span>
              <p>吃飯與健康息息相關，均衡比控制食量還重要!</p>
            </div>
          </div>
          <div className="item-box">
            <div className="item-box-img">
              <img src={require("../image/8.png")} />
            </div>
            <div className="item-box-text">
              <span>好身材</span>
              <p>
                吃對食物、吃對方法絕對是最關鍵的一步，健康吃出不易復胖的好身材!{" "}
              </p>
            </div>
          </div>
          <div className="item-box">
            <div className="item-box-img">
              <img src={require("../image/6.png")} alt="" />
            </div>
            <div className="item-box-text">
              <span>自信</span>
              <p>
                當你能掌控自己該吃進的營養，並從中獲得一些反饋，像是腰圍減少、精神狀況變好等等，自信感絕對會不斷上升!
              </p>
            </div>
          </div>
        </div>
        <div className="R-text">BeforeAfter</div>
        <div className="BA-item">
          <div className="BA-item-box">
            <img className="img-fluid" src={require("../image/beaf.jpg")} />
          </div>
          <div className="BA-item-box">
            <img className="img-fluid" src={require("../image/beaf2.jpg")} />
          </div>
          <div className="BA-item-box">
            <img className="img-fluid" src={require("../image/beaf3.jpg")} />
          </div>
          <div className="BA-item-box">
            <img className="img-fluid" src={require("../image/beaf4.jpg")} />
          </div>
        </div>
      </div>
      <div className="product">
        <div className="F-container">
          <p className="Title">.PRODUCT</p>
        </div>
        <div className="L-float">
          <span>Product</span>
        </div>
        <div style={{ height: "12vw" }}></div>
        <div className="product-item  multiple-items">
          <Slider {...settings}>
            <div className="P-item-box ">
              <a href="/">
                <div className="mask">
                  <p>可可風味能量棒</p>
                  <p>前往購買</p>
                </div>
                <img src={require("../image/product1.jpg")} />
              </a>
            </div>
            <div className="P-item-box ">
              <a href="/">
                <div className="mask">
                  <p>抹茶豌豆蛋白粉</p>
                  <p>前往購買</p>
                </div>
                <img src={require("../image/product2.jpg")} />
              </a>
            </div>
            <div className="P-item-box ">
              <a href="/">
                <div className="mask">
                  <p>低溫舒肥雞胸肉健康餐盒</p>
                  <p>前往購買</p>
                </div>
                <img src={require("../image/product3.jpg")} alt="" />
              </a>
            </div>
            <div className="P-item-box ">
              <a href="/">
                <div className="mask">
                  <p>低溫舒肥雞胸肉健康餐盒</p>
                  <p>前往購買</p>
                </div>
                <img src={require("../image/product4.jpg")} alt="" />
              </a>
            </div>
            <div className="P-item-box ">
              <a href="/">
                <div className="mask">
                  <p>低溫舒肥雞胸肉健康餐盒</p>
                  <p>前往購買</p>
                </div>
                <img src={require("../image/product5.jpg")} alt="" />
              </a>
            </div>
            <div className="P-item-box ">
              <a href="/">
                <div className="mask">
                  <p>低溫舒肥雞胸肉健康餐盒</p>
                  <p>前往購買</p>
                </div>
                <img src={require("../image/product3.jpg")} alt="" />
              </a>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
}
