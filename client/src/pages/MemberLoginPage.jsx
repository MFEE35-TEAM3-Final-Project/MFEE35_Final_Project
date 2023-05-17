import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import "../styles/member/main.css";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const authToken = Cookies.get("authToken");
    if (authToken) {
      verifyToken(authToken);
    }
  }, []);

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
        const authToken = response.data.token;
        setToken(authToken);
        Cookies.set("authToken", authToken, { expires: 7 }); // 將 Token 存放在 Cookies 中，有效期為 7 天
        navigate("/MemberHomePage");
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("發生了一個錯誤，請稍後重試");
    }
  };

  const verifyToken = async (token) => {
    try {
      axios.defaults.headers.common["Authorization"] = token;

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/check`
      );

      if (response.data.success) {
        console.log("請求成功:", response.data);
        const data = response.data;
        console.log("已驗證 Token");
        console.log(data.user);
        // 可以根據需要處理使用者資訊
      } else {
        console.log("Token 錯誤，請重新登入");
        console.log(response.data.message);
        // 顯示錯誤訊息或執行其他錯誤處理
      }
    } catch (error) {
      console.error("請求失敗:", error);

      console.error(error);
      setErrorMessage("發生了一個錯誤，請稍後重試");
    }
  };

  return (
    <div style={{ backgroundColor: "#F7F4E9", padding: "20px" }}>
      <div className="wrapper" style={{ backgroundColor: "#F7F4E9" }}>
        <div>
          <h3 id="titleH3">會員登入</h3>
        </div>
        <div style={{ margin: "20px" }}>
          <img id="logoimg" src="/image/logo/logo.png" alt="" />
        </div>
        <div className="container">
          <div className="userInfo row">
            <form id="loginForm" className="col-12" onSubmit={handleSubmit}>
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
              {errorMessage && <div>{errorMessage}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserLogin;
