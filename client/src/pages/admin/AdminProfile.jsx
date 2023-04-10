import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";

const AdminProfile = () => {
  const [adminData, setAdminData] = useState({
    adminname: "",
    password: "",
    repeat_password: "",
    email: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [backAdminMeg, setBackAdminMeg] = useState({});
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [loginBackData, setLoginBackData] = useState({});
  const [jwtData, setJwtData] = useState("");
  //functions
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setAdminData({ ...adminData, [name]: value });
  };
  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/admin/register`, adminData)
      .then((res) => {
        console.log(res);
        setBackAdminMeg(res.data);
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
      });
  }
  const loginInputHandler = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const loginFn = (e, data) => {
    e.preventDefault();
    // console.log(data);
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/admin/login`, data)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setLoginBackData(res.data);
      })
      .catch((err) => {
        localStorage.removeItem("token");
        setLoginBackData(err.response.data);
      });
  };
  const checkJwt = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/admin/check`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setJwtData(res.status + "  " + res.data.message);
      })
      .catch((err) => {
        console.log(err);
        setJwtData(err.response.status + err.response.data.message);
      });
  };
  return (
    <div>
      {/* register */}
      <div
        className="bg-success-subtle
    "
      >
        <Form className="p-2" onSubmit={handleSubmit}>
          <h1 className="fw-bold text-danger-emphasis">管理員註冊</h1>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="adminname">管理員名稱：</Form.Label>
            <Form.Control
              type="text"
              id="adminname"
              name="adminname"
              value={adminData.adminname}
              minLength={6}
              maxLength={30}
              onChange={inputHandler}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="email">電子郵件：</Form.Label>
            <Form.Control
              type="email"
              id="email"
              name="email"
              value={adminData.email}
              minLength={6}
              maxLength={50}
              onChange={inputHandler}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="password">密碼：</Form.Label>
            <Form.Control
              type="password"
              id="password"
              name="password"
              value={adminData.password}
              minLength={6}
              maxLength={50}
              pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"
              onChange={inputHandler}
              required
            />
            <small className="text-warning fw-bold">
              必須含有大小寫英文和數字
            </small>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="password">確認密碼：</Form.Label>
            <Form.Control
              type="password"
              id="repeat_password"
              name="repeat_password"
              value={adminData.repeat_password}
              minLength={6}
              maxLength={50}
              pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"
              onChange={inputHandler}
              required
            />
          </Form.Group>

          <div className="mb-3">
            <button className="btn btn-outline-danger" type="submit">
              註冊
            </button>
          </div>

          {errorMessage && <div>{errorMessage}</div>}
        </Form>
        {
          <div className="fs-5  text-danger">
            {JSON.stringify(backAdminMeg)}
          </div>
        }
      </div>

      {/* LOGIN */}
      <div>
        <div
          className="col-10 mt-5 px-2 mx-auto rounded "
          style={{ backgroundColor: "#fff5d5" }}
        >
          <Form
            className="p-2"
            onSubmit={(e) => {
              loginFn(e, userData);
            }}
          >
            <h1>登入</h1>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="email">Email:</Form.Label>
              <Form.Control
                type="text"
                id="loginEmail"
                name="email"
                value={userData.email}
                onChange={loginInputHandler}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="password">密碼：</Form.Label>
              <Form.Control
                type="password"
                id="loginPassword"
                name="password"
                value={userData.password}
                onChange={loginInputHandler}
                required
              />
            </Form.Group>

            <div className="mb-3">
              <button className="btn btn-primary" type="submit">
                LOGIN
              </button>
              <p className="mt-3">EMAIL: banana0583@fruitz.com</p>
              <p>PASSWORD: Apple203</p>
            </div>
          </Form>
        </div>
        <div className="col-10 mx-auto mt-5">
          <div className="p-2 bg-white rounded">
            <h1 className="">回傳結果</h1>

            <p
              className={`text-break w-100 ${
                loginBackData.success === true ? "" : "text-danger"
              }`}
            >
              {JSON.stringify(loginBackData)}
            </p>
          </div>
          <div className="mt-5 p-2 bg-info-subtle rounded">
            <h1>CHECK</h1>
            <button
              className="btn btn-warning"
              onClick={() => {
                checkJwt();
              }}
            >
              Check API
            </button>
            {jwtData && <p className="mt-3  text-danger">{jwtData}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
