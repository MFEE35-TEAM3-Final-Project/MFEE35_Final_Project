import React from "react";
import { useNavigate } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import { Avatar, Dropdown } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { adminLogout } from "../../service/redux/action";

const AdminCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const adminData = useSelector((state) => {
    return state.admin.adminData;
  });

  const deleteCookie = (cookieName) => {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };
  const handleLogout = () => {
    dispatch(adminLogout());
    deleteCookie("jwtToken");
  };

  const items = [
    {
      label: "切換管理員",
      key: "switchAdmin",
      onClick: () => {
        handleLogout();
        navigate("/admin/login");
      }
    },
    {
      label: "登出",
      key: "logout",
      onClick: () => {
        handleLogout();
        navigate("/");
      }
    }
  ];

  return (
    <>
      {adminData ? (
        <>
          <Dropdown menu={{ items }} trigger={["click"]}>
            <div className="navbar_admin d-flex px-3">
              <div>
                <Avatar size={42} src={adminData.avatar} />
              </div>
              <div className="fs-5 fw-bold mx-2" style={{ color: "#6c757d" }}>
                {adminData.adminname}
              </div>
              <div className="mx-2">
                <DownOutlined />
              </div>
            </div>
          </Dropdown>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default AdminCard;
