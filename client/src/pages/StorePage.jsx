import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Cookies from "js-cookie";
import axios from "axios";
import "../styles/store.css";
import Nav from "../components/Nav";

const StorePage = () => {
  const category = Cookies.get("category");
  const [isCardColumn, setIsCardColumn] = useState(false);
  const handleCardBlClick = () => {
    setIsCardColumn(true);
  };
  const handleCardLnClick = () => {
    setIsCardColumn(false);
  };
  const columnClass = isCardColumn ? "col-md-12 cardColumn" : "col-md-3";
  const [activityInfo, setActivityInfo] = useState([]);
  const [second, setSecond] = useState("1");
  const [numIds, setNumIds] = useState(0);
  const [carousel, setCarousel] = useState("");
  const [images, setImages] = useState([]);
  const [eventTitles, setEventTitle] = useState("");
  const [texts, setText] = useState("");
  const [products, setProducts] = useState([]);
  const [goodsOnPage, setGoodsOnPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [userSelectWay, setUserSelectWay] = useState("全站商品");
  const [totalPages, setTotalPage] = useState(1);
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentActivity, setCurrentActivity] = useState("");
  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const activityResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/activity/getActivity`
        );
        const activityData = activityResponse.data;
        const activityUrls = activityData.map((image) => image.activityUrl);
        const activityNames = activityData.map((event) => event.activityName);

        console.log(activityData);
        setActivityInfo(activityData);
        setImages(activityUrls);
        setEventTitle(activityNames);
        setNumIds(activityData.length);

        if (category) {
          const userCategory = JSON.parse(category);
          const productResponse = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/product/getProducts?category=${userCategory}`
          );
          const productData = productResponse.data;

          setProducts(productData.results);
          setTotalPage(productData.totalPages);

          if (userCategory === "乳清蛋白") {
            setCurrentCategory("乳清蛋白");
            setUserSelectWay("乳清蛋白");
          } else if (userCategory === "雞胸肉") {
            setCurrentCategory("雞胸肉");
            setUserSelectWay("雞胸肉");
          } else {
            setUserSelectWay("全站商品");
          }
          setCurrentActivity("");
        } else {
          const productResponse = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/product/getProducts`,
            {
              params: {
                page: currentPage,
                activityId: currentActivity,
                category: currentCategory,
              },
            }
          );
          const productData = productResponse.data;
          setProducts(productData.results);
          setTotalPage(productData.totalPages);
        }
        Cookies.remove("category");
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const updatePageAndCategory = (page = 1, category = "", activity = "") => {
    setCurrentPage(page);
    setCurrentCategory(category);
    setCurrentActivity(activity);
  };

  const allProductCategory = () => {
    updatePageAndCategory(1, "", "");
    setUserSelectWay("全站商品");
  };

  const wheyProteinCategory = () => {
    updatePageAndCategory(1, "乳清蛋白", "");
    setUserSelectWay("乳清蛋白");
  };

  const gainMuscleCategory = () => {
    updatePageAndCategory(1, "雞胸肉", "");
    setUserSelectWay("雞胸肉");
  };

  const changeActivityID = () => {
    setCurrentActivity(second.toString());
    setUserSelectWay(eventTitles[second - 1]);
    setCurrentCategory("");
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSecond((prevCount) => (prevCount % numIds) + 1);
    }, 2000);

    setCarousel(images[second - 1]);
    setText(eventTitles[second - 1]);

    return () => clearInterval(intervalId);
  }, [second, numIds, eventTitles, images]);

  useEffect(() => {
    // console.log(products);
    const storePageProduct = products.map((product, index) => (
      <Fragment key={index}>
        <div className={columnClass}>
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
            <br />
          </Link>
          <Link
            to={`/goods/${product.productid}/${product.activityId}/${product.food_id}`}
            className="whereUsergo textingBox"
          >
            {activityInfo.map((activity, index) => {
              if (product.activityId === activity.activityId) {
                return (
                  <p key={index} className="storePageSelectOne">
                    活動: {activity.activityName}
                  </p>
                );
              }
              return null;
            })}
            <div className="theDecoration">
              <p className="fw-semibold cardTopic">{product.name}</p>
              <p className="cardText">{product.description}</p>
            </div>
          </Link>
          <Link
            to={`/goods/${product.productid}/${product.activityId}/${product.food_id}`}
            className="whereUsergo priceBox"
          >
            <div className="storePriceStyle">
              {product.activityId !== "" && (
                <>
                  <span className="cardSprice">NT$ {product.afterPrice}</span>
                  <span className="cardPrice">NT$ {product.price}</span>
                </>
              )}
              {product.activityId === "" && (
                <span className="cardSprice">NT$ {product.price}</span>
              )}
            </div>
          </Link>
        </div>
      </Fragment>
    ));

    setGoodsOnPage(storePageProduct);
  }, [products, isCardColumn]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/product/getProducts`, {
        params: {
          page: currentPage,
          activityId: currentActivity,
          category: currentCategory,
        },
      })
      .then((res) => {
        if (res.data.results.length === 0) {
          setCurrentPage(1);
        }
        setProducts(res.data.results);
        setTotalPage(res.data.totalPages);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [currentPage, currentActivity, currentCategory]);

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
              window.scrollTo({ top: 1000, behavior: "smooth" });
            }}
          >
            <div className="changingImg">
              <img className="chPic" src={carousel} alt="輪播圖" />
            </div>
          </Link>
          <Link
            to=""
            className="event"
            onClick={() => {
              changeActivityID();
              window.scrollTo({ top: 250, behavior: "smooth" });
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
              gainMuscleCategory();
            }}
          >
            雞胸肉
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
      </div>
      <br />
      <br />
      <br />
      <br />
      <div className="mycontain">
        <div className="selectS">
          <span className="goodsQty">共{products.length}件商品</span>
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

          {goodsOnPage}
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
