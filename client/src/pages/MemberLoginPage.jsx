import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import MemberHeader from "../components/member/MemberHeader";

import "../styles/member/main.css";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // 檢查是否存在令牌，如果存在則執行驗證方法
    if (token) {
      verifyToken();
    }
  }, [token]);

  axios.defaults.headers.common["Authorization"] =
    "JWT " +
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI0MTUyNjA3ODcyIiwiZW1haWwiOiJBQUFBQUFrYWthQHRlc3QuY29tIiwiZXhwIjoxNjkyNDMwNjQxNTg2LCJpYXQiOjE2ODM3OTA2NDF9.u2OHIdFXKuYtXzhbib35iLVwarUZa39zMcEFCBJ82pg";

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
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("發生了一個錯誤，請稍後重試");
    }
  };

  const verifyToken = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/user/check`,
        {
          method: "POST",
          headers: {
            Authorization: `JWT ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("令牌驗證成功");
        console.log(data.user); // 可以根據需要處理使用者資訊
        navigate("/MemberHomePage");
      } else {
        const errorData = await response.json();
        console.log("令牌驗證失敗");
        console.log(errorData.message); // 顯示錯誤訊息或執行其他錯誤處理
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("發生了一個錯誤，請稍後重試");
    }
  };

  return (
    <div style={{ backgroundColor: "#F7F4E9", padding: "20px" }}>
      {/* <MemberHeader /> */}

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
                    value={email} // 將value設定為email狀態變數
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
                    value={password} // 將value設定為password狀態變數
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
