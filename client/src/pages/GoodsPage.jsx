import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import DoughnutComponent from "../components/DoughnutChart";
import Cookies from "js-cookie";
import "../styles/goods.css";
import "../styles/cartPromptBox.css";
import Nav from "../components/Nav";
import { ToastContainer, toast } from "react-toastify";
import { FaHeart } from "react-icons/fa";

const GoodsPage = () => {
  // 會員驗證的TOKEN
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
  // 設定網頁上方區塊
  const [goodArea, setGoodArea] = useState(null);
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
        console.log(res);
        setOnlyOneProducts(res.data);
        const newData = res.data;
        setImageList(newData[0].image); // 有4個URL
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
        console.log(res);
        // setPromotionGood(res.data.results);
        const testGood = res.data.results;
        const carolId = res.data.results.map((food_id) => food_id.food_id);
        console.log(carolId);

        const updatedData = [];
        const promises = [];

        carolId.forEach((foodId) => {
          const promise = axios
            .get(
              `${process.env.REACT_APP_API_URL}/api/food/search?food_id=${foodId}`
            )
            .then((res) => {
              const updatedFood = {
                calories_adjusted: res.data.calories_adjusted,
              };
              updatedData.push(updatedFood);
              console.log(updatedData);
            })
            .catch((err) => {
              console.error(err);
            });

          promises.push(promise);
        });

        Promise.all(promises)
          .then(() => {
            console.log(testGood);
            const myNewData = testGood.map((foodId, index) => {
              return {
                ...foodId,
                calories_adjusted: updatedData[index].calories_adjusted,
              };
            });

            console.log(myNewData);
            setPromotionGood(myNewData);
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    const goodDetailInfo = onlyOneProducts.map((onlyOneProduct, index) => {
      return (
        <Fragment key={index}>
          <div className="goodsCard myGoodscontain">
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
                {ImageList.map((imageUrl, index) => (
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
                {onlyOneProduct.activityId === "1" ? (
                  <div>
                    <div className="goodsTitle">
                      <div>
                        <p className="activityTitleOne">
                          活動商品:畢業歡送季節
                        </p>
                        <p className="activityName">{onlyOneProduct.name}</p>
                      </div>
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
                    <div className="goodsTitle">
                      <div>
                        <p className="activityTitleTwo">
                          活動商品:買一送三買一送三
                        </p>
                        <p className="activityName">{onlyOneProduct.name}</p>
                      </div>
                    </div>
                    <h2 className="goodsName">建議售價</h2>
                    <span className="goodsPrice">
                      NT$ {onlyOneProduct.afterPrice}
                    </span>

                    <span className="goodsSPrice">
                      NT$ {onlyOneProduct.price}
                    </span>
                  </div>
                )}
              </div>
              <div className="chooseTheGoodQuantity">
                <button className="increaseBtn" onClick={handleDecrease}>
                  一
                </button>
                <input
                  className="addingQty"
                  type="text"
                  value={quantity}
                  onChange={handleChange}
                />
                <button className="increaseBtn" onClick={handleIncrease}>
                  十
                </button>
              </div>
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
                >
                  立即購買
                </Link>
              </div>
              <br />
              <br />
              <button className="joinFollow" onClick={handleAddToFavorite}>
                <FaHeart className="heartIcon" />
                &nbsp;&nbsp; 加入最愛
              </button>
            </div>
          </div>
        </Fragment>
      );
    });
    setGoodArea(goodDetailInfo);
  }, [ImageList, onlyOneProducts, activeImageIndex, quantity]);

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

  const handleAddToCart = () => {
    if (token) {
      console.log("我要使用API囉");
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/user/cart/add`, {
          productid: productid,
          quantity: quantity,
        })
        .then(() => {
          toast.success("已成功加入購物車");
          // axios
          //   .get(`${process.env.REACT_APP_API_URL}/api/user/cart`)
          //   .then((res) => {
          //     console.log(res);
          //     const cartInfoElements = res.data.data.map((cartInfo, index) => (
          //       <div key={index}>
          //         <div>
          //           <img
          //             className="goodPic"
          //             src={cartInfo.image[0]}
          //             alt="第一個商品圖"
          //           />
          //         </div>
          //         {cartInfo.activityId !== "0" ? (
          //           <div className="goodText">
          //             <br />
          //             <span className="inActivityTitle">活動商品</span>
          //             <p className="goodName">{cartInfo.name}</p>
          //             <br />
          //             <br />
          //             <span className="goodPrice">
          //               NT$ {cartInfo.afterPrice}
          //             </span>
          //             <span className="goodSprice">NT$ {cartInfo.price}</span>
          //           </div>
          //         ) : (
          //           <div className="goodText">
          //             <br />
          //             <p className="goodName">{cartInfo.name}</p>
          //             <br />
          //             <br />
          //             <p className="goodPrice">NT$ {cartInfo.price}</p>
          //           </div>
          //         )}
          //         <Link to={`/store`}>點我進入商城</Link>
          //       </div>
          //     ));
          //     toast.info(<React.Fragment>{cartInfoElements}</React.Fragment>);
          //   })
          //   .catch((err) => {
          //     console.error(err);
          //   });
        })
        .catch((err) => {
          if (err.response.status === 400) {
            toast.warning(err.response.data.message);
          }
        });
    } else {
      const expires = 7;

      // 從 cookies 取得之前的購物車資料
      // const cartDataFromCookie = Cookies.get("cartData");
      //   let existingCartData = [];
      //   if (cartDataFromCookie) {
      //     existingCartData = JSON.parse(cartDataFromCookie);
      //   }

      //   // 將新的資料加入進去
      //   const addingCartData = {
      //     productid: productid,
      //     quantity: quantity,
      //   };
      //   existingCartData.push(addingCartData);

      //   // 將整個購物車資料更新回 cookies
      //   Cookies.set("cartData", JSON.stringify(existingCartData), { expires });
      //   setCartData(existingCartData);
      //   toast.success("已成功加入購物車");
      //   console.log(existingCartData);
      // }
      const cartDataFromCookie = Cookies.get("cartData");
      let existingCartData = [];

      if (cartDataFromCookie) {
        existingCartData = JSON.parse(cartDataFromCookie);

        // 检查是否存在相同的 productId
        const existingProductIndex = existingCartData.findIndex(
          (item) => item.productid === productid
        );

        if (existingProductIndex !== -1) {
          // 如果存在相同的 productId，只更新数量
          existingCartData[existingProductIndex].quantity += quantity;
        } else {
          // 如果不存在相同的 productId，将新数据加入购物车
          const addingCartData = {
            productid: productid,
            quantity: quantity,
          };
          existingCartData.push(addingCartData);
        }
      } else {
        // 如果不存在购物车数据，直接将新数据加入购物车
        const addingCartData = {
          productid: productid,
          quantity: quantity,
        };
        existingCartData.push(addingCartData);
      }

      // 将整个购物车数据更新回 cookie
      Cookies.set("cartData", JSON.stringify(existingCartData), { expires });
      setCartData(existingCartData);
      toast.success("已成功加入購物車");
      console.log(existingCartData);
    }
  };
  const handleAddToFavorite = () => {
    if (token) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/user/favorite`, {
          productid: productid,
        })
        .then((res) => {
          toast.success("已成功加入追蹤清單");
        })
        .catch((err) => {
          if (err.response.status === 400) {
            toast.warning("追蹤清單中已存在該商品");
          }
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
      // console.log(typeof value);
    }
  };

  const handleButtonClick = () => {
    toast.success("Hello, World!");
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
      <ToastContainer />
      <div className="goodstype">
        <div className="diet">
          <a href="http://localhost:3000/store" className="myDiet">
            增肌減脂餐盒
          </a>
        </div>
        <div className="drink">
          <a href="http://localhost:3000/store" className="myDrink">
            乳清蛋白
          </a>
        </div>
      </div>
      {goodArea}
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
        {onlyOneProducts.map((onlyOneProduct, index) => (
          <div key={index}>
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
          .map((promotionGood, index) => (
            <div key={index} className="myGoodscontain recomGoods">
              <Link
                to={`http://localhost:3000/goods/${promotionGood.productid}/${promotionGood.activityId}/${promotionGood.food_id}`}
                className="jumpPage"
                target="_blank"
              >
                <div className="cardContainerInGoodPage">
                  <img
                    id="myGoodCard"
                    src={promotionGood.image[0]}
                    alt="推播圖1"
                  />
                  <p className="theCarolInPicture">
                    卡路里:&nbsp;{promotionGood.calories_adjusted}
                    &nbsp;Cal
                  </p>
                </div>
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
