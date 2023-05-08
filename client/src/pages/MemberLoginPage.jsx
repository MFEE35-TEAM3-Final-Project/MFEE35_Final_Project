import React from "react";
import { Link } from "react-router-dom";

import MemberHeader from "../components/member/MemberHeader";
import Footer from "../components/member/Footer";

import logo from "../../src/images/logo/logo.png";

const UserLogin = () => {
  return (
    <div style={{ backgroundColor: "#F7F4E9" }}>
      <MemberHeader />
      <div className="wrapper">
        <div>
          <h3 id="titleH3">會員登入</h3>
        </div>
        <div style={{ margin: "20px" }}>
          <img id="logoimg" src={logo} alt="" />
        </div>

        <div className="container">
          <div className="userInfo row">
            <form id="loginForm" className="col-12" action="">
              <div className="row myMember">
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
                    name="userName"
                    required
                  />
                  <br />
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
                    name="userName"
                    required
                  />
                  <br />
                </div>
              </div>

              <div>
                <button type="submit" className="mysubmit">
                  SIGN IN
                </button>
                <br />
              </div>
              <input id="userRem" type="checkbox" />
              <label htmlFor="userRem">Remember me</label>
              <div>
                <span className="psw">
                  {" "}
                  <a href="">Forgot Password ?</a>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserLogin;
