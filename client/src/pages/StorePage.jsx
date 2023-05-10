import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import "../css/store.css";
import Footer from "../components/footer";

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
  // 設定初始類別
  const [currentCategory, setCurrentCategory] = useState("");

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
        `${process.env.REACT_APP_API_URL}/api/products/getProductsByCategory?page=${currentPage}&category=${currentCategory}`
      )
      .then((res) => {
        // console.log(res);
        setProducts(res.data.results);
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
        `${process.env.REACT_APP_API_URL}/api/products/getProductsByCategory?page=${currentPage}&category=${currentCategory}`
      )
      .then((res) => {
        console.log(res);
        setProducts(res.data.results);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [currentPage, currentCategory]);

  const PageOne = () => {
    setCurrentPage(1);
  };
  const PageTwo = () => {
    setCurrentPage(2);
  };
  const PageThree = () => {
    setCurrentPage(3);
  };
  const PageFour = () => {
    setCurrentPage(4);
  };
  const PageFive = () => {
    setCurrentPage(5);
  };
  const allProductCategory = () => {
    setCurrentCategory("");
  };
  const wheyProteinCategory = () => {
    setCurrentCategory(1);
  };
  const gainMuscleCategory = () => {
    setCurrentCategory(2);
  };

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
          <Link
            to=""
            className="a"
            onClick={() => {
              allProductCategory();
            }}
          >
            全站商品
          </Link>
        </span>
        <span className="drinkgoodsPge">
          <Link
            to=""
            className="a"
            onClick={() => {
              wheyProteinCategory();
            }}
          >
            乳清蛋白
          </Link>
        </span>
        <span className="dietgoodsPge">
          <Link
            to=""
            className="b"
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
        <a href="http://localhost:3000/store" className="gotopBtn">
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
          {products.map((product) => (
            <div key={product.productid} className={columnClass}>
              <Link
                to="http://localhost:3000/goods/:id"
                className="whereUsergo"
              >
                <div className="mycardIcon">
                  <img id="myCard" src={product.image[0]} alt="商品大圖" />
                  <span className="hiddenIcon">
                    <div className="magnifierBlock">
                      <img src="./image/store/ magnifier.png" alt="放大鏡" />
                    </div>
                  </span>
                </div>
              </Link>

              <br />
              <Link
                to="http://localhost:3000/goods/:id"
                className="whereUsergo"
              >
                <div>
                  <p className="fw-semibold cardTopic">{product.name}</p>
                  <p className="cardText">{product.description}</p>
                </div>
              </Link>

              <Link
                to="http://localhost:3000/goods/:id" // id = ?  product:food ==> foodid
                className="whereUsergo"
              >
                <span className="cardSprice">{product.price}</span>
                {/* <span className="cardPrice">{goodPrices}</span> */}
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
        <Link
          to=""
          className={`next${currentPage === 1 ? "One" : "Two"}`}
          onClick={() => {
            PageOne();
          }}
        >
          1
        </Link>
        <Link
          to=""
          className={`next${currentPage === 2 ? "One" : "Two"}`}
          onClick={() => {
            PageTwo();
          }}
        >
          2
        </Link>
        <Link
          to=""
          className={`next${currentPage === 3 ? "One" : "Two"}`}
          onClick={() => {
            PageThree();
          }}
        >
          3
        </Link>
        <Link
          to=""
          className={`next${currentPage === 4 ? "One" : "Two"}`}
          onClick={() => {
            PageFour();
          }}
        >
          4
        </Link>
        <Link
          to=""
          className={`next${currentPage === 5 ? "One" : "Two"}`}
          onClick={() => {
            PageFive();
          }}
        >
          5
        </Link>
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
