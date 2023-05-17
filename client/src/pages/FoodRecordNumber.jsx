import React, { Fragment, useState, useEffect } from "react";
import "../styles/userFoodRecord.css";
// import Footer from "../components/Footer";
import Header from "../components/Header";
import AddFoodList from "../components/AddFoodList";
import axios from "axios";
// 圖片區
import target from "../image/target.png";
import fork from "../image/fork.png";
import plus from "../image/plus.png";
import rightArrow from "../image/right-arrow.png";
import sunset from "../image/sunset.png";
import sun from "../image/sun.png";
import moon from "../image/moon.png";
import sunrise from "../image/sunrise.png";
import circleShape from "../image/circle-shape.png";

function FoodRecordNumber() {
  // 帶會員驗證token;
  const token =
    "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI3MjcxMjQyMzU0IiwiZW1haWwiOiJ0ZXN0MDUxNkB0ZXN0LmNvbSIsImV4cCI6MTY5Mjk4MTgzODAwNywiaWF0IjoxNjg0MzQxODM4fQ.YW0zlQPpESUGye583u6xZGSR3f-sbEyQGsj27eHgM6I";

  // 顯示正確的日期時間
  const [currentDate, setCurrentDate] = useState("");

  const getWeekday = (weekday) => {
    const weekdays = [
      "星期日",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六",
    ];
    return weekdays[weekday];
  };

  const getMonth = (month) => {
    const months = [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月",
    ];
    return months[month];
  };

  useEffect(() => {
    const date = new Date();
    const weekday = getWeekday(date.getDay());
    const month = getMonth(date.getMonth());
    const day = date.getDate();
    setCurrentDate(`${weekday}, ${month} ${day}日`);
  }, []);

  // 拿取會員紀錄時間
  const [resMemberData, setResMemberData] = useState("");
  const [loading, setLoading] = useState(true);
  const [exerciseRecords, setExerciseRecords] = useState();
  const [formattedDate, setFormattedDate] = useState();
  const [targetCal, setTargetCal] = useState();

  useEffect(() => {
    // console.log("FoodRecordNumber 被渲染了");
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const date = String(today.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${date}`;
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/user/meal_records?start_date=${formattedDate}&end_date=${formattedDate}`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {
        setResMemberData(response);
        setLoading(false);
        setFormattedDate(formattedDate);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // 拿取會員的運動資料

  useEffect(() => {
    axios
      .get(
        // `${process.env.REACT_APP_API_URL}/api/user/exercise_records?start_date=${formattedDate}&end_date=${formattedDate}`
        `${process.env.REACT_APP_API_URL}/api/user/exercise_records`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {
        setExerciseRecords(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [formattedDate]);

  // 若初始值為 undefined或 長度不 > 0 則不執行
  useEffect(() => {
    if (
      exerciseRecords !== undefined &&
      exerciseRecords.data.records.length > 0
    ) {
      // console.log(exerciseRecords);
      console.log(exerciseRecords.data.records[0]);
      const { birthday, exercise_level, gender, height, weight } =
        exerciseRecords.data.records[0];

      // 計算今年的年紀 age就是年紀
      const calculateAge = (birthday, gender) => {
        const birthDate = new Date(birthday);
        const currentDate = new Date();

        let age = currentDate.getFullYear() - birthDate.getFullYear();

        // 检查是否已经過了生日，若是，年龄减一
        const currentMonth = currentDate.getMonth();
        const birthMonth = birthDate.getMonth();
        const currentDay = currentDate.getDate();
        const birthDay = birthDate.getDate();

        if (
          currentMonth < birthMonth ||
          (currentMonth === birthMonth && currentDay < birthDay)
        ) {
          age--;
        }

        let genderValue = 0;
        if (gender === "male") {
          genderValue = 1;
        }

        return [age, genderValue];
      };

      const [age, genderValue] = calculateAge(birthday, gender);
      console.log(age); // 输出年龄
      console.log(genderValue); // 输出性別代表的數字

      const sum1 =
        9.99 * weight + 6.25 * height - 4.92 * age + (166 * genderValue - 161);
      // setResult1(Math.round(sum1));
      const sum2 = Math.round(sum1) * exercise_level;
      setTargetCal(Math.round(sum2));
    }
  }, [exerciseRecords]);

  // 早餐區;
  const [breakfastRow, setBreakfastRow] = useState([]);
  const [brTotalCalories, setBrTotalCalories] = useState(0);
  const [brCarbohydrate, setBrTotalCarbohydrate] = useState(0);
  const [brProtein, setBrTotalProtein] = useState(0);
  const [brSaturatedFat, setBrTotalSaturatedFat] = useState(0);
  const [brSodium, setBrTotalSodium] = useState(0);

  // 計算早餐項目
  useEffect(() => {
    if (!loading) {
      // console.log(resMemberData);
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
        // console.log(memberBreakfast.food_info);
        const qty = parseFloat(memberBreakfast.food_qty).toFixed(2);
        const recordId = memberBreakfast.record_id;

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
            <tr
              style={{ borderBottom: "1px solid black", position: "relative" }}
            >
              <td>{carbohydrate * qty}</td>
              <td>{protein * qty}</td>
              <td>{saturated_fat * qty}</td>
              <td>{sodium * qty}</td>
              <td
                className="cancelSign"
                onClick={() => {
                  deleteFood(recordId, name);
                }}
              >
                -
              </td>
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
      // console.log(resMemberData);
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
        const recordId = memberlunch.record_id;
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
            <tr
              style={{ borderBottom: "1px solid black", position: "relative" }}
            >
              <td>{carbohydrate * qty}</td>
              <td>{protein * qty}</td>
              <td>{saturated_fat * qty}</td>
              <td>{sodium * qty}</td>
              <td
                className="cancelSign"
                onClick={() => {
                  deleteFood(recordId, name);
                }}
              >
                -
              </td>
            </tr>
          </Fragment>
        );
      });
      setLunchRow(lunchRow);
    }
  }, [loading, resMemberData]);

  // 晚餐區;
  const [dinnerRow, setDinnerRow] = useState([]);
  const [diTotalCalories, setDiTotalCalories] = useState(0);
  const [diCarbohydrate, setDiTotalCarbohydrate] = useState(0);
  const [diProtein, setDiTotalProtein] = useState(0);
  const [diSaturatedFat, setDiTotalSaturatedFat] = useState(0);
  const [diSodium, setDiTotalSodium] = useState(0);

  // 計算晚餐項目
  useEffect(() => {
    if (!loading) {
      // console.log(resMemberData);
      const memberData = resMemberData.data.records;
      const memberDinners = memberData.filter(
        (meal) => meal.meal_type === "dinner"
      );

      let diCalories = 0;
      let diCarbohydrate = 0;
      let diProtein = 0;
      let diSaturatedFat = 0;
      let diSodium = 0;
      let dikey = 0;

      const dinnerRow = memberDinners.map((memberDinner) => {
        dikey++;
        const { name, calories, carbohydrate, protein, saturated_fat, sodium } =
          memberDinner.food_info;
        const qty = parseFloat(memberDinner.food_qty).toFixed(2);
        const recordId = memberDinner.record_id;
        // 更新總計變數
        diCalories += Math.floor(calories * qty);
        diCarbohydrate += carbohydrate * qty;
        diProtein += protein * qty;
        diSaturatedFat += saturated_fat * qty;
        diSodium += sodium * qty;
        setDiTotalCalories(diCalories);
        setDiTotalCarbohydrate(diCarbohydrate);
        setDiTotalProtein(diProtein);
        setDiTotalSaturatedFat(diSaturatedFat);
        setDiTotalSodium(diSodium);

        return (
          <Fragment key={dikey}>
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
            <tr
              style={{ borderBottom: "1px solid black", position: "relative" }}
            >
              <td>{carbohydrate * qty}</td>
              <td>{protein * qty}</td>
              <td>{saturated_fat * qty}</td>
              <td>{sodium * qty}</td>
              <td
                className="cancelSign"
                onClick={() => {
                  deleteFood(recordId, name);
                }}
              >
                -
              </td>
            </tr>
          </Fragment>
        );
      });
      setDinnerRow(dinnerRow);
    }
  }, [loading, resMemberData]);

  // 零食區;
  const [snackRow, setSnackRow] = useState([]);
  const [snTotalCalories, setSnTotalCalories] = useState(0);
  const [snCarbohydrate, setSnTotalCarbohydrate] = useState(0);
  const [snProtein, setSnTotalProtein] = useState(0);
  const [snSaturatedFat, setSnTotalSaturatedFat] = useState(0);
  const [snSodium, setSnTotalSodium] = useState(0);

  // 計算零食項目
  useEffect(() => {
    if (!loading) {
      // console.log(resMemberData);
      const memberData = resMemberData.data.records;
      const memberSnacks = memberData.filter(
        (meal) => meal.meal_type === "snack"
      );

      let snCalories = 0;
      let snCarbohydrate = 0;
      let snProtein = 0;
      let snSaturatedFat = 0;
      let snSodium = 0;
      let snkey = 0;

      const snackRow = memberSnacks.map((memberSnack) => {
        snkey++;
        const { name, calories, carbohydrate, protein, saturated_fat, sodium } =
          memberSnack.food_info;
        const recordId = memberSnack.record_id;
        const qty = parseFloat(memberSnack.food_qty).toFixed(2);

        // 更新總計變數
        snCalories += Math.floor(calories * qty);
        snCarbohydrate += carbohydrate * qty;
        snProtein += protein * qty;
        snSaturatedFat += saturated_fat * qty;
        snSodium += sodium * qty;
        setSnTotalCalories(snCalories);
        setSnTotalCarbohydrate(snCarbohydrate);
        setSnTotalProtein(snProtein);
        setSnTotalSaturatedFat(snSaturatedFat);
        setSnTotalSodium(snSodium);

        return (
          <Fragment key={snkey}>
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
            <tr
              style={{ borderBottom: "1px solid black", position: "relative" }}
            >
              <td>{carbohydrate * qty}</td>
              <td>{protein * qty}</td>
              <td>{saturated_fat * qty}</td>
              <td>{sodium * qty}</td>
              <td
                className="cancelSign"
                onClick={() => {
                  deleteFood(recordId, name);
                }}
              >
                -
              </td>
            </tr>
          </Fragment>
        );
      });
      setSnackRow(snackRow);
    }
  }, [loading, resMemberData]);

  // 總卡路里數值加總
  const [AllNumberCaloriesPlus, setAllNumberCaloriesPlus] = useState();

  useEffect(() => {
    if (!loading) {
      let totalCal =
        snTotalCalories + diTotalCalories + luTotalCalories + brTotalCalories;
      setAllNumberCaloriesPlus(totalCal);
    }
  });

  // 總碳水化合物數值加總
  const [AllNumberCarbohydratePlus, setAllNumberCarbohydratePlus] = useState();

  useEffect(() => {
    if (!loading) {
      let totalCar =
        snCarbohydrate + diCarbohydrate + luCarbohydrate + brCarbohydrate;
      setAllNumberCarbohydratePlus(totalCar);
    }
  });

  // 總蛋白質數值加總
  const [AllNumberProteinPlus, setAllNumberProteinPlus] = useState();

  useEffect(() => {
    if (!loading) {
      let totalPro = snProtein + diProtein + luProtein + brProtein;
      setAllNumberProteinPlus(totalPro);
    }
  });

  // 總脂肪數值加總
  const [AllNumberSaturatedFatPlus, setAllNumberSaturatedFatPlus] = useState();

  useEffect(() => {
    if (!loading) {
      let totalFat =
        snSaturatedFat + diSaturatedFat + luSaturatedFat + brSaturatedFat;
      setAllNumberSaturatedFatPlus(totalFat);
    }
  });

  // 總鈉數值加總
  const [AllNumberSodiumPlus, setAllNumberSodiumPlus] = useState();

  useEffect(() => {
    if (!loading) {
      let totalSod = snSodium + diSodium + luSodium + brSodium;
      setAllNumberSodiumPlus(totalSod);
    }
  });

  // 會員還有多少卡路里可以吃
  const [caloriesCanEat, setCaloriesCanEat] = useState("");

  useEffect(() => {
    if (!loading) {
      let caloriesReduce = targetCal - AllNumberCaloriesPlus;
      setCaloriesCanEat(caloriesReduce);
    }
  });

  // 根據多少卡路里的值是正或負來判斷div內的文字
  useEffect(() => {
    if (!isNaN(caloriesCanEat)) {
      changeWord(caloriesCanEat);
    }
  }, [caloriesCanEat]);

  const changeWord = (caloriesCanEat) => {
    const displayText = isNaN(caloriesCanEat)
      ? "數值無效"
      : caloriesCanEat > 0
      ? "還可以吃"
      : "已超標";
    return <div>{String(displayText)}</div>;
  };

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
  const [foodSection, setFoodSection] = useState("");
  function handleAddFoodListClick(event) {
    const section = event.target.className;
    let foodchooseSection = "";
    if (section.includes("breakfastSection")) {
      foodchooseSection = "breakfast";
    } else if (section.includes("lunchSection")) {
      foodchooseSection = "lunch";
    } else if (section.includes("dinnerSection")) {
      foodchooseSection = "dinner";
    } else {
      foodchooseSection = "snack";
    }
    setShowAddFoodList(true);
    document.body.classList.add("modal-open");
    setFoodSection(foodchooseSection);
  }

  function handleCancelButtonClick() {
    setShowAddFoodList(false);
    document.body.classList.remove("modal-open");
  }

  // 刪除食品方法
  function deleteFood(recordId, name) {
    console.log(recordId);
    const confirmDelete = window.confirm(`確定要刪除 -${name} 這個紀錄吗？`);
    if (confirmDelete) {
      axios
        .delete(
          `${process.env.REACT_APP_API_URL}/api/user/meal_record/record_id=${recordId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((response) => {
          window.location.reload(); // 刷新页面
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <Fragment>
      <Header />
      <div className="foodRecordBgDiv">
        <div className="row foodRecordBg shadow p-3 mb-2 bg-body rounded">
          <div className="oneAndTwoAreaBg d-flex">
            {/* 第一區 - 目標值與已攝取區 */}
            <div className="w-50 position-relative">
              <div>{currentDate}</div>
              {/* 目標量的Icon */}
              <div className="oneAreaTarget">
                <div>
                  <img src={target} alt="目標值" />
                </div>
                <div>目標值</div>
              </div>
              {/* 目標值 */}
              <div className="oneAreaTargetValue">
                <div>{targetCal}</div>
                <div>卡路里</div>
              </div>
              {/* 已攝取量的Icon */}
              <div className="oneAreaAlreadyEat">
                <div>
                  <img src={fork} alt="刀叉圖片" />
                </div>
                <div>已攝取</div>
              </div>
              {/* 已攝取量 */}
              <div className="oneAreaAlreadyEatValue">
                <div>{AllNumberCaloriesPlus}</div>
                <div>卡路里</div>
              </div>
            </div>
            {/* 第二區 - 還可以吃多少量 */}
            <div className="howMuchLeftBgDiv w-50">
              <img src={circleShape} alt="" />
              <div className="howMuchLeftValue">
                {typeof caloriesCanEat === "number" ? (
                  <>
                    {changeWord(caloriesCanEat)}
                    <div className="calories">{String(caloriesCanEat)}</div>
                    <div>卡路里</div>
                  </>
                ) : null}
                {/* {changeWord({ caloriesCanEat })}
                <div className="calories">{caloriesCanEat}</div>
                <div>卡路里</div> */}
              </div>
            </div>
          </div>
          {/* 第三區 - 攝取營養量專區 */}
          <div className="ThreeAreaBg d-flex justify-content-around">
            <div>
              碳水化合物
              <hr />
              <span>{AllNumberCarbohydratePlus}</span>
              <span> 克</span>
            </div>
            <div>
              蛋白質
              <hr />
              <span>{AllNumberProteinPlus}</span>
              <span> 克</span>
            </div>
            <div>
              脂肪
              <hr />
              <span>{AllNumberSaturatedFatPlus}</span>
              <span> 克</span>
            </div>
            <div>
              鈉
              <hr />
              <span>{AllNumberSodiumPlus}</span>
              <span> 毫克</span>
            </div>
          </div>
        </div>
      </div>
      {/* 紀錄區三餐區 */}
      <div className="foodRecordBgDiv">
        {/* 早餐區*/}
        <div className="row foodRecordBg shadow p-3 mb-2 bg-body rounded">
          <div className="optionBreakfirstTitleBg col-9">
            <img className="optionTitleIcon" src={sunrise} alt="" />
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
            <img
              className="showAddFoodDiv breakfastSection"
              src={plus}
              alt=""
              onClick={handleAddFoodListClick}
            />
          </div>
          {/* 營養素加總標題 */}
          <table>
            <thead className="FoodRecordThead">
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
                    src={rightArrow}
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
            <img className="optionTitleIcon" src={sun} alt="" />
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
            <img
              className="showAddFoodDiv  lunchSection"
              src={plus}
              alt=""
              onClick={handleAddFoodListClick}
            />
          </div>
          {/* 營養素加總標題 */}
          <table>
            <thead className="FoodRecordThead">
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
                    src={rightArrow}
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
            <img className="optionTitleIcon" src={sunset} alt="" />
            <span className="optionBreakfirstTitle">晚餐</span>
          </div>
          <div
            className="col-2 text-end"
            style={{ fontWeight: "bolder", fontSize: 20 }}
          >
            {diTotalCalories}
            <br />
            卡路里
          </div>
          <div className="col-1 optionBreakfirstPlus">
            {/* 跳到新增食品的頁面 */}
            <img
              className="showAddFoodDiv dinnerSection"
              src={plus}
              alt=""
              onClick={handleAddFoodListClick}
            />
          </div>
          {/* 營養素加總標題 */}
          <table>
            <thead className="FoodRecordThead">
              <tr>
                <th>
                  碳水
                  <br />
                  {diCarbohydrate}
                </th>
                <th>
                  蛋白質
                  <br />
                  {diProtein}
                </th>
                <th>
                  脂肪
                  <br />
                  {diSaturatedFat}
                </th>
                <th>
                  鈉<br />
                  {diSodium}
                </th>
                <th style={{ textAlign: "end" }}>
                  <img
                    onClick={showDiFoodRecordList}
                    className={`addDiOptionIcon ${
                      DiFoodRecordListIsHidden ? "" : "active"
                    }`}
                    src={rightArrow}
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
              {dinnerRow}
            </tbody>
          </table>
        </div>
        {/* 零食區 */}
        <div className="row foodRecordBg shadow p-3 mb-2 bg-body rounded">
          <div className="optionBreakfirstTitleBg col-9">
            <img className="optionTitleIcon" src={moon} alt="" />
            <span className="optionBreakfirstTitle">零食</span>
          </div>
          <div
            className="col-2 text-end"
            style={{ fontWeight: "bolder", fontSize: 20 }}
          >
            {snTotalCalories}
            <br />
            卡路里
          </div>
          <div className="col-1 optionBreakfirstPlus">
            <img
              className="showAddFoodDiv snackSection"
              src={plus}
              alt=""
              onClick={handleAddFoodListClick}
            />
          </div>
          {/* 營養素加總標題 */}
          <table>
            <thead className="FoodRecordThead">
              <tr>
                <th>
                  碳水
                  <br />
                  {snCarbohydrate}
                </th>
                <th>
                  蛋白質
                  <br />
                  {snProtein}
                </th>
                <th>
                  脂肪
                  <br />
                  {snSaturatedFat}
                </th>
                <th>
                  鈉<br />
                  {snSodium}
                </th>
                <th style={{ textAlign: "end" }}>
                  <img
                    onClick={showNsFoodRecordList}
                    className={`addNsOptionIcon ${
                      nsFoodRecordListIsHidden ? "" : "active"
                    }`}
                    src={rightArrow}
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
              {snackRow}
            </tbody>
          </table>
        </div>
      </div>
      {/* 搜尋食品區 */}
      {showAddFoodList && (
        <AddFoodList
          onCancelButtonClick={handleCancelButtonClick}
          foodSection={foodSection}
        />
      )}
      {/* <Footer /> */}
    </Fragment>
  );
}

export default FoodRecordNumber;
