import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/member/main.css";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/login`,
        {
          email: email,
          password: password,
        }
      );
      const token = loginResponse.data.token;
      // 儲存令牌到本地（例如localStorage）
      localStorage.setItem("token", token);

      // 使用令牌發送驗證請求
      const checkResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/check`,
        null,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (checkResponse.data.success) {
        // 令牌驗證成功
        // 執行後續操作（例如導航到其他頁面）
      } else {
        // 令牌驗證失敗
        console.error("令牌驗證失敗");
        // 設定錯誤訊息
        setErrorMessage("令牌驗證失敗");
      }
    } catch (error) {
      console.error("登入失敗", error);
      // 設定錯誤訊息
      setErrorMessage("登入失敗");
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
                    name="userEmail"
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
                    name="userPassword"
                    placeholder="請輸入密碼"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%&])[A-Za-z\d!@#$%&]{8,}$"
                    required
                    title="密碼長度至少8碼，需包含一個大寫英文字母、一個小寫英文字母、一個數字和一個特殊字元"
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
