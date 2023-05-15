import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "../image/logo/logo.png";

import "../styles/member/main.css";

const UserRegistration = () => {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    userAccount: "",
    userPassword: "",
    repeatPassword: "",
  });

  const { userAccount, userPassword, repeatPassword } = formValues;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleButtonClick = () => {
    if (isFormValid()) {
      console.log("Password:", formValues.userPassword);
      console.log("RepeatPassword", formValues.repeatPassword);
      navigate("/MemberRegister2", { state: { userMail: userAccount } });
    }
  };

  const isFormValid = () => {
    return (
      userAccount !== "" &&
      userPassword !== "" &&
      userPassword === repeatPassword
    );
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
            <form id="register1Form" className="col-12" action="">
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
                <div className="col-4" style={{ textAlign: "right" }}>
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
                <div className="col-4" style={{ textAlign: "right" }}>
                  <label htmlFor="userPassword">
                    <i className="fa fa-lock" style={{ fontSize: "30px" }}></i>
                  </label>
                </div>
                <div className="col-6">
                  <input
                    className="userInput"
                    type="password"
                    name="userPassword"
                    placeholder="請輸入密碼(6~16位英數字)"
                    value={userPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-4" style={{ textAlign: "right" }}>
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

              <div>
                <button
                  className="mysubmit"
                  disabled={!isFormValid()}
                  onClick={handleButtonClick}
                >
                  NEXT
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;
