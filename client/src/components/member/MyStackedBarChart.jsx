import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function MyStackedBarChart() {
  const stackedBarRef = useRef(null);

  useEffect(() => {
    const stackedBarCanvas = stackedBarRef.current;
    const stackedBarCtx = stackedBarCanvas.getContext("2d");

    const stackedBarChart = new Chart(stackedBarCtx, {
      type: "bar",
      data: {
        labels: ["04/24", "04/25", "04/26", "04/27", "04/28", "04/29", "04/30"],
        datasets: [
          {
            label: "碳水化合物",
            backgroundColor: "rgb(140,181,207)",
            data: [10, 20, 30, 40, 50, 60, 70],
          },
          {
            label: "脂肪",
            backgroundColor: "rgb(235,195,67)",
            data: [20, 30, 40, 50, 60, 70, 80],
          },
          {
            label: "蛋白質",
            backgroundColor: "rgb(208,143,141)",
            data: [30, 40, 50, 60, 70, 80, 90],
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
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
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
      <div>巨量營養素</div>
      <canvas ref={stackedBarRef} id="stackedBarChart"></canvas>
    </div>
  );
}

export default MyStackedBarChart;
