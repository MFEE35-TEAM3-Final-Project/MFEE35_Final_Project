import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import DoughnutComponent from "../components/DoughnutChart";
import Cookies from "js-cookie";
import "../styles/goods.css";
import Nav from "../components/Nav";

const GoodsPage = () => {
  const token = Cookies.get("jwtToken");
  // 設定取得的商品ID、食物ID
  const { productid, foodId } = useParams();
  // 設定取得的商品
  const [onlyOneProducts, setOnlyOneProducts] = useState([]);
  // 設定取得的食物成份
  const [onlyOneFoods, setOnlyOneFoods] = useState([]);
  // 設定可點選的4張圖片陣列
  const [ImageList, setImageList] = useState([]);
  // 設定圖片陣列的index
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  // 設定加入購物車的數量
  const [quantity, setQuantity] = useState(1);
  // 設定推薦商品
  const [promotionGoods, setPromotionGood] = useState([]);
  // 將推薦商品設定為亂數
  const shuffledGoods = promotionGoods.sort(() => Math.random() - 0.5); //亂數
  // 捨定cookie的值
  const [cartData, setCartData] = useState([]);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/product/getProductsById?productId=${productid}`
      )
      .then((res) => {
        // console.log(res);
        setOnlyOneProducts(res.data);
        setImageList(res.data[0].image);
      })
      .catch((err) => {
        console.error(err);
      });
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/food/search?food_id=${foodId}`)
      .then((res) => {
        // console.log(res);
        setOnlyOneFoods(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/product/getProducts`)
      .then((res) => {
        // console.log(res);
        setPromotionGood(res.data.results);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  useEffect(() => {
    setQuantity(1);
  }, [productid]);

  const prevButtonHandler = () => {
    setActiveImageIndex((prevIndex) => {
      let newIndex = prevIndex - 1;
      if (newIndex < 0) {
        newIndex = ImageList.length - 1;
      }
      return newIndex;
    });
  };

  // const handleAddToCart = async () => {
  //   try {
  //     const token =
  //       "JWT  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI5NzMxMTAzMzMxIiwiZW1haWwiOiJBQUFBQUJCQkBnbWFpbC5jb20iLCJleHAiOjE2OTI4NDU5NTU2NzAsImlhdCI6MTY4NDIwNTk1NX0.Ya7Sg_71ioS9swW3C03OG82Xvci5NuSxp-0kNjRTG8g";
  //     axios.defaults.headers.common["Authorization"] = `${token}`;
  //     const response = await axios.post(
  //       `${process.env.REACT_APP_API_URL}/api/user/cart/add`,
  //       {
  //         productid: productid,
  //         quantity: quantity,
  //       }
  //     );
  //     console.log(response);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleAddToCart = () => {
    // const token =
    //   "JWT  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI5NzMxMTAzMzMxIiwiZW1haWwiOiJBQUFBQUJCQkBnbWFpbC5jb20iLCJleHAiOjE2OTI4NDU5NTU2NzAsImlhdCI6MTY4NDIwNTk1NX0.Ya7Sg_71ioS9swW3C03OG82Xvci5NuSxp-0kNjRTG8g";
    axios.defaults.headers.common["Authorization"] = `${token}`;
    let x = axios.defaults.headers.common["Authorization"];
    if (x) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/user/cart/add`, {
          productid: productid,
          quantity: quantity,
        })
        .then((res) => {
          // console.log(res);
          alert("已成功加入購物車");
          window.location.reload();
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      const expires = 7;

      // 從 cookies 取得之前的購物車資料
      const cartDataFromCookie = Cookies.get("cartData");
      let existingCartData = [];
      if (cartDataFromCookie) {
        existingCartData = JSON.parse(cartDataFromCookie);
      }

      // 將新的資料加入進去
      const addingCartData = {
        productid: productid,
        quantity: quantity,
      };
      existingCartData.push(addingCartData);

      // 將整個購物車資料更新回 cookies
      Cookies.set("cartData", JSON.stringify(existingCartData), { expires });
      setCartData(existingCartData);
    }
  };
  const handleAddToFavorite = () => {
    // const token =
    //   "JWT  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI5NzMxMTAzMzMxIiwiZW1haWwiOiJBQUFBQUJCQkBnbWFpbC5jb20iLCJleHAiOjE2OTI4NDU5NTU2NzAsImlhdCI6MTY4NDIwNTk1NX0.Ya7Sg_71ioS9swW3C03OG82Xvci5NuSxp-0kNjRTG8g";
    axios.defaults.headers.common["Authorization"] = `${token}`;
    let x = axios.defaults.headers.common["Authorization"];
    if (x) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/user/favorite`, {
          productid: productid,
        })
        .then((res) => {
          // console.log(res);
          alert("已加入最愛清單");
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      alert("請先登入");
    }
  };

  const nextButtonHandler = () => {
    setActiveImageIndex((prevIndex) => {
      let newIndex = prevIndex + 1;
      if (newIndex > ImageList.length - 1) {
        newIndex = 0;
      }
      return newIndex;
    });
  };
  const handleImageClick = (index) => {
    setActiveImageIndex(index);
  };
  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleChange = (event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value)) {
      setQuantity(value);
    }
  };

  // const handleDeleteCartData = () => {
  //   Cookies.remove("cartData");
  //   setCartData([]);
  // };

  return (
    <div>
      <Nav />
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Allura&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      {/* <h1>
        商品頁面 - 商品 ID：{productid} 跟 食物 ID{foodId}
      </h1> */}
      {/* <h1>
        <button onClick={handleDeleteCartData}>刪除購物車資料</button>
      </h1> */}
      <div className="goodstype">
        <div className="diet">
          <a href="http://localhost:3000/goods" className="myDiet">
            增肌減脂餐盒
          </a>
        </div>
        <div className="drink">
          <a href="http://localhost:3000/goods" className="myDrink">
            乳清蛋白
          </a>
        </div>
      </div>
      {onlyOneProducts.map((onlyOneProduct, indexA) => (
        <div key={indexA} className="goodsCard myGoodscontain">
          <div className="goodsImage">
            <div className="bigGroup">
              <button className="prevBtn" onClick={prevButtonHandler}>
                ＜
              </button>
              <img
                src={onlyOneProduct.image[[activeImageIndex]]}
                className="bigImage"
                alt="大圖"
              />
              <button className="nextBtn" onClick={nextButtonHandler}>
                ＞
              </button>
            </div>
            <div className="smallGroup">
              {ImageList.filter(
                (imageUrl) =>
                  imageUrl !== onlyOneProduct.image[activeImageIndex]
              ).map((imageUrl, index) => (
                <img
                  key={index}
                  src={imageUrl}
                  className={`smallImage ${
                    index === activeImageIndex && "active"
                  }`}
                  data-target={imageUrl}
                  alt="小圖"
                  onClick={() => handleImageClick(index)}
                />
              ))}
            </div>
          </div>
          <div className="goodsText">
            <div className="gGroup">
              {onlyOneProducts.activityId !== "" ? (
                <div>
                  <div className="goodsTitle">
                    <span className="activityTitle">活動商品:</span>
                    <span className="activityName">{onlyOneProduct.name}</span>
                  </div>
                  <h2 className="goodsName">建議售價</h2>
                  <span className="goodsPrice">
                    NT$ {onlyOneProduct.afterPrice}
                  </span>

                  <span className="goodsSPrice">
                    NT$ {onlyOneProduct.price}
                  </span>
                </div>
              ) : (
                <div>
                  <p>{onlyOneProduct.name}</p>
                  <h2 className="goodsName">建議售價</h2>
                  <span className="goodsSPrice">
                    NT$ {onlyOneProduct.price}
                  </span>
                </div>
              )}
            </div>
            <button id="deBtn" className="increaseBtn" onClick={handleDecrease}>
              一
            </button>
            <div className="addingQty">
              <input
                type="text"
                id="addGoods"
                value={quantity}
                onChange={handleChange}
              />
            </div>
            <button id="inBtn" className="increaseBtn" onClick={handleIncrease}>
              十
            </button>
            <br />
            <br />
            <div className="addingGroup">
              <button className="cartIn" onClick={handleAddToCart}>
                加入購物車
              </button>
              <Link
                to={"/cart"}
                rel="stylesheet"
                className="buyIn"
                onClick={handleAddToCart}
                style={{ textDecoration: "none", color: "white" }}
              >
                立即購買
              </Link>
              {/* <button className="buyIn" onClick={handleAddToCart}>立即購買</button> */}
            </div>
            <br />
            <br />
            <button className="joinFollow" onClick={handleAddToFavorite}>
              <img src={require("../image/goods/heart.png")} alt="最愛" />
              加入最愛
            </button>
          </div>
        </div>
      ))}
      <br />
      <br />
      <br />
      <div className="myGoodscontain mygoodsExplain">
        <div className="mygoodsIntro">商品介紹</div>
        <div className="mygoodsSave">保存方式</div>
      </div>
      <br />
      <br />
      <br />
      <div className="myGoodscontain">
        <div className="gIntro">
          <p className="sTopic">商品介紹</p>
        </div>
        {onlyOneProducts.map((onlyOneProduct, indexB) => (
          <div key={indexB}>
            <p className="sParagraph">{onlyOneProduct.description}</p>
          </div>
        ))}
      </div>
      <br />
      <br />
      <br />
      <div className="myGoodscontain nutriChart">
        <DoughnutComponent foodId={foodId} productId={productid} />
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="myGoodscontain">
        <div className="gIntro">
          <p className="sTopic">保存方式</p>
        </div>
        {onlyOneProducts.map((onlyOneProduct, indexC) => (
          <div key={indexC}>
            <p className="sParagraph">{onlyOneProduct.storage_method}</p>
          </div>
        ))}
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="recommendBar">
        {shuffledGoods
          .map((promotionGood, indexD) => (
            <div key={indexD} className="myGoodscontain recomGoods">
              <Link
                to={`http://localhost:3000/goods/${promotionGood.productid}/${promotionGood.activityId}/${promotionGood.food_id}`}
                className="jumpPage"
              >
                <img
                  id="myGoodCard"
                  src={promotionGood.image[0]}
                  alt="推播圖1"
                />
                <p className="fw-semibold cardTopic">{promotionGood.name}</p>
                {promotionGood.activityId !== "" ? (
                  <div>
                    <span className="mycardSPrice">
                      NT$ {promotionGood.afterPrice}
                    </span>
                    <span className="mycardPrice">{promotionGood.price}</span>
                  </div>
                ) : (
                  <span className="mycardPrice">NT$ {promotionGood.price}</span>
                )}
              </Link>
            </div>
          ))
          .slice(0, 4)}
      </div>
    </div>
  );
};

export default GoodsPage;
