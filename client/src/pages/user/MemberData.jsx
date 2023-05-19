import React, { useState, useEffect } from "react";
import axios from "axios";
import MemberHeader from "../../components/member/MemberHeader";

import "../../styles/member/userinfo.css";

function MemberData() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [userHeight, setUserHeight] = useState("");
  const [userWeight, setUserWeight] = useState("");
  const [exerciseLevel, setExerciseLevel] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userAddress, setUserAddress] = useState("");

  useEffect(() => {
    fetchMemberData();
  }, []);

  const fetchMemberData = async () => {
    try {
      const jwtToken = document.cookie.replace(
        /(?:(?:^|.*;\s*)jwtToken\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      );

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
        // setUserHeight(userData.Height);
        // setUserWeight(userData.userWeight);
        // setExerciseLevel(userData.exerciseLevel);
        setUserPhone(userData.phone);
        setUserAddress(userData.address);

        console.log(userHeight); // 檢查身高值

        // GET請求獲得運動紀錄數據
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

            // console.log(`Weight: ${weight}`);
            // console.log(`Height: ${height}`);
            // console.log(`Exercise Level: ${exerciseLevel}`);

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

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const updatedData = {
        userHeight,
        userWeight,
        exerciseLevel,
        phone: userPhone,
        address: userAddress,
      };

      const jwtToken = document.cookie.replace(
        /(?:(?:^|.*;\s*)jwtToken\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      );

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/exercise_records`,
        updatedData,
        {
          headers: {
            Authorization: jwtToken,
          },
        }
      );

      if (response.data.success) {
        setIsEditing(false);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div style={{ backgroundColor: "#F7F4E9", paddingBottom: "20px" }}>
      <MemberHeader />
      <div className="wrapper">
        <div className="memberTitle">
          <h3 id="titleH3">會員資料</h3>
        </div>

        {/* 表單 */}
        <div className="container">
          <div className="userInfo row">
            <form className="col-12" action="" id="userInfoForm">
              {/* 會員編號 */}
              <div className="row">
                <div className="col-4" style={{ textAlign: "right" }}>
                  <label style={{ minWidth: "80px" }} htmlFor="userNumber">
                    會員編號：
                  </label>
                </div>
                <div className="col-6">
                  <p>{user && user.user_id}</p>
                </div>
                <div className="col-2">
                  {!isEditing && (
                    <button className="infoupdateBtn" onClick={handleEdit}>
                      修改基本資料
                    </button>
                  )}
                </div>
              </div>

              {/* 姓名 */}
              <div className="row">
                <div className="col-4" style={{ textAlign: "right" }}>
                  <label htmlFor="userName">姓名：</label>
                </div>
                <div className="col-6">
                  <p>{user && user.username}</p>
                </div>
                <div className="col-2"></div>
              </div>

              {/* 電子郵件 */}
              <div className="row">
                <div className="col-4" style={{ textAlign: "right" }}>
                  <label htmlFor="email">電子郵件：</label>
                </div>
                <div className="col-6">
                  <p>{user && user.email}</p>
                </div>
                <div className="col-2"></div>
              </div>

              {/* 性別 */}
              <div className="row">
                <div className="col-4" style={{ textAlign: "right" }}>
                  <label htmlFor="gender">性別：</label>
                </div>
                <div className="col-6">
                  <p>{user && (user.gender === "male" ? "男生" : "女生")}</p>
                </div>
                <div className="col-2"></div>
              </div>

              {/* 生日 */}
              <div className="row">
                <div className="col-4" style={{ textAlign: "right" }}>
                  <label htmlFor="birthday">生日：</label>
                </div>
                <div className="col-6">
                  <p>
                    {user &&
                      user.birthday &&
                      new Date(user.birthday).toLocaleDateString()}
                  </p>
                </div>
                <div className="col-2"></div>
              </div>

              {/* 基本資料 - 身高 */}
              <div className="row">
                <div className="col-4" style={{ textAlign: "right" }}>
                  <label htmlFor="userHeight">身高：</label>
                </div>
                <div className="col-6">
                  {isEditing ? (
                    <input
                      className="userInput"
                      type="text"
                      name="userHeight"
                      value={userHeight}
                      onChange={(e) => setUserHeight(e.target.value)}
                      required
                    />
                  ) : (
                    <p>{user && userHeight} cm</p>
                  )}
                </div>
              </div>

              {/* 基本資料 - 體重 */}
              <div className="row">
                <div className="col-4" style={{ textAlign: "right" }}>
                  <label htmlFor="userWeight">體重：</label>
                </div>
                <div className="col-6">
                  {isEditing ? (
                    <input
                      className="userInput"
                      type="text"
                      name="userWeight"
                      value={userWeight}
                      onChange={(e) => setUserWeight(e.target.value)}
                      required
                    />
                  ) : (
                    <p>{user && userWeight} Kg</p>
                  )}
                </div>
              </div>

              <div className="row">
                <div className="col-4" style={{ textAlign: "right" }}>
                  <label style={{ minWidth: "80px" }} htmlFor="userSport">
                    運動頻率：
                  </label>
                </div>
                <div className="col-6">
                  {isEditing ? (
                    <select
                      className="userInput"
                      id="exerciseSelect"
                      name="exerciseLevel"
                      value={exerciseLevel}
                      onChange={(e) => setExerciseLevel(e.target.value)}
                      required
                    >
                      <option value="1.2">幾乎不運動</option>
                      <option value="1.375">每週運動 1-3 天</option>
                      <option value="1.55">每週運動 3-5 天</option>
                      <option value="1.72">每週運動 6-7 天</option>
                      <option value="1.9">長時間運動或體力勞動工作</option>
                    </select>
                  ) : (
                    <p>
                      {user && exerciseLevel === 1.2 && "幾乎不運動"}
                      {user && exerciseLevel === 1.375 && "每週運動 1-3 天"}
                      {user && exerciseLevel === 1.55 && "每週運動 3-5 天"}
                      {user && exerciseLevel === 1.72 && "每週運動 6-7 天"}
                      {user &&
                        exerciseLevel === 1.9 &&
                        "長時間運動或體力勞動工作"}
                    </p>
                  )}
                </div>
              </div>

              {/* 聯絡電話 */}
              <div className="row">
                <div className="col-4" style={{ textAlign: "right" }}>
                  <label htmlFor="phone">聯絡電話：</label>
                </div>
                <div className="col-6">
                  {isEditing ? (
                    <input
                      className="userInput"
                      type="text"
                      id="userPhone"
                      name="phone"
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                    />
                  ) : (
                    <p>{user && user.phone}</p>
                  )}
                </div>
                <div className="col-2"></div>
              </div>

              {/* 地址 */}
              <div className="row">
                <div className="col-4" style={{ textAlign: "right" }}>
                  <label htmlFor="address">地址：</label>
                </div>
                <div className="col-6">
                  {isEditing ? (
                    <input
                      className="userInput"
                      type="text"
                      id="address"
                      name="address"
                      value={userAddress}
                      onChange={(e) => setUserAddress(e.target.value)}
                    />
                  ) : (
                    <p>{user && user.address}</p>
                  )}
                </div>
                <div className="col-2"></div>
              </div>

              {/* 操作按鈕 */}
              {isEditing ? (
                <div className="row">
                  <div className="col-4"></div>
                  <div className="col-6">
                    <button id="upDateBtn" onClick={handleSave}>
                      SAVE
                    </button>
                    <button id="upDateBtn" onClick={handleCancel}>
                      CANCEL
                    </button>
                  </div>
                  <div className="col-2"></div>
                </div>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberData;
