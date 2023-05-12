import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function MyBarChart() {
  const barChartRef = useRef(null);

  useEffect(() => {
    const barChartCanvas = barChartRef.current;
    const barChartCtx = barChartCanvas.getContext("2d");

    const barChart = new Chart(barChartCtx, {
      type: "bar",
      data: {
        labels: ["04/24", "04/25", "04/26", "04/27", "04/28", "04/29", "04/30"],
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
    <div className="myBarChart col-9">
      <div>112/04/24~112/04/30 熱量攝取</div>
      <canvas ref={barChartRef} id="barChart"></canvas>
    </div>
  );
}

export default MyBarChart;
