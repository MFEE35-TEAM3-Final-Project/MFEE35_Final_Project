import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const UserRegister = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeat_password, setRepeat_password] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //functions
  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }
  function handleR_PasswordChange(event) {
    setRepeat_password(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handleIsAdminChange(event) {
    setIsAdmin(event.target.checked);
  }

  function handleSubmit(event) {
    event.preventDefault();
    let formData = {
      username: username,
      email: email,
      password: password,
      repeat_password: repeat_password,
      isAdmin: isAdmin,
    };
    console.log("eve", formData);
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/user/register`, formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        setErrorMessage(err.message);
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
          <Form.Label htmlFor="username">使用者名稱：</Form.Label>
          <Form.Control
            type="text"
            id="username"
            name="username"
            value={username}
            minLength={6}
            maxLength={30}
            onChange={handleUsernameChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="password">密碼：</Form.Label>
          <Form.Control
            type="password"
            id="password"
            name="password"
            value={password}
            minLength={6}
            maxLength={50}
            pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"
            onChange={handlePasswordChange}
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
            id="r_password"
            name="r_password"
            value={repeat_password}
            minLength={6}
            maxLength={50}
            pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"
            onChange={handleR_PasswordChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">電子郵件：</Form.Label>
          <Form.Control
            type="email"
            id="email"
            name="email"
            value={email}
            minLength={6}
            maxLength={50}
            onChange={handleEmailChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3 d-flex">
          <Form.Check
            className="me-2"
            type="checkbox"
            id="isAdmin"
            name="isAdmin"
            checked={isAdmin}
            onChange={handleIsAdminChange}
          />
          <Form.Label htmlFor="isAdmin">是否為管理員</Form.Label>
        </Form.Group>

        <div className="mb-3">
          <button className="btn btn-outline-danger" type="submit">
            註冊
          </button>
        </div>

        {errorMessage && <div>{errorMessage}</div>}
      </Form>
    </div>
  );
};

export default UserRegister;
