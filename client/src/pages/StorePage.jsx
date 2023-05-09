import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "../css/store.css";
import Footer from "../components/footer";

import { Helmet } from "react-helmet";

const StorePage = () => {
  // 設定初始圖片狀態
  const [isCardColumn, setIsCardColumn] = useState(false);
  const handleCardBlClick = () => {
    setIsCardColumn(true);
  };

  const handleCardLnClick = () => {
    setIsCardColumn(false);
  };

  const columnClass = isCardColumn ? "col-md-12 cardColumn" : "col-md-3";

  // 設定秒數方法
  const [second, setSecond] = useState("1");
  // 設定秒數變數
  const [numIds, setNumIds] = useState();
  // 設定圖片方法
  const [caroesel, setCarousel] = useState("");
  // 設定圖片變數
  const [images, setImages] = useState("");
  // 設定小標方法
  const [eventTitles, setEventTitle] = useState("");
  // 設定小標變數
  const [texts, setText] = useState("");
  // 設定商品圖片
  const [goodImgs, setGoodImg] = useState("");
  // 設定商品名稱
  const [goodNames, setGoodName] = useState("");
  // 設定商品敘述
  const [goodScripts, setGoodScript] = useState("");
  // 設定商品價格
  const [goodPrices, setGoodPrice] = useState("");

  // 試用哲銓的api(活動)需要帶入回傳的資料項
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/activity/getActivity`)
      .then((res) => {
        // console.log(res);
        // 從get的資料中選取活動圖片的Url陣列
        setImages(res.data.map((image) => image.activityUrl));
        // 從get的資料中選取活動標題陣列
        setEventTitle(res.data.map((eventTitle) => eventTitle.activityName));
        // 從get的資料中選取活動Id陣列
        const ids = res.data.map((numId) => numId.activityId);
        setNumIds(ids.length);
      })
      .catch((err) => {
        console.error(err);
      });

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/products/getProductsAll`)
      .then((res) => {
        console.log(res);
        setGoodImg(res.data[0].image[0]);
        setGoodName(res.data[0].name);
        setGoodScript(res.data[0].description);
        setGoodPrice(res.data[0].price);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // 環境重新渲染的function
  useEffect(() => {
    // -> 更新 numIds參數
    const intervalId = setInterval(() => {
      setSecond((prevCount) => (prevCount % numIds) + 1); // 取餘數
    }, 2000);
    // -> 更新 images參數
    setCarousel(images[second - 1]);
    // -> 更新 eventTitles參數
    setText(eventTitles[second - 1]);

    return () => clearInterval(intervalId);
  }, [second, numIds, eventTitles, images]);

  return (
    <div>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Allura&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <div className="firstP">
        <div>
          <p className="topicText">PRODUCT</p>
        </div>
        <div className="countdownContainer">
          <div className="countingIcon">
            <div className="countingNumber">{second}</div>
          </div>
          <a href="http://localhost:3000/goods" rel="noreferrer">
            <div className="changingImg">
              <img className="chPic" src={caroesel} alt="輪播圖" />
            </div>
          </a>
          <a
            className="event"
            href="http://localhost:3000/goods"
            rel="noreferrer"
            target="_blank"
          >
            {texts}
          </a>
        </div>
      </div>

      <br />
      <br />
      <br />
      <div className="goodsPge">
        <span className="drinkgoodsPge">
          <a
            className="a"
            href="http://localhost:3000/goods"
            rel="noreferrer"
            target="_blank"
          >
            乳清蛋白
          </a>
        </span>
        <span className="dietgoodsPge">
          <a
            className="b"
            href="http://localhost:3000/goods"
            rel="noreferrer"
            target="_blank"
          >
            增肌減脂套餐
          </a>
        </span>
      </div>

      <br />
      <br />
      <br />
      <br />
      <div className="mycontain">
        <div className="selectS">
          <span className="allGoods">
            <p>全站商品</p>
          </span>
          <span className="goodsQty">
            <p>共12件商品</p>
          </span>
          <span className="changegoodsWay">
            <button
              id="cardLn"
              className="squareBtn"
              onClick={handleCardLnClick}
            >
              <img
                className="squareImg"
                src="./image/store/changebtn1.png"
                alt="squarebtn"
              />
            </button>
            <button id="cardBl" className="listBtn" onClick={handleCardBlClick}>
              <img
                className="listImg"
                src="./image/store/changebtn2.webp"
                alt="listbtn"
              />
            </button>
          </span>
        </div>
        <br />
        <p id="top"></p>
        <hr />
      </div>

      <div>
        <a href="http://localhost:3000/goodstop" className="gotopBtn">
          <div className="backGroup">
            <div>
              <img
                className="arrowImg"
                src="./image/store/backToTop.png"
                alt="箭頭"
              />
            </div>
            <span>TOP</span>
          </div>
        </a>
      </div>

      <br />
      <br />
      <br />
      <br />

      <div className="container">
        <div className="row">
          {/* {data.map((item) => (
            <div key={item.id} className={columnClass}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.content}</p>
                </div>
              </div>
            </div>
          ))} */}

          <div className={columnClass}>
            <a
              href="http://localhost:3000/goods"
              rel="noreferrer"
              target="_blank"
              className="whereUsergo"
            >
              <div className="mycardIcon">
                <img id="myCard" src={goodImgs} alt="商品大圖" />
                <span className="hiddenIcon">
                  <div className="magnifierBlock">
                    <img src="./image/store/ magnifier.png" alt="放大鏡" />
                  </div>
                </span>
              </div>
            </a>

            <br />
            <a
              href="http://localhost:3000/goods"
              rel="noreferrer"
              target="_blank"
              className="whereUsergo"
            >
              <div>
                <p className="fw-semibold cardTopic">{goodNames}</p>
                <p className="cardText">{goodScripts}</p>
              </div>
            </a>

            <a
              href="http://localhost:3000/goods"
              rel="noreferrer"
              target="_blank"
              className="whereUsergo"
            >
              <span className="cardSprice">{goodPrices}</span>
              {/* <span className="cardPrice">{goodPrices}</span> */}
            </a>
          </div>
        </div>
      </div>

      <br />
      <br />
      <br />
      <br />

      <div className="nextPage">
        <a
          href="http://localhost:3000/goods"
          rel="noreferrer"
          className="nextOne"
        >
          1
        </a>
        <a
          href="http://localhost:3000/goods"
          rel="noreferrer"
          className="nextTwo"
        >
          2
        </a>
        <a
          href="http://localhost:3000/goods"
          rel="noreferrer"
          className="nextThree"
        >
          3
        </a>
      </div>

      <br />
      <br />
      <br />
      <br />

      <Footer />
    </div>
  );
};

export default StorePage;
