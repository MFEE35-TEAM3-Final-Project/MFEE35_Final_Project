import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import "../styles/userFoodRecord.css";
import Footer from "../components/footer";
import Header from "../components/header";
import AddFoodList from "../components/addFoodList";
import axios from "axios";

// 帶會員驗證token;
axios.defaults.headers.common["Authorization"] =
  "JWT " +
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI0MTUyNjA3ODcyIiwiZW1haWwiOiJBQUFBQUFrYWthQHRlc3QuY29tIiwiZXhwIjoxNjkyNDMwNjQxNTg2LCJpYXQiOjE2ODM3OTA2NDF9.u2OHIdFXKuYtXzhbib35iLVwarUZa39zMcEFCBJ82pg";

function FoodRecordNumber() {
  const [resMemberData, setResMemberData] = useState("");
  const [loading, setLoading] = useState(true);

  // 早餐區;
  const [breakfastRow, setBreakfastRow] = useState([]);
  const [brTotalCalories, setBrTotalCalories] = useState(0);
  const [brCarbohydrate, setBrTotalCarbohydrate] = useState(0);
  const [brProtein, setBrTotalProtein] = useState(0);
  const [brSaturatedFat, setBrTotalSaturatedFat] = useState(0);
  const [brSodium, setBrTotalSodium] = useState(0);

  useEffect(() => {
    console.log("FoodRecordNumber 被渲染了");
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/user/meal_records?start_date=2023-04-30&end_date=2023-05-13`
      )
      .then((response) => {
        setResMemberData(response);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setResMemberData]);

  // 計算早餐項目
  useEffect(() => {
    if (!loading) {
      console.log(resMemberData);
      const memberData = resMemberData.data.records;
      const memberBreakfasts = memberData.filter(
        (meal) => meal.meal_type === "breakfast"
      );

      let brCalories = 0;
      let brCarbohydrate = 0;
      let brProtein = 0;
      let brSaturatedFat = 0;
      let brSodium = 0;
      let brkey = 0;

      const breakfastRow = memberBreakfasts.map((memberBreakfast) => {
        brkey++;
        const { name, calories, carbohydrate, protein, saturated_fat, sodium } =
          memberBreakfast.food_info;
        const qty = parseFloat(memberBreakfast.food_qty).toFixed(2);

        // 更新總計變數
        brCalories += Math.floor(calories * qty);
        brCarbohydrate += carbohydrate * qty;
        brProtein += protein * qty;
        brSaturatedFat += saturated_fat * qty;
        brSodium += sodium * qty;
        setBrTotalCalories(brCalories);
        setBrTotalCarbohydrate(brCarbohydrate);
        setBrTotalProtein(brProtein);
        setBrTotalSaturatedFat(brSaturatedFat);
        setBrTotalSodium(brSodium);

        return (
          <Fragment key={brkey}>
            <tr>
              <td className="foodName">{name}</td>
              <td />
              <td />
              <td />
              <td
                style={{ fontSize: 20, fontWeight: "bolder", paddingLeft: 28 }}
              >
                {Math.floor(calories * qty)}
              </td>
            </tr>
            <tr style={{ borderBottom: "1px solid black" }}>
              <td>{carbohydrate * qty}</td>
              <td>{protein * qty}</td>
              <td>{saturated_fat * qty}</td>
              <td>{sodium * qty}</td>
            </tr>
          </Fragment>
        );
      });
      setBreakfastRow(breakfastRow);
    }
  }, [loading, resMemberData]);

  //午餐區:
  const [lunchRow, setLunchRow] = useState([]);
  const [luTotalCalories, setLuTotalCalories] = useState(0);
  const [luCarbohydrate, setLuTotalCarbohydrate] = useState(0);
  const [luProtein, setLuTotalProtein] = useState(0);
  const [luSaturatedFat, setLuTotalSaturatedFat] = useState(0);
  const [luSodium, setLuTotalSodium] = useState(0);

  // 計算午餐項目
  useEffect(() => {
    if (!loading) {
      console.log(resMemberData);
      const memberData = resMemberData.data.records;
      const memberlunchs = memberData.filter(
        (meal) => meal.meal_type === "lunch"
      );

      let luCalories = 0;
      let luCarbohydrate = 0;
      let luProtein = 0;
      let luSaturatedFat = 0;
      let luSodium = 0;
      let lukey = 0;

      const lunchRow = memberlunchs.map((memberlunch) => {
        lukey++;
        const { name, calories, carbohydrate, protein, saturated_fat, sodium } =
          memberlunch.food_info;
        const qty = parseFloat(memberlunch.food_qty).toFixed(2);

        // 更新總計變數
        luCalories += Math.floor(calories * qty);
        luCarbohydrate += carbohydrate * qty;
        luProtein += protein * qty;
        luSaturatedFat += saturated_fat * qty;
        luSodium += sodium * qty;
        setLuTotalCalories(luCalories);
        setLuTotalCarbohydrate(luCarbohydrate);
        setLuTotalProtein(luProtein);
        setLuTotalSaturatedFat(luSaturatedFat);
        setLuTotalSodium(luSodium);
        return (
          <Fragment key={lukey}>
            <tr>
              <td className="foodName">{name}</td>
              <td />
              <td />
              <td />
              <td
                style={{ fontSize: 20, fontWeight: "bolder", paddingLeft: 28 }}
              >
                {Math.floor(calories * qty)}
              </td>
            </tr>

            <tr style={{ borderBottom: "1px solid black" }}>
              <td>{carbohydrate * qty}</td>
              <td>{protein * qty}</td>
              <td>{saturated_fat * qty}</td>
              <td>{sodium * qty}</td>
            </tr>
          </Fragment>
        );
      });
      setLunchRow(lunchRow);
    }
  }, [loading, resMemberData]);

  // 早餐的細項隱藏增加 新版
  const [brFoodRecordListIsHidden, setBrFoodRecordListIsHidden] =
    useState(true);

  function showBrFoodRecordList() {
    setBrFoodRecordListIsHidden(!brFoodRecordListIsHidden);
  }

  // 午餐的細項隱藏增加 新版
  const [luFoodRecordListIsHidden, setLuFoodRecordListIsHidden] =
    useState(true);

  function showLuFoodRecordList() {
    setLuFoodRecordListIsHidden(!luFoodRecordListIsHidden);
  }

  // 晚餐的細項隱藏增加
  const [DiFoodRecordListIsHidden, setDiFoodRecordListIsHidden] =
    useState(true);

  function showDiFoodRecordList() {
    setDiFoodRecordListIsHidden(!DiFoodRecordListIsHidden);
  }

  // 零食的細項隱藏增加
  const [nsFoodRecordListIsHidden, setNsFoodRecordListIsHidden] =
    useState(true);

  function showNsFoodRecordList() {
    setNsFoodRecordListIsHidden(!nsFoodRecordListIsHidden);
  }

  // 跳出新增食品的視窗
  const [showAddFoodList, setShowAddFoodList] = useState(false);

  function handleAddFoodListClick() {
    setShowAddFoodList(true);
    document.body.classList.add("modal-open");
  }

  function handleCancelButtonClick() {
    setShowAddFoodList(false);
    document.body.classList.remove("modal-open");
  }

  return (
    <Fragment>
      <Header />
      <div className="foodRecordBgDiv">
        <div className="row foodRecordBg shadow p-3 mb-2 bg-body rounded">
          <div className="oneAndTwoAreaBg d-flex">
            {/* 第一區 - 目標值與已攝取區 */}
            <div className="w-50 position-relative">
              <div> 4月15日 週六 </div>
              {/* 目標量的Icon */}
              <div className="oneAreaTarget">
                <div>
                  <img src="./img/target.png" alt="這是目標值" />
                </div>
                <div>目標值</div>
              </div>
              {/* 目標值 */}
              <div className="oneAreaTargetValue">
                <div>待填</div>
                <div>卡路里</div>
              </div>
              {/* 已攝取量的Icon */}
              <div className="oneAreaAlreadyEat">
                <div>
                  <img src="./img/fork.png" alt="這是刀叉圖片" />
                </div>
                <div>已攝取</div>
              </div>
              {/* 已攝取量 */}
              <div className="oneAreaAlreadyEatValue">
                <div>待填</div>
                <div>卡路里</div>
              </div>
            </div>
            {/* 第二區 - 還可以吃多少量 */}
            <div className="howMuchLeftBgDiv w-50">
              <img src="./img/circle-shape.png" alt="" />
              <div className="howMuchLeftValue">
                <div>還可以吃</div>
                <div>待填</div>
                <div>卡路里</div>
              </div>
            </div>
          </div>
          {/* 第三區 - 攝取營養量專區 */}
          <div className="ThreeAreaBg d-flex justify-content-around">
            <div>
              碳水化合物
              <hr />
              <div>待填</div>
            </div>
            <div>
              蛋白質
              <hr />
              <div>待填</div>
            </div>
            <div>
              脂肪
              <hr />
              <div>待填</div>
            </div>
            <div>
              鈉
              <hr />
              <div>待填</div>
            </div>
          </div>
        </div>
      </div>
      {/* 紀錄區三餐區 */}
      <div className="foodRecordBgDiv">
        {/* 早餐區*/}
        <div className="row foodRecordBg shadow p-3 mb-2 bg-body rounded">
          <div className="optionBreakfirstTitleBg col-9">
            <img className="optionTitleIcon" src="./img/sunrise.png" alt="" />
            <span className="optionBreakfirstTitle">早餐</span>
          </div>
          <div
            className="col-2 text-end"
            style={{ fontWeight: "bolder", fontSize: 20 }}
          >
            {brTotalCalories}
            <br />
            卡路里
          </div>
          <div className="col-1 optionBreakfirstPlus">
            {/* <img onclick="addFoodRecord('breakfirst')" src="./images/plus.png" alt=""> */}
            <img
              className="showAddFoodDiv"
              src="./img/plus.png"
              alt=""
              onClick={handleAddFoodListClick}
            />
          </div>
          {/* 營養素加總標題 */}
          <table>
            <thead>
              <tr>
                <th>
                  碳水
                  <br />
                  {brCarbohydrate}
                </th>
                <th>
                  蛋白質
                  <br />
                  {brProtein}
                </th>
                <th>
                  脂肪
                  <br />
                  {brSaturatedFat}
                </th>
                <th>
                  鈉<br />
                  {brSodium}
                </th>
                <th style={{ textAlign: "end" }}>
                  <img
                    onClick={showBrFoodRecordList}
                    // className="addBrOptionIcon"
                    className={`addBrOptionIcon ${
                      brFoodRecordListIsHidden ? "" : "active"
                    }`}
                    src="./img/right-arrow.png"
                    alt=""
                  />
                </th>
              </tr>
            </thead>
            {/* 第一行 */}
            {/* 食物種類 */}
            <tbody
              className={`foodBrRecordList ${
                brFoodRecordListIsHidden ? "" : "active"
              }`}
            >
              {/* 插入動態生成的資料 */}
              {breakfastRow}
            </tbody>
          </table>
        </div>
        {/* 午餐區 */}
        <div className="row foodRecordBg shadow p-3 mb-2 bg-body rounded">
          <div className="optionBreakfirstTitleBg col-9">
            <img className="optionTitleIcon" src="./img/sun.png" alt="" />
            <span className="optionBreakfirstTitle">午餐</span>
          </div>
          <div
            className="col-2 text-end"
            style={{ fontWeight: "bolder", fontSize: 20 }}
          >
            {luTotalCalories}
            <br />
            卡路里
          </div>
          <div className="col-1 optionBreakfirstPlus">
            {/* <img  onclick="addFoodRecord('lunch')" src="./images/plus.png" alt=""> */}
            <img
              className="showAddFoodDiv"
              src="./img/plus.png"
              alt=""
              onClick={handleAddFoodListClick}
            />
          </div>
          {/* 營養素加總標題 */}
          <table>
            <thead>
              <tr>
                <th>
                  碳水
                  <br />
                  {luCarbohydrate}
                </th>
                <th>
                  蛋白質
                  <br />
                  {luProtein}
                </th>
                <th>
                  脂肪
                  <br />
                  {luSaturatedFat}
                </th>
                <th>
                  鈉<br />
                  {luSodium}
                </th>
                <th style={{ textAlign: "end" }}>
                  <img
                    onClick={showLuFoodRecordList}
                    className={`addLuOptionIcon ${
                      luFoodRecordListIsHidden ? "" : "active"
                    }`}
                    src="./img/right-arrow.png"
                    alt=""
                  />
                </th>
              </tr>
            </thead>
            <tbody
              className={`foodLuRecordList${
                luFoodRecordListIsHidden ? "" : "active"
              }`}
            >
              {lunchRow}
            </tbody>
          </table>
        </div>
        {/* 晚餐區 */}
        <div className="row foodRecordBg shadow p-3 mb-2 bg-body rounded">
          <div className="optionBreakfirstTitleBg col-9">
            <img className="optionTitleIcon" src="./img/sunset.png" alt="" />
            <span className="optionBreakfirstTitle">晚餐</span>
          </div>
          <div
            className="col-2 text-end"
            style={{ fontWeight: "bolder", fontSize: 20 }}
          >
            0<br />
            卡路里
          </div>
          <div className="col-1 optionBreakfirstPlus">
            {/* 跳到新增食品的頁面 */}
            {/* <img id='showAddFoodDiv' onclick="addFoodRecord('dinner')" src="./images/plus.png"> */}
            <img
              className="showAddFoodDiv"
              src="./img/plus.png"
              alt=""
              onClick={handleAddFoodListClick}
            />
          </div>
          {/* 營養素加總標題 */}
          <table>
            <thead>
              <tr>
                <th>
                  碳水
                  <br />
                  123
                </th>
                <th>
                  蛋白質
                  <br />
                  123
                </th>
                <th>
                  脂肪
                  <br />
                  123
                </th>
                <th>
                  鈉<br />
                  123
                </th>
                <th>
                  醣<br />
                  123
                </th>
                <th style={{ textAlign: "end" }}>
                  <img
                    onClick={showDiFoodRecordList}
                    className={`addDiOptionIcon ${
                      DiFoodRecordListIsHidden ? "" : "active"
                    }`}
                    src="./img/right-arrow.png"
                    alt=""
                  />
                </th>
              </tr>
            </thead>
            <tbody
              className={`foodDiRecordList ${
                DiFoodRecordListIsHidden ? "" : "active"
              }`}
            >
              <tr>
                <td className="foodName">蛋餅</td>
                <td />
                <td />
                <td />
                <td />
                <td style={{ fontSize: 20, fontWeight: "bolder" }}>321</td>
              </tr>
              {/* 營養素 */}
              <tr style={{ borderBottom: "1px solid black" }}>
                <td>123</td>
                <td>123</td>
                <td>123</td>
                <td>123</td>
                <td>123</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* 零食區 */}
        <div className="row foodRecordBg shadow p-3 mb-2 bg-body rounded">
          <div className="optionBreakfirstTitleBg col-9">
            <img className="optionTitleIcon" src="./img/moon.png" alt="" />
            <span className="optionBreakfirstTitle">零食</span>
          </div>
          <div
            className="col-2 text-end"
            style={{ fontWeight: "bolder", fontSize: 20 }}
          >
            0<br />
            卡路里
          </div>
          <div className="col-1 optionBreakfirstPlus">
            {/* <img onclick="addFoodRecord('nightsnack')" src="./images/plus.png" alt=""> */}
            <img
              className="showAddFoodDiv"
              src="./img/plus.png"
              alt=""
              onClick={handleAddFoodListClick}
            />
          </div>
          {/* 營養素加總標題 */}
          <table>
            <thead>
              <tr>
                <th>
                  碳水
                  <br />
                  123
                </th>
                <th>
                  蛋白質
                  <br />
                  123
                </th>
                <th>
                  脂肪
                  <br />
                  123
                </th>
                <th>
                  鈉<br />
                  123
                </th>
                <th>
                  醣<br />
                  123
                </th>
                <th style={{ textAlign: "end" }}>
                  <img
                    onClick={showNsFoodRecordList}
                    className={`addNsOptionIcon ${
                      nsFoodRecordListIsHidden ? "" : "active"
                    }`}
                    src="./img/right-arrow.png"
                    alt=""
                  />
                </th>
              </tr>
            </thead>
            <tbody
              className={`foodNsRecordList ${
                nsFoodRecordListIsHidden ? "" : "active"
              }`}
            >
              <tr>
                <td className="foodName">蛋餅</td>
                <td />
                <td />
                <td />
                <td />
                <td style={{ fontSize: 20, fontWeight: "bolder" }}>321</td>
              </tr>
              {/* 營養素 */}
              <tr style={{ borderBottom: "1px solid black" }}>
                <td>123</td>
                <td>123</td>
                <td>123</td>
                <td>123</td>
                <td>123</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* 搜尋食品區 */}
      {showAddFoodList && (
        <AddFoodList onCancelButtonClick={handleCancelButtonClick} />
      )}
      <Footer />
    </Fragment>
  );
}

export default FoodRecordNumber;
