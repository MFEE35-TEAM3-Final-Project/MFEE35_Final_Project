import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import logo from "../image/logo/logo.png";
import "../styles/member/main.css";
import Nav from "../components/Nav";

const UserRegistration = () => {
  const [formValues, setFormValues] = useState({
    userMail: "",
    userPassword: "",
    repeatPassword: "",
    userName: "",
    userGender: "",
    userBirthday: "",
    userHeight: "",
    userWeight: "",
    userSport: "1.2",
  });

  const {
    userMail,
    userPassword,
    repeatPassword,
    userName,
    userGender,
    userBirthday,
    userHeight,
    userWeight,
    userSport,
  } = formValues;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const isFormValid = () => {
    return (
      userMail !== "" && userPassword !== "" && userPassword === repeatPassword
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isFormValid()) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/user/register`,
          {
            email: userMail,
            username: userName,
            password: userPassword,
            repeat_password: repeatPassword,
            gender: userGender,
            birthday: userBirthday,
          }
        );

        if (response.data.success) {
          console.log(response.data); // 註冊成功後的操作
          alert("已建立成功");

          const loginResponse = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/user/login`,
            {
              email: userMail,
              password: userPassword,
            }
          );

          if (loginResponse.data.success) {
            console.log(loginResponse.data);

            const { token, exp } = loginResponse.data;
            const expDate = new Date(exp);
            document.cookie = `jwtToken=${token}; expires=${expDate.toUTCString()}`;

            // 檢查Token並取得會員資料
            const checkTokenResponse = await axios.post(
              `${process.env.REACT_APP_API_URL}/api/user/check`,
              {},
              {
                headers: {
                  Authorization: token,
                },
              }
            );

            if (checkTokenResponse.data.success) {
              console.log(checkTokenResponse.data); // Token認證成功後的操作

              // 調用運動部分API
              const exerciseRecordResponse = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/user/exercise_records`,
                {
                  gender: userGender,
                  birthday: userBirthday,
                  weight: userWeight,
                  height: userHeight,
                  exercise_level: userSport,
                  record_date: new Date().toISOString().slice(0, 10),
                },
                {
                  headers: {
                    Authorization: token,
                  },
                }
              );

              if (exerciseRecordResponse.data.success) {
                console.log(exerciseRecordResponse.data); // 運動API調用成功後的操作
                // 跳轉到根目錄
                window.location.href = "/MemberData";
              } else {
                console.log(exerciseRecordResponse.data); // 運動API調用失敗後的操作
              }
            } else {
              console.log(checkTokenResponse.data.message); // Token認證失敗後的操作
              alert(checkTokenResponse.data.message);
            }
          } else {
            console.log(loginResponse.data.message); // 登入失敗後的操作
            alert(loginResponse.data.message);
          }
        } else {
          console.log(response.data.message); // 註冊失敗後的操作
          alert(response.data.message);
        }
      } catch (error) {
        console.error(error); // 與伺服器通訊發生錯誤的操作
      }
    } else {
      console.log("表單尚未填寫完整或密碼規則不符合");
    }
  };

  return (
    <div style={{ backgroundColor: "#F7F4E9", padding: "20px" }}>
      <Nav />
      <div className="wrapper">
        <div>
          <h3 id="titleH3">會員註冊</h3>
        </div>
        <div style={{ margin: "20px" }}>
          <img id="logoimg" src={logo} alt="" />
        </div>

        <div className="container">
          <div className="userInfo row">
            <form id="registerForm" className="col-12" onSubmit={handleSubmit}>
              <div className="row myMember">
                <div className="col-6" style={{ textAlign: "center" }}>
                  <Link
                    to="/LoginPage"
                    className="userbtn"
                    style={{
                      textDecoration: "none",
                      color: "black",
                      fontSize: "25px",
                    }}
                  >
                    會員登入
                  </Link>
                </div>
                <div className="col-6" style={{ textAlign: "center" }}>
                  <Link
                    to="/MemberRegister1"
                    className="userbtn"
                    style={{
                      textDecoration: "none",
                      color: "black",
                      fontSize: "25px",
                    }}
                  >
                    會員註冊
                  </Link>
                </div>
              </div>

              <div className="row">
                <div
                  className="col-4"
                  style={{ textAlign: "right", paddingRight: "30px" }}
                >
                  <label htmlFor="userMail">
                    <i className="fa fa-user" style={{ fontSize: "30px" }}></i>
                  </label>
                </div>
                <div className="col-6">
                  <input
                    className="userInput"
                    type="text"
                    name="userMail"
                    placeholder="請輸入帳號(E-mail信箱)"
                    value={userMail}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div
                  className="col-4"
                  style={{ textAlign: "right", paddingRight: "30px" }}
                >
                  <label htmlFor="userPassword">
                    <i className="fa fa-lock" style={{ fontSize: "30px" }}></i>
                  </label>
                </div>
                <div className="col-6">
                  <input
                    className="userInput"
                    type="password"
                    name="userPassword"
                    placeholder="請輸入密碼"
                    value={userPassword}
                    onChange={handleChange}
                    pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%&])[A-Za-z\d!@#$%&]{8,}$"
                    required
                    title="密碼長度至少8碼，需包含一個大寫英文字母、一個小寫英文字母、一個數字和一個特殊字元"
                  />
                </div>
              </div>
              <div className="row">
                <div
                  className="col-4"
                  style={{ textAlign: "right", paddingRight: "30px" }}
                >
                  <label htmlFor="repeatPassword">
                    <i className="fa fa-lock" style={{ fontSize: "30px" }}></i>
                  </label>
                </div>
                <div className="col-6">
                  <input
                    className="userInput"
                    type="password"
                    name="repeatPassword"
                    placeholder="請再輸入一次密碼"
                    value={repeatPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-4">
                  <label htmlFor="userName">姓名：</label>
                </div>
                <div className="col-6">
                  <input
                    className="userInput"
                    type="text"
                    name="userName"
                    placeholder=""
                    value={userName}
                    onChange={handleChange}
                    required
                  />
                  <br />
                </div>
              </div>

              <div className="row">
                <div className="col-4">
                  <label htmlFor="userGender">性別：</label>
                </div>
                <div className="col-6 row">
                  <div className="col-5">
                    <input
                      className="userGender"
                      type="radio"
                      name="userGender"
                      id="male"
                      value="male"
                      checked={userGender === "male"}
                      onChange={handleChange}
                    />
                    <label className="usergender" htmlFor="male">
                      男生
                    </label>
                  </div>
                  <div className="col-5">
                    <input
                      className="userGender"
                      type="radio"
                      name="userGender"
                      id="female"
                      value="female"
                      checked={userGender === "female"}
                      onChange={handleChange}
                    />
                    <label className="usergender" htmlFor="female">
                      女生
                    </label>
                    <br />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-4">
                  <label htmlFor="userBirthday">生日：</label>
                </div>
                <div className="col-6">
                  <input
                    className="userInput"
                    type="date"
                    name="userBirthday"
                    placeholder=""
                    value={userBirthday}
                    onChange={handleChange}
                    required
                  />
                  <br />
                </div>
              </div>

              <div className="row">
                <div className="col-4">
                  <label htmlFor="userHeight">身高：</label>
                </div>
                <div className="col-6">
                  <input
                    className="userInput"
                    type="text"
                    name="userHeight"
                    placeholder=""
                    value={userHeight}
                    onChange={handleChange}
                    required
                  />
                  <br />
                </div>
              </div>

              <div className="row">
                <div className="col-4">
                  <label htmlFor="userWeight">體重：</label>
                </div>
                <div className="col-6">
                  <input
                    className="userInput"
                    type="text"
                    name="userWeight"
                    placeholder=""
                    value={userWeight}
                    onChange={handleChange}
                    required
                  />
                  <br />
                </div>
              </div>

              <div className="row">
                <div className="col-4">
                  <label style={{ minWidth: "80px" }} htmlFor="userSport">
                    運動頻率：
                  </label>
                </div>
                <div className="col-6">
                  <select
                    id="exerciseSelect"
                    name="userSport"
                    value={userSport}
                    onChange={handleChange}
                    required
                  >
                    <option value="1.2">幾乎不運動</option>
                    <option value="1.375">每週運動 1-3 天</option>
                    <option value="1.55">每週運動 3-5 天</option>
                    <option value="1.72">每週運動 6-7 天</option>
                    <option value="1.9">長時間運動或體力勞動工作</option>
                  </select>
                  <br />
                </div>
              </div>

              <div className="row">
                <div style={{ textAlign: "center" }}>
                  <button
                    type="submit"
                    className="mysubmit"
                    disabled={!isFormValid()}
                  >
                    Finish
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserRegistration;
