import React from "react";
import { Link } from "react-router-dom";

import MemberHeader from "../../components/member/MemberHeader";
import Footer from "../../components/member/Footer";
import BarChart from "../../components/member/BarChart.jsx";

import "bootstrap/dist/css/bootstrap.css";
import "../../styles/member/memberHome.css";
import "../../styles/member/user_foodRecord.css";

import target from "../../../src/images/memberrecrod/target.png";
import fork from "../../../src/images/memberrecrod/fork.png";
import logo from "../../../src/images/logo/logo.png";

function MemberHomePage() {
  return (
    <div style={{ backgroundColor: "#F7F4E9" }}>
      <MemberHeader />

      <div className="wrapper">
        {/* 其他 member area 內容 */}
        <div className="memberTitle">
          <h3 id="titleH3">會員專區</h3>
        </div>

        <div className="container">
          {/* 會員資訊 */}
          <div className="row memberInfo">
            <form id="memberHomeForm" className="col-12" action="">
              <div className="row">
                <div className="col-4">
                  <p style={{ minWidth: "80px" }} htmlFor="userNumber">
                    會員編號：
                  </p>
                  <p htmlFor="userName">姓名：</p>
                  <p htmlFor="userGender">性別：</p>
                  <p htmlFor="userAge">年齡：</p>
                  <p htmlFor="userHeight">身高(cm)：</p>
                  <p htmlFor="userWeight">體重(kg)：</p>
                  <p style={{ minWidth: "80px" }} htmlFor="userSport">
                    運動頻率：
                  </p>
                </div>
                <div className="col-4" style={{ textAlign: "left" }}>
                  <p>20230425-001</p>
                  <p>皮卡丘</p>
                  <p>男性</p>
                  <p>36</p>
                  <p>183</p>
                  <p>85</p>
                  <p>幾乎不運動</p>
                </div>
                <div className="col-4">
                  <img src={logo} alt="" />
                </div>
              </div>
            </form>

            {/* 數字圖表區 */}
            <div className="foodRecordBgDiv">
              <div className="row foodRecordBg shadow p-3 mb-2 bg-body rounded">
                <div className="oneAndTwoAreaBg d-flex">
                  {/* 第一區 - 目標值與已攝取區 */}
                  <div className="w-50 position-relative">
                    <div>4月15日 週六</div>
                    {/* 目標量的Icon */}
                    <div className="oneAreaTarget">
                      <div>
                        <img src={target} alt="這是目標值" />
                      </div>
                      <div>目標值</div>
                    </div>
                    {/* 目標值 */}
                    <div className="oneAreaTargetValue">
                      <div>3000</div>
                      <div>卡路里</div>
                    </div>
                    {/* 已攝取量的Icon */}
                    <div className="oneAreaAlreadyEat">
                      <div>
                        <img src={fork} alt="這是刀叉圖片" />
                      </div>
                      <div>已攝取</div>
                    </div>
                    {/* 已攝取量 */}
                    <div className="oneAreaAlreadyEatValue">
                      <div>1430</div>
                      <div>卡路里</div>
                    </div>
                  </div>

                  {/* 第二區 - 還可以吃多少量 */}
                  <div className="howMuchLeftBgDiv w-50">
                    <img src="./images/memberrecrod/circle-shape.png" alt="" />
                    <div className="howMuchLeftValue">
                      <div>還可以吃</div>
                      <div>1570</div>
                      <div>卡路里</div>
                    </div>
                  </div>
                </div>
                {/* 第三區 - 攝取營養量專區 */}
                <div className="ThreeAreaBg d-flex justify-content-around">
                  <div>
                    碳水化合物
                    <hr />
                    <div>2149</div>
                  </div>
                  <div>
                    蛋白質
                    <hr />
                    <div>51</div>
                  </div>
                  <div>
                    脂肪
                    <hr />
                    <div>183</div>
                  </div>
                  <div>
                    鈉
                    <hr />
                    <div>123</div>
                  </div>
                  <div>
                    醣
                    <hr />
                    <div>239</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="myBtn">
              <button className="foodRecordBtn">紀錄飲食 GO</button>
            </div>

            <BarChart />

            <div className="myBtn">
              <Link to="/MemberChartList">
                <button className="foodRecordBtn">查看更多數據</button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MemberHomePage;
