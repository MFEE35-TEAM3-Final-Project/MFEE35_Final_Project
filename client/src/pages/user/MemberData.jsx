import React, { useState, useEffect } from "react";
import axios from "axios";
import MemberHeader from "../../components/member/MemberHeader";

import "../../styles/member/userinfo.css";

function MemberData() {
  const [user, setUser] = useState(null); // 存儲會員資料的狀態
  const [isEditing, setIsEditing] = useState(false); // 是否處於編輯模式

  useEffect(() => {
    fetchMemberData(); // 初始化時獲取會員資料
  }, []);

  const fetchMemberData = async () => {
    try {
      const jwtToken = document.cookie.replace(
        /(?:(?:^|.*;\s*)jwtToken\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      );

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/check`,
        null,
        {
          headers: {
            Authorization: jwtToken,
          },
        }
      );

      if (response.data.success) {
        const userData = response.data.user;
        setUser(userData); // 將會員資料存儲到狀態中
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // 處理保存邏輯

    // 將保存後的數據更新到後端
    // ...

    setIsEditing(false);
  };

  const handleCancel = () => {
    // 處理取消邏輯

    setIsEditing(false);
  };

  return (
    <div style={{ backgroundColor: "#F7F4E9", paddingBottom: "20px" }}>
      <MemberHeader />
      <div className="wapper">
        <div className="memberTitle">
          <h3 id="titleH3">會員資料</h3>
        </div>

        {/* 表單 */}
        <div className="container">
          <div className="userInfo row">
            <form className="col-12" action="">
              {/* 會員編號 */}
              <div className="row">
                <div className="col-4" style={{ textAlign: "right" }}>
                  <label style={{ minWidth: "80px" }} htmlFor="userNumber">
                    會員編號：
                  </label>
                </div>
                <div className="col-6">
                  <p>{user && user.user_id}</p> {/* 顯示會員編號 */}
                </div>
                <div className="col-2">
                  {!isEditing && (
                    <button className="infoupdateBtn" onClick={handleEdit}>
                      修改基本資料
                    </button>
                  )}
                </div>
              </div>

              {/* 姓名 */}
              <div className="row">
                <div className="col-4" style={{ textAlign: "right" }}>
                  <label htmlFor="userName">姓名：</label>
                </div>
                <div className="col-6">
                  <p>{user && user.username}</p> {/* 顯示姓名 */}
                </div>
                <div className="col-2"></div>
              </div>

              {/* 電子郵件 */}
              <div className="row">
                <div className="col-4" style={{ textAlign: "right" }}>
                  <label htmlFor="email">電子郵件：</label>
                </div>
                <div className="col-6">
                  <p>{user && user.email}</p> {/* 顯示電子郵件 */}
                </div>
                <div className="col-2"></div>
              </div>

              {/* 性別 */}
              <div className="row">
                <div className="col-4" style={{ textAlign: "right" }}>
                  <label htmlFor="gender">性別：</label>
                </div>
                <div className="col-6">
                  <p>{user && (user.gender === "male" ? "男生" : "女生")}</p>{" "}
                  {/* 顯示性別 */}
                </div>
                <div className="col-2"></div>
              </div>

              {/* 生日 */}
              <div className="row">
                <div className="col-4" style={{ textAlign: "right" }}>
                  <label htmlFor="birthday">生日：</label>
                </div>
                <div className="col-6">
                  <p>
                    {user &&
                      user.birthday &&
                      new Date(user.birthday).toLocaleDateString()}
                  </p>{" "}
                  {/* 顯示生日 */}
                </div>
                <div className="col-2"></div>
              </div>

              {/* 聯絡電話 */}
              {/* <div className="row">
                <div className="col-4" style={{ textAlign: "right" }}>
                  <label htmlFor="phone">聯絡電話：</label>
                </div>
                <div className="col-6">
                  {isEditing ? (
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      defaultValue={user && user.phone} // 顯示聯絡電話
                    />
                  ) : (
                    <p>{user && user.phone}</p>
                  )}
                </div>
                <div className="col-2"></div>
              </div> */}

              {/* 地址 */}
              {/* <div className="row">
                <div className="col-4" style={{ textAlign: "right" }}>
                  <label htmlFor="address">地址：</label>
                </div>
                <div className="col-6">
                  {isEditing ? (
                    <textarea
                      id="address"
                      name="address"
                      defaultValue={user && user.address} // 顯示地址
                    />
                  ) : (
                    <p>{user && user.address}</p>
                  )}
                </div>
                <div className="col-2"></div>
              </div> */}

              {/* 操作按鈕 */}
              {isEditing ? (
                <div className="row">
                  <div className="col-4"></div>
                  <div className="col-6">
                    <button id="upDateBtn" onClick={handleSave}>
                      SAVE
                    </button>
                    <button id="upDateBtn" onClick={handleCancel}>
                      CANCEL
                    </button>
                  </div>
                  <div className="col-2"></div>
                </div>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberData;
