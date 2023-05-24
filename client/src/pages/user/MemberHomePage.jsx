import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import MemberHeader from "../../components/member/MemberHeader";
import BarChart from "../../components/member/BarChart.jsx";

import "../../styles/member/memberHome.css";

// Cookie
import Cookies from "js-cookie";

function MemberHomePage() {
  const [user, setUser] = useState(null);
  const [userHeight, setUserHeight] = useState("");
  const [userWeight, setUserWeight] = useState("");
  const [exerciseLevel, setExerciseLevel] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [exerciseRecords, setExerciseRecords] = useState();
  const [targetCal, setTargetCal] = useState();
  const [formattedDate] = useState();

  //取得會員資料
  useEffect(() => {
    const fetchMemberHomePage = async () => {
      try {
        const jwtToken = Cookies.get("jwtToken");

        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/user/check`,
          null,
          {
            headers: {
              Authorization: jwtToken,
            },
          }
        );

        console.log(response.data);

        if (response.data.success) {
          const userData = response.data.user;
          setUser(userData);

          const recordsResponse = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/user/exercise_records`,
            {
              headers: {
                Authorization: jwtToken,
              },
            }
          );

          console.log(recordsResponse.data);
          if (recordsResponse.data.success) {
            const records = recordsResponse.data.records;
            // 處理紀錄數據，例如：
            records.forEach((record) => {
              const weight = record.weight;
              const height = record.height;
              const exerciseLevel = record.exercise_level;

              setUserHeight(height);
              setUserWeight(weight);
              setExerciseLevel(exerciseLevel);
            });
          } else {
            console.error(recordsResponse.data.message);
          }
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchMemberHomePage();
  }, []);

  // // 取得當前日期
  // useEffect(() => {
  //   const getCurrentDate = () => {
  //     const weekdays = ["日", "一", "二", "三", "四", "五", "六"];
  //     const currentDate = new Date();

  //     const formattedDate = `星期${weekdays[currentDate.getDay()]}, ${
  //       currentDate.getMonth() + 1
  //     }月 ${currentDate.getDate()}日`;

  //     setCurrentDate(formattedDate);
  //   };

  //   getCurrentDate();
  // }, []);

  //將日期設置在 112/06/04
  useEffect(() => {
    const getCurrentDate = () => {
      const weekdays = ["日", "一", "二", "三", "四", "五", "六"];
      const currentDate = new Date();

      // 將日期設定為 06/03
      currentDate.setDate(4); // 設定日期為 4
      currentDate.setMonth(5); // 設定月份為 6 (從 0 開始計算，所以是 5)

      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();

      const formattedMonth = month < 10 ? "0" + month : month;
      const formattedDay = day < 10 ? "0" + day : day;

      const formattedDate = `星期${
        weekdays[currentDate.getDay()]
      }, ${formattedMonth}月 ${formattedDay}日`;

      setCurrentDate(formattedDate);
    };

    getCurrentDate();
  }, []);

  //取得 各營養數值
  const [calories, setCalories] = useState(0);
  const [carbohydrate, setCarbohydrate] = useState(0);
  const [protein, setProtein] = useState(0);
  const [saturatedFat, setSaturatedFat] = useState(0);
  const [sodium, setSodium] = useState(0);
  useEffect(() => {
    const jwtToken = Cookies.get("jwtToken");
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/user/meal_records`, {
        headers: {
          Authorization: jwtToken,
        },
      })
      .then((res) => {
        if (res.data.groupedResults) {
          const {
            total_calories,
            total_carbohydrate,
            total_protein,
            total_saturated_fat,
            total_sodium,
          } = res.data.groupedResults[7];

          setCalories(total_calories);
          setCarbohydrate(total_carbohydrate);
          setProtein(total_protein);
          setSaturatedFat(total_saturated_fat);
          setSodium(total_sodium);

          console.log(
            total_calories,
            total_carbohydrate,
            total_protein,
            total_saturated_fat,
            total_sodium
          );
        } else {
          // 處理 groupedResults 未定義的情況
          console.log("groupedResults is undefined");
        }
      });
  }, []);

  //計算 TDEE
  useEffect(() => {
    const jwtToken = Cookies.get("jwtToken");

    axios
      .get(
        // `${process.env.REACT_APP_API_URL}/api/user/exercise_records?start_date=${formattedDate}&end_date=${formattedDate}`
        `${process.env.REACT_APP_API_URL}/api/user/exercise_records`,
        {
          headers: {
            Authorization: jwtToken,
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
      console.log(exerciseRecords);

      const sortedRecords = exerciseRecords.data.records.sort(
        (a, b) => new Date(b.record_date) - new Date(a.record_date)
      );
      const { birthday, exercise_level, gender, height, weight, record_date } =
        sortedRecords[0];
      console.log({
        birthday,
        exercise_level,
        gender,
        height,
        weight,
        record_date,
      });

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
      // console.log(age); // 输出年龄
      // console.log(genderValue); // 输出性別代表的數字

      const sum1 =
        9.99 * weight + 6.25 * height - 4.92 * age + (166 * genderValue - 161);
      // setResult1(Math.round(sum1));
      const sum2 = Math.round(sum1) * exercise_level;
      setTargetCal(Math.round(sum2));
    }
  }, [exerciseRecords]);

  // 會員還有多少卡路里可以吃
  const [caloriesCanEat, setCaloriesCanEat] = useState(0);

  useEffect(() => {
    let caloriesReduce = parseInt(targetCal) - parseInt(calories);
    setCaloriesCanEat(caloriesReduce);
  }, [targetCal, calories]);

  useEffect(() => {
    if (!isNaN(caloriesCanEat)) {
      changeWord(caloriesCanEat);
    }
  }, [caloriesCanEat]);

  const changeWord = (caloriesCanEat) => {
    const displayText = isNaN(caloriesCanEat)
      ? "請輸入飲食紀錄"
      : caloriesCanEat > 0
      ? "還可以吃"
      : "已超標";
    return <div>{String(displayText)}</div>;
  };

  return (
    <div style={{ backgroundColor: "#F7F4E9", paddingBottom: "20px" }}>
      <MemberHeader />

      <div className="wrapper">
        {/* 其他 member area 內容 */}
        <div className="memberTitle">
          <h3 id="titleH3">會員專區</h3>
        </div>

        <div className="container">
          {/* 會員資訊 */}
          <div className="row memberInfo">
            <form id="memberHomeForm" className="col-12" action="">
              <div className="row">
                <div className="col-4 memberHomePageInfo">
                  <p
                    className="memberDataGroup"
                    style={{ minWidth: "80px" }}
                    htmlFor="userNumber"
                  >
                    會員編號：
                  </p>
                  <p className="memberDataGroup" htmlFor="userName">
                    姓名：
                  </p>
                  <p className="memberDataGroup" htmlFor="userGender">
                    性別：
                  </p>
                  <p className="memberDataGroup" htmlFor="userAge">
                    生日：
                  </p>
                  <p className="memberDataGroup" htmlFor="userHeight">
                    身高(cm)：
                  </p>
                  <p className="memberDataGroup" htmlFor="userWeight">
                    體重(kg)：
                  </p>
                  <p
                    className="memberDataGroup"
                    style={{ minWidth: "80px" }}
                    htmlFor="userSport"
                  >
                    運動頻率：
                  </p>
                </div>
                <div
                  className="col-4 memberHomePageInfo"
                  style={{ textAlign: "left" }}
                >
                  <p className="memberDataGroup">{user && user.user_id}</p>
                  <p className="memberDataGroup">{user && user.username}</p>
                  <p className="memberDataGroup">
                    {user && (user.gender === "male" ? "男生" : "女生")}
                  </p>
                  <p className="memberDataGroup">
                    {user &&
                      user.birthday &&
                      new Date(user.birthday).toLocaleDateString()}
                  </p>
                  <p className="memberDataGroup">{user && userHeight} </p>
                  <p className="memberDataGroup">{user && userWeight} </p>
                  <p className="memberDataGroup">
                    {user && exerciseLevel === 1.2 && "幾乎不運動"}
                    {user && exerciseLevel === 1.375 && "每週運動 1-3 天"}
                    {user && exerciseLevel === 1.55 && "每週運動 3-5 天"}
                    {user && exerciseLevel === 1.72 && "每週運動 6-7 天"}
                    {user &&
                      exerciseLevel === 1.9 &&
                      "長時間運動或體力勞動工作"}
                  </p>
                </div>
                <div className="col-4">
                  <img src={require("../../image/logo/logo.png")} alt="logo" />
                </div>
              </div>
            </form>

            {/* 數字圖表區 */}
            <div
              className="foodRecordBgDiv"
              style={{ backgroundColor: "#DCDBD7" }}
            >
              <div className="row foodRecordBg shadow p-3 mb-2 bg-body rounded">
                <div className="oneAndTwoAreaBg d-flex">
                  {/* 第一區 - 目標值與已攝取區 */}
                  <div className="w-50 position-relative">
                    <div style={{ fontSize: "28px" }}>{currentDate}</div>
                    {/* 目標量的Icon */}
                    <div className="oneAreaTarget">
                      <div>
                        <img
                          src={require("../../image/memberrecrod/target.png")}
                          alt="這是目標值"
                        />
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
                        <img
                          src={require("../../image/memberrecrod/fork.png")}
                          alt="這是刀叉圖片"
                        />
                      </div>
                      <div>已攝取</div>
                    </div>
                    {/* 已攝取量 */}
                    <div className="oneAreaAlreadyEatValue">
                      <div>{calories}</div>
                      <div>卡路里</div>
                    </div>
                  </div>

                  {/* 第二區 - 還可以吃多少量 */}
                  <div className="howMuchLeftBgDiv w-50">
                    <img
                      src={require("../../image/memberrecrod/circle-shape.png")}
                      alt=""
                    />
                    <div className="howMuchLeftValue">
                      {typeof caloriesCanEat === "number" ? (
                        <>
                          {changeWord(caloriesCanEat)}
                          <div className="calories">
                            {String(caloriesCanEat)}
                          </div>
                          <div>卡路里</div>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
                {/* 第三區 - 攝取營養量專區 */}
                <div className="ThreeAreaBg d-flex justify-content-around">
                  <div>
                    碳水化合物
                    <hr />
                    <div>{carbohydrate}</div>
                  </div>
                  <div>
                    蛋白質
                    <hr />
                    <div>{protein}</div>
                  </div>
                  <div>
                    脂肪
                    <hr />
                    <div>{saturatedFat}</div>
                  </div>
                  <div>
                    鈉
                    <hr />
                    <div>{sodium}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="memberHomePageBtn">
              <Link to="/foodRecord">
                <button className="foodRecordBtn" style={{ fontSize: "28px" }}>
                  紀錄飲食 GO
                </button>
              </Link>
            </div>

            <BarChart />

            <div className="memberHomePageBtn">
              <Link to="/MemberChartList">
                <button className="foodRecordBtn" style={{ fontSize: "28px" }}>
                  查看更多數據
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberHomePage;
