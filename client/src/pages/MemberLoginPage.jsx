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
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const loginData = loginResponse.data;

      if (loginResponse.status === 200) {
        // 登入成功
        const { token, userId } = loginData;

        // 在此處儲存token和userId，例如使用localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);

        // 發送token驗證請求
        const tokenResponse = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/user/check`,
          {},
          {
            headers: {
              Authorization: token,
            },
          }
        );

        const tokenData = tokenResponse.data;

        if (tokenResponse.status === 200) {
          // Token驗證成功
          console.log(tokenData.message);
        } else {
          // Token驗證失敗
          console.log(tokenData.message);
        }
      } else {
        // 登入失敗
        setErrorMessage(loginData.message);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("發生錯誤");
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
