import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const UserRegister = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    repeat_password: "",
    username: "",
    // birthday: "",
    phone: "",
    address: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [backUserMeg, setBackUserMeg] = useState({});

  //functions
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/user/register`, userData)
      .then((res) => {
        console.log(res);
        setBackUserMeg(res.data);
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
      });
  }

  return (
    <div
      className="bg-secondary
    "
    >
      <Form className="p-2" onSubmit={handleSubmit}>
        <h1>註冊表單</h1>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">電子郵件：</Form.Label>
          <Form.Control
            type="email"
            id="email"
            name="email"
            value={userData.email}
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
            value={userData.password}
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
            value={userData.repeat_password}
            minLength={6}
            maxLength={50}
            pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"
            onChange={inputHandler}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="username">會員名稱：</Form.Label>
          <Form.Control
            type="text"
            id="username"
            name="username"
            value={userData.username}
            maxLength={30}
            onChange={inputHandler}
          />
        </Form.Group>
        {/* <Form.Group className="mb-3">
          <Form.Label htmlFor="birthday">生日(選填)：</Form.Label>
          <Form.Control
            type="date"
            id="birthday"
            name="birthday"
            max={new Date().toISOString().substr(0, 10)}
            value={userData.birthday}
            onChange={inputHandler}
          />
        </Form.Group> */}
        <Form.Group className="mb-3">
          <Form.Label htmlFor="phone">連絡電話(選填)：</Form.Label>
          <Form.Control
            type="tel"
            maxLength="10"
            id="phone"
            name="phone"
            value={userData.phone}
            onChange={inputHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="address">地址(選填)：</Form.Label>
          <Form.Control
            type="text"
            id="address"
            name="address"
            value={userData.address}
            onChange={inputHandler}
          />
        </Form.Group>
        <div className="mb-3">
          <button className="btn btn-outline-danger" type="submit">
            註冊
          </button>
        </div>

        {errorMessage && <div>{errorMessage}</div>}
      </Form>
      {<div className="fs-5  text-danger">{JSON.stringify(backUserMeg)}</div>}
    </div>
  );
};

export default UserRegister;
