import React, { useState } from "react";
import { Link } from "react-router-dom";

import logo from "../image/logo/logo.png";

import "../styles/member/main.css";

const UserRegistration = () => {
  const [formValues, setFormValues] = useState({
    userAccount: "",
    userPassword: "",
    repeatPassword: "",
    userName: "",
    userGender: "",
    userBirthday: "",
    userHeight: "",
    userWeight: "",
    userSport: "幾乎不運動",
  });

  const {
    userAccount,
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

  const handleButtonClick = () => {
    console.log(formValues);
  };

  const isFormValid = () => {
    return (
      userAccount !== "" &&
      userPassword !== "" &&
      userPassword === repeatPassword
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      handleButtonClick();
    } else {
      console.log("表單尚未填寫完整或密碼規則不符合");
    }
  };

  return (
    <div style={{ backgroundColor: "#F7F4E9", padding: "20px" }}>
      <div className="wrapper">
        <div>
          <h3 id="titleH3">會員註冊</h3>
        </div>
        <div style={{ margin: "20px" }}>
          <img id="logoimg" src={logo} alt="" />
        </div>

        <div className="container">
          <div className="userInfo row">
            <form id="register1Form" className="col-12" onSubmit={handleSubmit}>
              <div className="row myMember row">
                <div className="col-6">
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
                <div className="col-6">
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
                  <label htmlFor="userAccount">
                    <i className="fa fa-user" style={{ fontSize: "30px" }}></i>
                  </label>
                </div>
                <div className="col-6">
                  <input
                    className="userInput"
                    type="text"
                    name="userAccount"
                    placeholder="請輸入帳號(E-mail信箱)"
                    value={userAccount}
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
                      value="男生"
                      checked={userGender === "男生"}
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
                      value="女生"
                      checked={userGender === "女生"}
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
                    name="userSport"
                    value={userSport}
                    onChange={handleChange}
                    required
                  >
                    <option value="幾乎不運動">幾乎不運動</option>
                    <option value="每週運動 1-3 天">每週運動 1-3 天</option>
                    <option value="每週運動 3-5 天">每週運動 3-5 天</option>
                    <option value="每週運動 6-7 天">每週運動 6-7 天</option>
                    <option value="長時間運動或體力勞動工作">
                      長時間運動或體力勞動工作
                    </option>
                  </select>
                  <br />
                </div>
              </div>

              <div className="row">
                <div>
                  <button
                    type="submit"
                    className="mysubmit"
                    disabled={!isFormValid()}
                    onClick={handleButtonClick}
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
