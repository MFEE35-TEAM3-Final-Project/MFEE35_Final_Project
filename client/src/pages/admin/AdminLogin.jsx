import { useState } from "react";
import { Button, Checkbox, Form, Input, message, Alert } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import adminLogo from "../../image/icon-admin.png";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const [error, setError] = useState(null);
  // function
  const deleteCookie = (cookieName) => {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };
  const onFinish = (values) => {
    const data = {
      email: values.email,
      password: values.password
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/admin/login`, data)
      .then((res) => {
        const { token, exp } = res.data;
        const expDate = new Date(exp);
        document.cookie = `jwtToken=${token}; expires=${expDate.toUTCString()};path=/;`;
        navigate("/admin/backstage");
      })
      .catch((err) => {
        deleteCookie("jwtToken");
        setError("email或密碼錯誤");
        messageApi.open({
          type: "error",
          content: "email或密碼錯誤"
        });
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div id="admin_login" style={{ backgroundColor: "#e4dcd1" }}>
      <div className="login_pic">
        <div style={{ backgroundColor: "white" }}>
          <img className="w-100" src={adminLogo} alt="" />
        </div>
      </div>
      <div className="">
        {contextHolder}
        <Form
          name="basic"
          labelCol={{
            span: 8
          }}
          wrapperCol={{
            span: 16
          }}
          style={{
            maxWidth: 600
          }}
          initialValues={{
            remember: true
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!"
              },
              {
                required: true,
                message: "Please input your E-mail!"
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!"
              }
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16
            }}
          >
            <Button type="primary" htmlType="submit">
              Admin Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AdminLogin;
