import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";

// Cookie
import Cookies from "js-cookie";

function MyStackedBarChart() {
  const stackedBarRef = useRef(null);
  const [dateRange, setDateRange] = useState("");

  const [carbohydrateCaloriesData, setCarbohydrateCaloriesData] = useState(
    () => {
      const savedData = localStorage.getItem("carbohydrateCaloriesData");
      return savedData ? JSON.parse(savedData) : [];
    }
  );
  const [proteinCaloriesData, setProteinCaloriesData] = useState(() => {
    const savedData = localStorage.getItem("proteinCaloriesData");
    return savedData ? JSON.parse(savedData) : [];
  });
  const [fatCaloriesData, setFatCaloriesData] = useState(() => {
    const savedData = localStorage.getItem("fatCaloriesData");
    return savedData ? JSON.parse(savedData) : [];
  });

  useEffect(() => {
    const labels = getCurrentWeekDates();
    const startDate = labels[0];
    const endDate = labels[labels.length - 1];
    const range = `${startDate}~${endDate}`;
    setDateRange(range);
  }, []);

  const getCurrentWeekDates = () => {
    const currentDate = new Date();
    const nextWeekDate = new Date(
      currentDate.getTime() + 7 * 24 * 60 * 60 * 1000
    ); // 下一周的日期
    const firstDayOfWeek = new Date(
      nextWeekDate.setDate(nextWeekDate.getDate() - nextWeekDate.getDay() + 1)
    ); // 下一周的星期一作为一周的开始
    const labels = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(firstDayOfWeek);
      date.setDate(date.getDate() + i);
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const formattedDate = `${month < 10 ? "0" + month : month}/${
        day < 10 ? "0" + day : day
      }`;
      labels.push(formattedDate);
    }
    return labels;
  };

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
        // console.log(res.data.groupedResults);
        const groupedResults = res.data.groupedResults;
        const newCarbohydrateData = [];
        const newProteinData = [];
        const newFatData = [];
        const newCarbohydrateCaloriesData = []; // 新的碳水化合物熱量陣列
        const newProteinCaloriesData = []; // 新的蛋白質熱量陣列
        const newFatCaloriesData = []; // 新的脂肪熱量陣列

        for (const dayData of groupedResults) {
          const total_carbohydrate = dayData.total_carbohydrate;
          const total_protein = dayData.total_protein;
          const total_saturated_fat = dayData.total_saturated_fat;

          newCarbohydrateData.push(total_carbohydrate);
          newProteinData.push(total_protein);
          newFatData.push(total_saturated_fat);

          // 計算熱量並將結果存入新的陣列
          const carbohydrateCalories = total_carbohydrate * 4;
          const proteinCalories = total_protein * 4;
          const fatCalories = total_saturated_fat * 9;

          newCarbohydrateCaloriesData.push(carbohydrateCalories);
          newProteinCaloriesData.push(proteinCalories);
          newFatCaloriesData.push(fatCalories);
        }
        // // 在这里使用 newData 数组进行图表的处理和展示

        setCarbohydrateCaloriesData(newCarbohydrateCaloriesData);
        setProteinCaloriesData(newProteinCaloriesData);
        setFatCaloriesData(newFatCaloriesData);
        // localStorage.setItem("chartData", JSON.stringify(newData));

        localStorage.setItem(
          "carbohydrateCaloriesData",
          JSON.stringify(newCarbohydrateCaloriesData)
        );
        localStorage.setItem(
          "proteinCaloriesData",
          JSON.stringify(newProteinCaloriesData)
        );
        localStorage.setItem(
          "fatCaloriesData",
          JSON.stringify(newFatCaloriesData)
        );

        console.log(newCarbohydrateData);
        console.log(newProteinData);
        console.log(newFatData);

        console.log(newCarbohydrateCaloriesData);
        console.log(newProteinCaloriesData);
        console.log(newFatCaloriesData);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    const stackedBarCanvas = stackedBarRef.current;
    const stackedBarCtx = stackedBarCanvas.getContext("2d");
    const labels = getCurrentWeekDates();

    const stackedBarChart = new Chart(stackedBarCtx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "碳水化合物",
            backgroundColor: "rgb(140,181,207)",
            data: carbohydrateCaloriesData,
          },
          {
            label: "脂肪",
            backgroundColor: "rgb(235,195,67)",
            data: fatCaloriesData,
          },
          {
            label: "蛋白質",
            backgroundColor: "rgb(208,143,141)",
            data: proteinCaloriesData,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
          },

          legend: {
            position: "bottom",
            labels: {
              font: {
                size: 24,
              },
              padding: 50, // 調整標籤與圖表之間的距離
            },
          },
        },
        responsive: true,
        scales: {
          x: {
            stacked: true,
            ticks: {
              font: {
                size: 20, // 修改x軸字體大小
              },
            },
          },
          y: {
            stacked: true,
            ticks: {
              font: {
                size: 20, // 修改y軸字體大小
              },
            },
          },
        },
      },
    });

    // Clean up the chart instance when the component unmounts
    return () => {
      stackedBarChart.destroy();
    };
  }, []);

  return (
    <div className="myStackedBarChart">
      <div style={{ fontSize: "28px", textAlign: "center" }}>
        {dateRange} 三大營養熱量攝取
      </div>
      <canvas ref={stackedBarRef} id="memberStackedBarChart"></canvas>
    </div>
  );
}

export default MyStackedBarChart;
