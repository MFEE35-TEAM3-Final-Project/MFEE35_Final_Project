import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Nav from "../components/Nav";
import "../styles/member/main.css";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/login`,
        {
          email,
          password,
        }
      );

      if (response.data.success) {
        console.log("成功");
        const authToken = response.data.token;
        const expDate = new Date(response.data.exp);
        Cookies.set("jwtToken", authToken, { expires: expDate });
        navigate("/MemberHomePage");
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("發生了一個錯誤，請稍後重試");
    }
  };

  return (
    <div style={{ backgroundColor: "#F7F4E9", padding: "20px" }}>
      <Nav />
      <div className="wrapper" style={{ backgroundColor: "#F7F4E9" }}>
        <div>
          <h3 id="titleH3">會員登入</h3>
        </div>
        <div style={{ margin: "20px" }}>
          <img id="logoimg" src={require("../image/logo-black.png")} alt="" />
        </div>
        <div className="container">
          <div className="userInfo row" style={{ width: "50%" }}>
            <form id="loginForm" className="col-12" onSubmit={handleSubmit}>
              <div className="row myMember">
                <div
                  className="col-6"
                  id="loginBox"
                  style={{ textAlign: "center" }}
                >
                  <Link
                    to="/LoginPage"
                    style={{
                      textDecoration: "none",
                      color: "black",
                      fontSize: "25px",
                    }}
                  >
                    會員登入
                  </Link>
                </div>
                <div
                  className="col-6"
                  id="registerBox"
                  style={{ textAlign: "center" }}
                >
                  <Link
                    to="/MemberRegister"
                    className="loginBtn"
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
                    placeholder="請輸入帳號(E-mail信箱)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    placeholder="請輸入密碼(6~16位英數字)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <br />
                </div>
              </div>

              <div style={{ textAlign: "center" }}>
                <button type="submit" className="mysubmit">
                  SIGN IN
                </button>
                <br />
              </div>

              <div style={{ textAlign: "center" }}>
                <span className="psw">
                  {" "}
                  <a href="">Forgot Password ?</a>
                </span>
              </div>
              {errorMessage && <div>{errorMessage}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserLogin;
