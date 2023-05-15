import React, { useState } from "react";
// import axios from "axios";
import MemberHeader from "../../components/member/MemberHeader";

import "../../styles/member/userinfo.css";

function MemberData() {
  const [members, setMembers] = useState([]); // 存儲會員數據的陣列
  const [isEditing, setIsEditing] = useState(false); // 是否處於編輯模式

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
              <div className="row">
                <div className="col-4" style={{ textAlign: "right" }}>
                  <label style={{ minWidth: "80px" }} htmlFor="userNumber">
                    會員編號：
                  </label>
                </div>
                <div className="col-6">
                  <p></p>
                </div>
                <div className="col-2">
                  {!isEditing && (
                    <button className="infoupdateBtn" onClick={handleEdit}>
                      修改基本資料
                    </button>
                  )}
                </div>
              </div>

              {/* 基本資料 - 姓名 */}
              <div className="row">
                <div className="col-4" style={{ textAlign: "right" }}>
                  <label htmlFor="userName">姓名：</label>
                </div>
                <div className="col-6">
                  <input
                    className="userInput"
                    type="text"
                    name="userName"
                    placeholder=""
                    required
                  />
                  <br />
                </div>
              </div>

              {/* 基本資料 - 性別 */}
              <div className="row">
                <div className="col-4" style={{ textAlign: "right" }}>
                  <label htmlFor="userGender">性別：</label>
                </div>
                <div className="col-6 row">
                  <div className="col-5">
                    <input
                      className="userGender"
                      type="radio"
                      name="userGender"
                      id="male"
                    />
                    <label className="usergender" htmlFor="male">
                      男生
                    </label>
                  </div>
                  <div className="col-5">
                    <input
                      className="userGender"
                      type="radio"
                      name="userGender"
                      id="female"
                    />
                    <label className="usergender" htmlFor="female">
                      女生
                    </label>
                    <br />
                  </div>
                </div>
              </div>

              {/* 基本資料 - 年齡 */}
              <div className="row">
                <div className="col-4" style={{ textAlign: "right" }}>
                  <label htmlFor="userAge">年齡：</label>
                </div>
                <div className="col-6">
                  <input
                    className="userInput"
                    type="text"
                    name="userAge"
                    placeholder=""
                    required
                  />
                  <br />
                </div>
              </div>

              {/* 基本資料 - 身高 */}
              <div className="row">
                <div className="col-4" style={{ textAlign: "right" }}>
                  <label htmlFor="userHeight">身高：</label>
                </div>
                <div className="col-6">
                  <input
                    className="userInput"
                    type="text"
                    name="userHeight"
                    placeholder=""
                    required
                  />
                  <br />
                </div>
              </div>

              {/* 基本資料 - 體重 */}
              <div className="row">
                <div className="col-4" style={{ textAlign: "right" }}>
                  <label htmlFor="userWeight">體重：</label>
                </div>
                <div className="col-6">
                  <input
                    className="userInput"
                    type="text"
                    name="userWeight"
                    placeholder=""
                    required
                  />
                  <br />
                </div>
              </div>

              {/* 基本資料 - 信箱 */}
              <div className="row">
                <div className="col-4" style={{ textAlign: "right" }}>
                  <label htmlFor="userMail">信箱：</label>
                </div>
                <div className="col-6">
                  <input
                    className="userInput"
                    type="email"
                    name="userMail"
                    placeholder=""
                    required
                  />
                  <br />
                </div>
              </div>

              {/* 基本資料 - 運動頻率 */}
              <div className="row">
                <div className="col-4" style={{ textAlign: "right" }}>
                  <label style={{ minWidth: "80px" }} htmlFor="userSport">
                    運動頻率：
                  </label>
                </div>
                <div className="col-6">
                  <select>
                    <option>幾乎不運動</option>
                    <option>每週運動 1-3 天</option>
                    <option>每週運動 3-5 天</option>
                    <option>每週運動 6-7 天</option>
                    <option>長時間運動或體力勞動工作</option>
                  </select>
                  <br />
                </div>
              </div>

              {/* 基本資料 - 電話 */}
              <div className="row">
                <div className="col-4" style={{ textAlign: "right" }}>
                  <label htmlFor="userPhone">電話：</label>
                </div>
                <div className="col-6">
                  <input className="userInput" type="tel" name="userPhone" />
                  <br />
                </div>
              </div>

              {/* 基本資料 - 地址 */}
              <div className="row">
                <div className="col-4" style={{ textAlign: "right" }}>
                  <label htmlFor="userAddress">地址：</label>
                </div>
                <div className="col-6">
                  <input
                    className="userInput"
                    type="text"
                    name="userAddress"
                    placeholder=""
                    required
                  />
                  <br />
                </div>
              </div>
              {isEditing && (
                <div>
                  <button id="upDateBtn" onClick={handleSave}>
                    SAVE
                  </button>
                  <button id="upDateBtn" onClick={handleCancel}>
                    CANCEL
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MemberData;
