import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import { format } from "date-fns";

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

  // 取得當前日期
  useEffect(() => {
    const getCurrentDate = () => {
      const weekdays = ["日", "一", "二", "三", "四", "五", "六"];
      const currentDate = new Date();

      const formattedDate = `星期${weekdays[currentDate.getDay()]}, ${
        currentDate.getMonth() + 1
      }月 ${currentDate.getDate()}日`;

      setCurrentDate(formattedDate);
    };

    getCurrentDate();
  }, []);

  useEffect(() => {
    const jwtToken = Cookies.get("jwtToken");
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/user/meal_records`, {
        headers: {
          Authorization: jwtToken,
        },
      })
      .then((res) => {
        console.log(res.data.groupedResults[0].total_calories);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

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
                    <div>{currentDate}</div>
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
                      <div>3000</div>
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
                      <div>1430</div>
                      <div>卡路里</div>
                    </div>
                  </div>

                  {/* 第二區 - 還可以吃多少量 */}
                  <div className="howMuchLeftBgDiv w-50">
                    <img src="./images/memberrecrod/circle-shape.png" alt="" />
                    <div className="howMuchLeftValue">
                      <div>還可以吃</div>
                      <div>1570</div>
                      <div>卡路里</div>
                    </div>
                  </div>
                </div>
                {/* 第三區 - 攝取營養量專區 */}
                <div className="ThreeAreaBg d-flex justify-content-around">
                  <div>
                    碳水化合物
                    <hr />
                    <div>2149</div>
                  </div>
                  <div>
                    蛋白質
                    <hr />
                    <div>51</div>
                  </div>
                  <div>
                    脂肪
                    <hr />
                    <div>183</div>
                  </div>
                  <div>
                    鈉
                    <hr />
                    <div>123</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="memberHomePageBtn">
              <button className="foodRecordBtn" style={{ fontSize: "28px" }}>
                紀錄飲食 GO
              </button>
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
