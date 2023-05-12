import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import DoughnutComponent from "../components/DoughnutChart";
import "../css/goods.css";

const GoodsPage = () => {
  const { productId, foodId } = useParams();
  const [onlyOneProducts, setOnlyOneProducts] = useState([]);
  const [ImageList, setImageList] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [onlyOneFoods, setOnlyOneFoods] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [promotionGoods, setPromotionGood] = useState([]);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/products/getProductsById?productId=${productId}`
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
      .get(`${process.env.REACT_APP_API_URL}/api/products/getProducts`)
      .then((res) => {
        console.log(res);
        setPromotionGood(res.data.results.slice(0, 4));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
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

  return (
    <div>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Allura&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      {/* <h1>
        商品頁面 - 商品 ID：{productId} 跟 {foodId}
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
              <h2 className="goodsName">建議售價</h2>
              <p className="goodsPrice">{onlyOneProduct.price}</p>
              {/* <p className="goodsPrice">1200</p> */}
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
              <button className="cartIn">加入購物車</button>
              <button className="buyIn">立即購買</button>
            </div>
            <br />
            <br />
            <button className="joinFollow">
              <img src="../../public/image/goods/heart.png" alt="最愛" />
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
        <DoughnutComponent foodId={foodId} productId={productId} />
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
        {promotionGoods.map((promotionGood, indexD) => (
          <div key={indexD} className="myGoodscontain recomGoods">
            <Link
              to={`http://localhost:3000/goods/${promotionGood.productid}/${promotionGood.activityId}/${promotionGood.food_id}`}
              className="jumpPage"
            >
              <img id="myGoodCard" src={promotionGood.image[0]} alt="推播圖1" />
              <p className="fw-semibold cardTopic">{promotionGood.name}</p>
              <span className="mycardPrice">{promotionGood.price}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoodsPage;
