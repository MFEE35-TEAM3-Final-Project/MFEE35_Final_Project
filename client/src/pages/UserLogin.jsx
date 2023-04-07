import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const UserLogin = () => {
  // DATA
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [backData, setBackData] = useState({});
  const [jwtData, setJwtData] = useState("");
  // FUNCTION
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const loginFn = (e, data) => {
    e.preventDefault();
    // console.log(data);
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/user/login`, data)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setBackData(res.data);
      })
      .catch((err) => {
        localStorage.removeItem("token");
        setBackData(err.response.data);
      });
  };
  const checkJwt = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/user/check`, {
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
              id="email"
              name="email"
              value={userData.email}
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
              value={userData.password}
              onChange={inputHandler}
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
              backData.success === true ? "" : "text-danger"
            }`}
          >
            {JSON.stringify(backData)}
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
  );
};

export default UserLogin;
