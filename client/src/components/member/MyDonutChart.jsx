import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";

// Cookie
import Cookies from "js-cookie";

function MyDonutChart() {
  const donutChartRef = useRef(null);
  const [currentDate, setCurrentDate] = useState("");
  const [targetData, setTargetData] = useState(null);
  const [donutChartData, setDonutChartData] = useState(() => {
    const savedData = localStorage.getItem("donutChartData");
    return savedData ? JSON.parse(savedData) : [];
  });

  //設置日期
  useEffect(() => {
    const getCurrentDate = () => {
      const weekdays = ["日", "一", "二", "三", "四", "五", "六"];
      const currentDate = new Date();

      // 將日期設定為 06/04
      currentDate.setDate(4); // 設定日期為 4
      currentDate.setMonth(5); // 設定月份為 6 (從 0 開始計算，所以是 5)

      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();

      const formattedMonth = month < 10 ? "0" + month : month;
      const formattedDay = day < 10 ? "0" + day : day;

      const formattedDate = `${formattedMonth}月 ${formattedDay}日 星期${
        weekdays[currentDate.getDay()]
      }`;

      setCurrentDate(formattedDate);
      console.log(formattedDate);
    };

    getCurrentDate();
  }, []);

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
        console.log(res.data.groupedResults);
        const groupedResults = res.data.groupedResults;

        const targetData = groupedResults.find(
          (item) => item.date === "2023-06-04"
        );
        setTargetData(targetData);

        // 計算熱量
        const totalCarbohydrate = targetData?.total_carbohydrate || 0;
        const totalSaturatedFat = targetData?.total_saturated_fat || 0;
        const totalProtein = targetData?.total_protein || 0;

        const carbohydrateCalories = totalCarbohydrate * 4;
        const fatCalories = totalSaturatedFat * 9;
        const proteinCalories = totalProtein * 4;

        const totalCalories =
          carbohydrateCalories + fatCalories + proteinCalories;

        console.log(carbohydrateCalories);
        console.log(fatCalories);
        console.log(proteinCalories);
        console.log(totalCalories);

        // 計算百分比並四捨五入為整數
        const carbohydratePercentage = Math.round(
          (carbohydrateCalories / totalCalories) * 100
        );
        const fatPercentage = Math.round((fatCalories / totalCalories) * 100);
        const proteinPercentage = Math.round(
          (proteinCalories / totalCalories) * 100
        );

        // 更新圖表數據
        setDonutChartData([
          carbohydratePercentage,
          fatPercentage,
          proteinPercentage,
        ]);
        // 將數據存儲在本地端
        localStorage.setItem("donutChartData", JSON.stringify(donutChartData));
      })

      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    const donutChartCanvas = donutChartRef.current;
    const donutChartCtx = donutChartCanvas.getContext("2d");

    const donutData = {
      labels: ["碳水化合物", "脂肪", "蛋白質"],
      datasets: [
        {
          data: donutChartData,
          backgroundColor: [
            "rgb(140,181,207)",
            "rgb(235,195,67)",
            "rgb(208,143,141)",
          ],
        },
      ],
    };

    const donutConfig = {
      type: "doughnut",
      data: donutData,
      options: {
        plugins: {
          title: {
            display: true,
          },
          legend: {
            position: "bottom",
            labels: {
              font: {
                size: 22,
              },
              padding: 50, // 調整標籤與圖表之間的距離
            },
          },
        },
        responsive: true, // 自適應調整大小
        // maintainAspectRatio: false, // 取消維持原始寬高比
      },
    };
    const donutChart = new Chart(donutChartCtx, donutConfig);

    // Clean up the chart instance when the component unmounts
    return () => {
      donutChart.destroy();
    };
  }, []);

  return (
    <div className="memberBarChart col-6">
      <div style={{ fontSize: "28px", textAlign: "center" }}>
        {currentDate} 營養攝取比例
      </div>
      <canvas ref={donutChartRef} id="memberDonutChart"></canvas>
    </div>
  );
}

export default MyDonutChart;
