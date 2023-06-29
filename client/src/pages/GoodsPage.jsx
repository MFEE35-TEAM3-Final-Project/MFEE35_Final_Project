import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import DoughnutComponent from "../components/DoughnutChart";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import { FaHeart } from "react-icons/fa";
import "../styles/goods.css";
import Nav from "../components/Nav";

const GoodsPage = () => {
  // 會員驗證的TOKEN
  const token = Cookies.get("jwtToken");
  const { productid, foodId } = useParams();
  const [onlyOneProducts, setOnlyOneProducts] = useState([]);
  const [ImageList, setImageList] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activityInfo, setActivityInfo] = useState([]);

  // 設定推薦商品
  const [promotionGoods, setPromotionGood] = useState([]);
  // 將推薦商品設定為亂數 => 需要比較Id後把重複的拿掉
  const shuffledGoods = promotionGoods.sort(() => Math.random() - 0.5); //亂數

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/product/getProductsById`,
          {
            params: {
              productId: productid,
            },
          }
        );
        const newData = response1.data[0];
        // console.log(newData);
        setOnlyOneProducts(newData);
        setImageList(newData.image); // 有4個URL
        setActiveImageIndex(0);
        setQuantity(1);

        const response2 = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/activity/getActivity`
        );
        const activityData = response2.data;
        // console.log(activityData);
        setActivityInfo(activityData);

        const response3 = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/product/getProducts`
        );
        const testGood = response3.data.results;
        const carolId = response3.data.results.map(
          (food_id) => food_id.food_id
        );

        const updatedData = [];
        const promises = [];

        carolId.forEach((foodId) => {
          const promise = axios
            .get(`${process.env.REACT_APP_API_URL}/api/food/search`, {
              params: {
                food_id: foodId,
              },
            })
            .then((res) => {
              const updatedFood = {
                calories_adjusted: res.data.Calories_adjusted,
              };
              updatedData.push(updatedFood);
            })
            .catch((err) => {
              console.error(err);
            });

          promises.push(promise);
        });

        Promise.all(promises)
          .then(() => {
            const filteredData = testGood
              .filter((foodId, index) => {
                return !productid.includes(foodId.productid);
              })
              .map((foodId, index) => ({
                ...foodId,
                calories_adjusted: updatedData[index].calories_adjusted,
              }));

            setPromotionGood(filteredData);
          })
          .catch((err) => {
            console.error(err);
          });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [productid]);

  const workPlace = activityInfo.map((activity, index) => {
    if (onlyOneProducts.activityId === activity.activityId) {
      if (activity.activityId === "1") {
        return (
          <p key={index} className="storePageSelectOne">
            {activity.activityName}
          </p>
        );
      } else if (activity.activityId === "2") {
        return (
          <p key={index} className="storePageSelectTwo">
            {activity.activityName}
          </p>
        );
      }
    }
    return null;
  });

  const prevButtonHandler = () => {
    setActiveImageIndex((prevIndex) => {
      let newIndex = prevIndex - 1;
      if (newIndex < 0) {
        newIndex = ImageList.length - 1;
      }
      return newIndex;
    });
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

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    if (token) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/user/cart/add`, {
          productid,
          quantity,
        })
        .then(() => {
          toast.success("已成功加入購物車");
        })
        .catch((err) => {
          err.response.status === 400 &&
            toast.warning(err.response.data.message);
        });
    } else {
      const expires = 7;
      const existingCartData = getExistingCartData(productid, quantity);

      Cookies.set("cartData", JSON.stringify(existingCartData), { expires });
      toast.success("已成功加入購物車");
    }
  };

  const getExistingCartData = (productid, quantity) => {
    const cartDataFromCookie = Cookies.get("cartData");
    let existingCartData = cartDataFromCookie
      ? JSON.parse(cartDataFromCookie)
      : [];

    const existingProductIndex = existingCartData.findIndex(
      (item) => item.productid === productid
    );

    if (existingProductIndex !== -1) {
      existingCartData[existingProductIndex].quantity += quantity;
    } else {
      existingCartData.push({ productid, quantity });
    }

    return existingCartData;
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

  const handleImageClick = (index) => {
    setActiveImageIndex(index);
  };

  const doGoToHomepage = (category) => {
    Cookies.set("category", JSON.stringify(category));
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
          <a
            href="http://localhost:3000/store"
            className="myDiet"
            onClick={() => doGoToHomepage("")}
          >
            全站商品
          </a>
        </div>
        <div className="diet">
          <a
            href="http://localhost:3000/store"
            className="myDiet"
            onClick={() => doGoToHomepage("雞胸肉")}
          >
            雞胸肉
          </a>
        </div>
        <div className="drink">
          <a
            href="http://localhost:3000/store"
            className="myDrink"
            onClick={() => doGoToHomepage("乳清蛋白")}
          >
            乳清蛋白
          </a>
        </div>
      </div>

      <div className="goodsCard myGoodscontain">
        <div className="goodsImage">
          <div className="bigGroup">
            <button className="prevBtn" onClick={prevButtonHandler}>
              ＜
            </button>
            <img
              src={ImageList[[activeImageIndex]]}
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
            <div>
              <div className="goodsTitle">
                <div>
                  {workPlace}
                  <p className="activityName">{onlyOneProducts.name}</p>
                </div>
              </div>
              <h2 className="goodsName">建議售價</h2>
              {onlyOneProducts.activityId !== "" ? (
                <Fragment>
                  <span className="goodsPrice">
                    NT$ {onlyOneProducts.afterPrice}
                  </span>

                  <span className="goodsSPrice">
                    NT$ {onlyOneProducts.price}
                  </span>
                </Fragment>
              ) : (
                <span className="goodsPrice">
                  NT$ {onlyOneProducts.afterPrice}
                </span>
              )}
            </div>
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

        <div>
          <p className="sParagraph">{onlyOneProducts.description}</p>
        </div>
      </div>
      <br />
      <br />
      <br />
      <div className="myGoodscontain nutriChart">
        <DoughnutComponent foodId={foodId} />
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
        <div>
          <p className="sParagraph">{onlyOneProducts.storage_method}</p>
        </div>
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
                to={`/goods/${promotionGood.productid}/${promotionGood.activityId}/${promotionGood.food_id}`}
                className="jumpPage"
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
