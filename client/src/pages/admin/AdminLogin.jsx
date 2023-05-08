import React, { useState } from "react";
import Form from "react-bootstrap/Form";

const AdminLogin = () => {
  // DATA
  const [adminData, setAdminData] = useState({
    email: "",
    password: ""
  });
  const [loginError, setLoginError] = useState("");

  // FUNCTION
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setAdminData({ ...adminData, [name]: value });
  };

  return (
    <div id="admin_login">
      <div className="adminpic">
        <img src="\img\adminpic.png" alt="pic" />
      </div>
      <div className="col-10 rounded " style={{ backgroundColor: "#fff5d5" }}>
        <Form className="p-2">
          <h1>登入</h1>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="email">Email:</Form.Label>
            <Form.Control
              type="text"
              id="email"
              name="email"
              value={adminData.email}
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
    </div>
  );
};

export default AdminLogin;
