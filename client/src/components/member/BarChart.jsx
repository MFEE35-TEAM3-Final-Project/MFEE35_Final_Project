import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

function MyBarChart() {
  const barChartRef = useRef(null);
  const [dateRange, setDateRange] = useState("");

  useEffect(() => {
    const barChartCanvas = barChartRef.current;
    const barChartCtx = barChartCanvas.getContext("2d");

    const getCurrentWeekDates = () => {
      const currentDate = new Date();
      const firstDayOfWeek = new Date(
        currentDate.setDate(currentDate.getDate() - currentDate.getDay())
      );
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
      const startDate = labels[0];
      const endDate = labels[labels.length - 1];
      const range = `${startDate}~${endDate}`;
      setDateRange(range); // 更新日期範圍
      return labels;
    };

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
            label: "消耗熱量",
            data: [2200, 2120, 2061, 2187, 2353, 1896, 2009],
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

  return (
    <div className="memberBarChart col-9">
      <div style={{ fontSize: "28px" }}>{dateRange} 熱量攝取</div>
      <canvas ref={barChartRef} id="memberBarChart"></canvas>
    </div>
  );
}

export default MyBarChart;
