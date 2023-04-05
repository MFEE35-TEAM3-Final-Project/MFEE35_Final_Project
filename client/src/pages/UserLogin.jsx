import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const UserLogin = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: ""
  });
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const loginFn = () => {
    console.log("login");
  };
  return (
    <div>
      <div
        className="col-10 mt-5 px-2 mx-auto rounded "
        style={{ backgroundColor: "#fff5d5" }}
      >
        <Form className="p-2" onSubmit={loginFn}>
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
          </div>
        </Form>
      </div>
    </div>
  );
};

export default UserLogin;
