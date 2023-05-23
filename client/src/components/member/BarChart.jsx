import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";

// Cookie
import Cookies from "js-cookie";

function MyBarChart() {
  const barChartRef = useRef(null);
  const [dateRange, setDateRange] = useState("");
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("chartData");
    return savedData ? JSON.parse(savedData) : [];
  });

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
        const newData = [];

        for (const dayData of groupedResults) {
          const totalCalories = dayData.total_calories;
          newData.push(totalCalories);
        }

        // 在这里使用 newData 数组进行图表的处理和展示
        setData(newData);
        localStorage.setItem("chartData", JSON.stringify(newData));

        console.log(newData);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    const barChartCanvas = barChartRef.current;
    const barChartCtx = barChartCanvas.getContext("2d");
    const labels = getCurrentWeekDates();

    const barChart = new Chart(barChartCtx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            type: "bar",
            backgroundColor: [
              "rgba(245,43,16,0.5)",
              "rgba(245,43,16,0.5)",
              "rgba(43,209,189,0.5)",
              "rgba(245,43,16,0.5)",
              "rgba(245,43,16,0.5)",
              "rgba(43,209,189,0.5)",
              "rgba(43,209,189,0.5)",
            ],
            borderColor: [
              "rgba(245,43,16)",
              "rgba(245,43,16)",
              "rgba(43,209,189)",
              "rgba(245,43,16)",
              "rgba(245,43,16)",
              "rgba(43,209,189)",
              "rgba(43,209,189)",
            ],
            borderWidth: 1,
            label: "攝取熱量",
            data: data,
          },
          {
            type: "line",
            label: "TDEE",
            data: [2061, 2061, 2061, 2061, 2061, 2061, 2061],
            backgroundColor: "#3627E0",
            borderColor: "#3627E0",
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
                size: 22,
              },
              padding: 50, // 調整標籤與圖表之間的距離
            },
          },
        },
      },
    });

    // Clean up the chart instance when the component unmounts
    return () => {
      barChart.destroy();
    };
  }, []);

  //顯示當周
  // useEffect(() => {
  //   const labels = getCurrentWeekDates();
  //   const startDate = labels[0];
  //   const endDate = labels[labels.length - 1];
  //   const range = `${startDate}~${endDate}`;
  //   setDateRange(range);
  // }, []);

  // const getCurrentWeekDates = () => {
  //   const currentDate = new Date();
  //   const firstDayOfWeek = new Date(
  //     currentDate.setDate(
  //       currentDate.getDate() - ((currentDate.getDay() - 1 + 7) % 7)
  //     )
  //   );
  //   const labels = [];
  //   for (let i = 0; i < 7; i++) {
  //     const date = new Date(firstDayOfWeek);
  //     date.setDate(date.getDate() + i);
  //     const month = date.getMonth() + 1;
  //     const day = date.getDate();
  //     const formattedDate = `${month < 10 ? "0" + month : month}/${
  //       day < 10 ? "0" + day : day
  //     }`;
  //     labels.push(formattedDate);
  //   }
  //   return labels;
  // };

  //顯示下周
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

  return (
    <div className="memberBarChart col-9">
      <div style={{ fontSize: "28px" }}>{dateRange} 熱量攝取</div>
      <canvas ref={barChartRef} id="memberBarChart"></canvas>
    </div>
  );
}

export default MyBarChart;
