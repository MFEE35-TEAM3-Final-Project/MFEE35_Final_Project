import React, { useEffect, useState } from "react";
import axios from "axios";

import MyBarChart from "../../components/member/BarChart";
import MemberHeader from "../../components/member/MemberHeader";

import MyDonutChart from "../../components/member/MyDonutChart";
import MyStackedBarChart from "../../components/member/MyStackedBarChart";

import "../../styles/member/chartlist.css";

// Cookie;
import Cookies from "js-cookie";

function ChartListPage() {
  const [carbohydrateCaloriesData, setCarbohydrateCaloriesData] = useState([]); // eslint-disable-line no-unused-vars
  const [proteinCaloriesData, setProteinCaloriesData] = useState([]); // eslint-disable-line no-unused-vars
  const [fatCaloriesData, setFatCaloriesData] = useState([]); // eslint-disable-line no-unused-vars
  const [totalCarbohydrateCalories, setTotalCarbohydrateCalories] = useState(0);
  const [totalProteinCalories, setTotalProteinCalories] = useState(0);
  const [totalFatCalories, setTotalFatCalories] = useState(0);

  //取得攝取狀況;

  useEffect(() => {
    const jwtToken = Cookies.get("jwtToken");
    const startDate = "2023-05-29";
    const endDate = "2023-06-04";

    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/user/meal_records?start_date=${startDate}&end_date=${endDate}`,
        {
          headers: {
            Authorization: jwtToken,
          },
        }
      )
      .then((res) => {
        const groupedResults = res.data.groupedResults;
        const newCarbohydrateData = [];
        const newProteinData = [];
        const newFatData = [];
        const newCarbohydrateCaloriesData = [];
        const newProteinCaloriesData = [];
        const newFatCaloriesData = [];
        let totalCarbohydrateCalories = 0;
        let totalProteinCalories = 0;
        let totalFatCalories = 0;

        for (const dayData of groupedResults) {
          const total_carbohydrate = dayData.total_carbohydrate;
          const total_protein = dayData.total_protein;
          const total_saturated_fat = dayData.total_saturated_fat;

          newCarbohydrateData.push(total_carbohydrate);
          newProteinData.push(total_protein);
          newFatData.push(total_saturated_fat);

          const carbohydrateCalories = total_carbohydrate * 4;
          const proteinCalories = total_protein * 4;
          const fatCalories = total_saturated_fat * 9;

          newCarbohydrateCaloriesData.push(carbohydrateCalories);
          newProteinCaloriesData.push(proteinCalories);
          newFatCaloriesData.push(fatCalories);

          totalCarbohydrateCalories += carbohydrateCalories;
          totalProteinCalories += proteinCalories;
          totalFatCalories += fatCalories;
        }

        setCarbohydrateCaloriesData(newCarbohydrateCaloriesData);
        setProteinCaloriesData(newProteinCaloriesData);
        setFatCaloriesData(newFatCaloriesData);
        setTotalCarbohydrateCalories(totalCarbohydrateCalories);
        setTotalProteinCalories(totalProteinCalories);
        setTotalFatCalories(totalFatCalories);

        console.log(newCarbohydrateData);
        console.log(newProteinData);
        console.log(newFatData);

        console.log(newCarbohydrateCaloriesData);
        console.log(newProteinCaloriesData);
        console.log(newFatCaloriesData);

        console.log(totalCarbohydrateCalories);
        console.log(totalProteinCalories);
        console.log(totalFatCalories);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // 计算每种营养素的百分比
  const totalCalories =
    totalCarbohydrateCalories + totalProteinCalories + totalFatCalories;
  const carbohydratePercentage = Math.round(
    (totalCarbohydrateCalories / totalCalories) * 100
  );
  const proteinPercentage = Math.round(
    (totalProteinCalories / totalCalories) * 100
  );
  const fatPercentage = Math.round((totalFatCalories / totalCalories) * 100);

  return (
    <div style={{ backgroundColor: "#F7F4E9", paddingBottom: "20px" }}>
      <MemberHeader />
      <div className="wrapper">
        <div className="memberTitle">
          <h3 id="titleH3">數據圖表</h3>
        </div>
      </div>
      <div className="container">
        <div className="row memberChartInfo">
          <div className="col-12">
            <div className="row">
              <MyBarChart />
              <MyDonutChart />
              <div className="memberBarChart col-6">
                <MyStackedBarChart />
                <div className="row">
                  <div
                    className="col-6"
                    style={{ textAlign: "left", fontSize: "28px" }}
                  >
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

                  <div className="col-3" style={{ fontSize: "28px" }}>
                    <p>總數</p>
                    <p>{carbohydratePercentage}%</p>
                    <p>{fatPercentage}%</p>
                    <p>{proteinPercentage}%</p>
                  </div>

                  <div className="col-3" style={{ fontSize: "28px" }}>
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
    </div>
  );
}

export default ChartListPage;
