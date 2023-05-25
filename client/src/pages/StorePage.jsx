import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import "../styles/store.css";
import Nav from "../components/Nav";

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
  // 設定商品陣列
  const [products, setProducts] = useState([]);
  // 設定初始頁面
  const [currentPage, setCurrentPage] = useState(1);
  // 設定使用者選取的類別
  const [userSelectWay, setUserSelectWay] = useState("全站商品");
  // 設定總頁數
  const [totalPages, setTotalPage] = useState(1);
  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // 捨
  // 設定初始類別
  const [currentCategory, setCurrentCategory] = useState("");
  // 設定初始活動
  const [currentActivity, setCurrentActivity] = useState("");

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
      .get(
        `${process.env.REACT_APP_API_URL}/api/product/getProducts?page=${currentPage}&activityId=${currentActivity}&category=${currentCategory}`
      )
      .then((res) => {
        console.log(res);
        setProducts(res.data.results);
        setTotalPage(res.data.totalPages);
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

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/product/getProducts?&activityId=${currentActivity}&category=${currentCategory}`
        // 動態生成頁數
      )
      .then((res) => {
        // console.log(res);
        setProducts(res.data.results);

        if (
          (currentPage !== 1 &&
            (currentActivity !== res.data.activityId ||
              currentCategory !== res.data.category)) ||
          (currentPage === 1 &&
            currentActivity !== res.data.activityId &&
            currentCategory !== res.data.category)
        ) {
          setCurrentPage(1);
        }
        setTotalPage(res.data.totalPages);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [currentActivity, currentCategory]);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/product/getProducts?page=${currentPage}&activityId=${currentActivity}&category=${currentCategory}`
        // 動態生成頁數
      )
      .then((res) => {
        // console.log(res);
        setProducts(res.data.results);
        setTotalPage(res.data.totalPages);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [currentPage]);
  const allProductCategory = () => {
    setCurrentCategory("");
    setCurrentActivity("");
    setUserSelectWay("全站商品");
  };
  const wheyProteinCategory = () => {
    setCurrentCategory("乳清蛋白");
    setCurrentActivity("");
    setUserSelectWay("乳清蛋白");
  };
  const gainMuscleCategory = () => {
    setCurrentCategory("雞胸肉");
    setCurrentActivity("");
    setUserSelectWay("增肌減脂套餐");
  };
  const changeActivityID = () => {
    setCurrentActivity({ second }.second);
    setUserSelectWay(eventTitles[second - 1]);
    setCurrentCategory("");
  };

  return (
    <div>
      <Nav />
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
          <Link
            to=""
            onClick={() => {
              changeActivityID();
            }}
          >
            <div className="changingImg">
              <img className="chPic" src={caroesel} alt="輪播圖" />
            </div>
          </Link>
          <Link
            to=""
            className="event"
            onClick={() => {
              changeActivityID();
            }}
          >
            {texts}
          </Link>
        </div>
      </div>
      <br />
      <br />
      <br />
      <div className="goodsPge">
        <span className="theGoodsSelectWay">
          <Link
            to=""
            className="theGoodsSelectDetail"
            onClick={() => {
              allProductCategory();
            }}
          >
            全站商品
          </Link>
        </span>
        <span className="theGoodsSelectWay">
          <Link
            to=""
            className="theGoodsSelectDetail"
            onClick={() => {
              wheyProteinCategory();
            }}
          >
            乳清蛋白
          </Link>
        </span>
        <span className="theGoodsSelectWay">
          <Link
            to=""
            className="theGoodsSelectDetail"
            onClick={() => {
              gainMuscleCategory();
            }}
          >
            增肌減脂套餐
          </Link>
        </span>
      </div>
      <br />
      <br />
      <br />
      <br />
      <div className="mycontain">
        <div className="selectS">
          <span className="goodsQty">
            共12件商品
            {/* <p>共12件商品</p> */}
          </span>
          <span className="changegoodsWay">
            <button
              id="cardLn"
              className="squareBtn"
              onClick={handleCardLnClick}
            >
              <img
                className="squareImg"
                src={require("../image/store/changebtn1.png")}
                alt="squarebtn"
              />
            </button>
            <button id="cardBl" className="listBtn" onClick={handleCardBlClick}>
              <img
                className="listImg"
                src={require("../image/store/changebtn2.webp")}
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
        <Link
          to=""
          className="gotopBtn"
          onClick={() => window.scrollTo({ top: 250, behavior: "smooth" })}
        >
          <div className="backGroup">
            <div>
              <img
                className="arrowImg"
                src={require("../image/store/backToTop.png")}
                alt="箭頭"
              />
            </div>
            <span>TOP</span>
          </div>
        </Link>
      </div>
      <br />
      <br />
      <br />
      <br />
      <div className="container">
        <div className="row">
          <h2 className="storePageSelect">
            篩選條件:
            {userSelectWay}
          </h2>
          {products.map((product) => (
            <div key={product.productid} className={columnClass}>
              <Link
                to={`/goods/${product.productid}/${product.activityId}/${product.food_id}`}
                className="whereUsergo"
              >
                <div className="mycardIcon">
                  <img id="myCard" src={product.image[0]} alt="商品大圖" />
                  <span className="hiddenIcon">
                    <div className="magnifierBlock">
                      <img
                        src={require("../image/store/magnifier.png")}
                        alt="放大鏡"
                      />
                    </div>
                  </span>
                </div>
              </Link>

              <br />
              <Link
                to={`/goods/${product.productid}/${product.activityId}/${product.food_id}`}
                className="whereUsergo"
              >
                {product.activityId === "1" ? (
                  <p className="storePageSelectOne">活動商品:畢業歡送季節</p>
                ) : (
                  ""
                )}
                {product.activityId === "2" ? (
                  <p className="storePageSelectTwo">活動商品:買一送三</p>
                ) : (
                  ""
                )}
                <div>
                  <p className="fw-semibold cardTopic">{product.name}</p>
                  <p className="cardText">{product.description}</p>
                </div>
              </Link>

              <Link
                to={`/goods/${product.productid}/${product.activityId}/${product.food_id}`}
                className="whereUsergo"
              >
                {product.activityId !== "" ? (
                  <div className="storePriceStyle">
                    <span className="cardSprice">NT$ {product.afterPrice}</span>
                    <span className="cardPrice">NT$ {product.price}</span>
                  </div>
                ) : (
                  <div className="storePriceStyle">
                    <span className="cardSprice">NT$ {product.price}</span>
                  </div>
                )}
              </Link>
            </div>
          ))}
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <div className="nextPage">
        {Array.from({ length: totalPages }, (_, i) => (
          <Link
            key={i + 1}
            to=""
            onClick={() => {
              onPageChange(i + 1);
              window.scrollTo({ top: 700, behavior: "smooth" });
            }}
            className={`next${currentPage === i + 1 ? "One" : "Two"}`}
          >
            {i + 1}
          </Link>
        ))}
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default StorePage;
