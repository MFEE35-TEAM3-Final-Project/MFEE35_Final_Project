import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import MemberHeader from "../components/member/MemberHeader";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // 检查是否存在令牌，如果存在则执行验证方法
    if (token) {
      verifyToken();
    }
  }, [token]);

  const handleSubmit = async (e, data) => {
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
            Authorization: token,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("令牌验证成功");
        console.log(data.user); // 可以根据需要处理用户信息
        navigate("/MemberHomePage");
      } else {
        const errorData = await response.json();
        console.log("令牌验证失败");
        console.log(errorData.message); // 显示错误消息或执行其他错误处理
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("发生了一个错误，请稍后重试");
    }
  };

  return (
    <div style={{ backgroundColor: "#F7F4E9" }}>
      <MemberHeader />
      <div className="wrapper">
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
