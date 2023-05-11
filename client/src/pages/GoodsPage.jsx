import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
// import { Link } from "react-router-dom";
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
        console.log(res);
        setOnlyOneFoods(res.data);
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
      <h1>
        商品頁面 - 商品 ID：{productId} 跟 {foodId}
      </h1>
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
      {onlyOneProducts.map((onlyOneProduct) => (
        <div
          key={onlyOneProduct.productid}
          className="goodsCard myGoodscontain"
        >
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
              <img src="./image/goods/heart.png" alt="最愛" /> 加入最愛
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
        <div>
          <p className="sParagraph">
            內容物： 白酒菲力鬼頭刀：鬼頭刀,白酒,柳丁,鹽,黑胡椒粉
            日式煮物：白蘿蔔,紅蘿蔔,蓮藕,牛蒡,醬油,味醂
            義式番茄藜麥飯：白米,紅藜麥,番茄糊
            綠咖哩烤雞腿：雞腿肉,綠咖哩,椰奶,水,芥花油
          </p>
        </div>
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
        <div>
          <p className="sParagraph">
            微波：撕開保護膜的一角，放入微波爐加熱2-3分鐘（退冰）、加熱6-8分鐘（未退冰），加熱時間可能因微波爐不同而異。
            電鍋：將包裝拆除移到盤中，放入1/2杯水（150ml），待電鍋跳起。
            烤箱：將包裝拆除移到盤中，170度加熱7分鐘或到達食用溫度。
            平底鍋：將包裝拆除放到鍋中，加熱至所需溫度。
          </p>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="recommendBar">
        {/* {onlyOneProducts.map((product) => ( */}
        <div className="myGoodscontain recomGoods">
          {/* <Link
              to={`http://localhost:3000/goods/${product.productid}/${product.activityId}/${product.food_id}`}
              className="jumpPage"
            >
              <img
                id="myGoodCard"
                src="./image/store/good1.png"
                alt="推播圖1"
              />
              <p className="fw-semibold cardTopic">迷迭香雞胸香菜糙米飯</p>
              <span className="mycardPrice">NTD1600</span>
            </Link> */}

          {/* <a
            href="http://localhost:3000/goods"
            className="jumpPage"
            target="_blank"
            rel="noreferrer"
          >
            <img id="myGoodCard" src="./image/store/good2.png" alt="推播圖2" />
            <p className="fw-semibold cardTopic">迷迭香雞胸香菜糙米飯</p>
            <span className="mycardPrice">NTD1600</span>
          </a>
          <a
            href="http://localhost:3000/goods"
            className="jumpPage"
            target="_blank"
            rel="noreferrer"
          >
            <img id="myGoodCard" src="./image/store/good1.png" alt="推播圖3" />
            <p className="fw-semibold cardTopic">迷迭香雞胸香菜糙米飯</p>
            <span className="mycardPrice">NTD1600</span>
          </a>
          <a
            href="http://localhost:3000/goods"
            className="jumpPage"
            target="_blank"
            rel="noreferrer"
          >
            <img id="myGoodCard" src="./image/store/good2.png" alt="推播圖4" />
            <p className="fw-semibold cardTopic">迷迭香雞胸香菜糙米飯</p>
            <span className="mycardPrice">NTD1600</span>
          </a> */}
        </div>
        {/* ))} */}
      </div>
    </div>
  );
};

export default GoodsPage;
