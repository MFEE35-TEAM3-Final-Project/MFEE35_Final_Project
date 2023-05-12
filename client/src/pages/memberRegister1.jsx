import React, { useState } from "react";
import { Link } from "react-router-dom";

import MemberHeader from "../components/member/MemberHeader";
import Footer from "../components/member/Footer";

import logo from "../../src/images/logo/logo.png";

const UserRegistration = () => {
  const [formValues, setFormValues] = useState({
    userAccount: "",
    userPassword: "",
    confirmPassword: "",
  });

  const { userAccount, userPassword, confirmPassword } = formValues;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const isFormValid = () => {
    return (
      userAccount !== "" &&
      userPassword !== "" &&
      userPassword === confirmPassword
    );
  };

  return (
    <div style={{ backgroundColor: "#F7F4E9" }}>
      <MemberHeader />
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
                <div className="col-4">
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
                <div className="col-4">
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
                <div className="col-4">
                  <label htmlFor="confirmPassword">
                    <i className="fa fa-lock" style={{ fontSize: "30px" }}></i>
                  </label>
                </div>
                <div className="col-6">
                  <input
                    className="userInput"
                    type="password"
                    name="confirmPassword"
                    placeholder="請再輸入一次密碼"
                    value={confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <Link to={isFormValid() ? "/MemberRegister2" : ""}>
                  <button className="mysubmit" disabled={!isFormValid()}>
                    NEXT
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserRegistration;
