import React, { useEffect, useState } from "react";
import axios from "axios";

import MyBarChart from "../../components/member/BarChart";
import MemberHeader from "../../components/member/MemberHeader";
import Footer from "../../components/member/Footer";
import MyDonutChart from "../../components/member/MyDonutChart";
import MyStackedBarChart from "../../components/member/MyStackedBarChart";

import "../../styles/member/chartlist.css";

function ChartListPage() {
  // useEffect(() => {
  //   axios
  //     .get(`${process.env.REACT_APP_API_URL}/api/articles`)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }, []);
  return (
    <div style={{ backgroundColor: "#F7F4E9" }}>
      <MemberHeader />
      <div className="wapper">
        <div className="memberTitle">
          <h3 id="titleH3">數據圖表</h3>
        </div>
      </div>
      <div className="container">
        <div className="row chartInfo">
          <div className="col-12">
            <div className="row">
              <MyBarChart />
              <MyDonutChart />
              <div className="myBarChart col-6">
                <MyStackedBarChart />
                <div className="row">
                  <div className="col-6" style={{ textAlign: "left" }}>
                    <p>營養素</p>
                    <p>
                      <i
                        className="fa fa-square"
                        style={{ color: "rgb(140,181,207)" }}
                      ></i>{" "}
                      碳水化合物
                    </p>
                    <p>
                      <i
                        className="fa fa-square"
                        style={{ color: " rgb(235,195,67)" }}
                      ></i>{" "}
                      脂肪
                    </p>
                    <p>
                      <i
                        className="fa fa-square"
                        style={{ color: "rgb(208,143,141)" }}
                      ></i>{" "}
                      蛋白質
                    </p>
                  </div>

                  <div className="col-3">
                    <p>總數</p>
                    <p>54%</p>
                    <p>26%</p>
                    <p>20%</p>
                  </div>

                  <div className="col-3">
                    <p>目標值</p>
                    <p>50%</p>
                    <p>30%</p>
                    <p>20%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ChartListPage;
