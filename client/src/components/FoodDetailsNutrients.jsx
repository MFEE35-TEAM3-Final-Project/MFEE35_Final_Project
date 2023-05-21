import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "../styles/addFoodItem.css";
// Cookie
import Cookies from "js-cookie";

// 帶token
// 帶會員驗證token;
const token = Cookies.get("jwtToken");

function FoodDetailsNutrients({ cancelButtonClick, selected, foodSection }) {
  const [grams, setGrams] = useState(100);
  const [food, setFood] = useState({});

  // 觸發儲存資料至會員的方法
  function storeToMember() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const date = String(today.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${date}`;

    const gramsInKilo = (grams / 100).toFixed(1);

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/user/meal_records`,
        {
          meal_type: foodSection,
          meal_date: formattedDate,
          food_id: selected,
          food_qty: gramsInKilo,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {
        console.log(response);
        window.location.reload(); // 刷新页面
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // 取消按鈕
  function handleCancelClick() {
    cancelButtonClick();
  }

  // 更新版 searchFood
  const searchFood = useCallback(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/food/search?food_id=${selected}`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setFood(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selected]);

  useEffect(() => {
    searchFood();
  }, [searchFood, selected]);

  const handleGramsChange = (event) => {
    setGrams(event.target.value);
  };

  return (
    <div className="addFoodBgDiv">
      {/* 第一區 食品名稱區 */}
      <div className="chooseFoodName d-flex">
        <div className="w-50">{food.sample_name}</div>
        <div className="w-50" onClick={handleCancelClick}>
          取消
        </div>
      </div>
      {/* 第二區 +/- 數字 與 克數 */}
      <div className="userEnterNumberBg d-flex">
        <img src={require("../image/plusanddash.png")} alt="無法顯示" />
        <input
          className="userEnterNumber"
          type="number"
          value={grams}
          onChange={handleGramsChange}
        />
        <span>克</span>
      </div>
      {/* 第三區 儲存格 */}
      <div className="storeDataBg">
        <div className="storeData" onClick={storeToMember}>
          儲存
        </div>
      </div>
      {/* 第四區 營養素表 */}
      {/*  */}
      <div className="storeDataDetailBg d-flex">
        <div className="storeDataDetail">
          <div>碳水化合物</div>
          <div>{Math.round(food.carbohydrate * (grams / 100)).toString()}</div>
        </div>
        <div className="storeDataDetail">
          <div>鈉</div>
          <div>{Math.round(food.sodium * (grams / 100)).toString()}</div>
        </div>
      </div>
      <div className="storeDataDetailBg d-flex">
        <div className="storeDataDetail">
          <div>蛋白質</div>
          <div>{Math.round(food.crude_protein * (grams / 100)).toString()}</div>
        </div>
        <div className="storeDataDetail">
          <div>脂肪</div>
          <div>{Math.round(food.crude_fat * (grams / 100)).toString()}</div>
        </div>
      </div>
      <div className="storeDataDetailBg d-flex">
        <div className="storeDataDetailCalories">
          <div>卡路里</div>
          <div>
            {Math.round(food.Calories_adjusted * (grams / 100)).toString()}
          </div>
        </div>
      </div>
      {/*  */}
    </div>
  );
}

export default FoodDetailsNutrients;
