import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function MyDonutChart() {
  const donutChartRef = useRef(null);

  useEffect(() => {
    const donutChartCanvas = donutChartRef.current;
    const donutChartCtx = donutChartCanvas.getContext("2d");

    const donutData = {
      labels: ["碳水化合物", "脂肪", "蛋白質"],
      datasets: [
        {
          data: [54, 26, 20],
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
    <div className="myBarChart col-6">
      <canvas ref={donutChartRef} id="donutChart"></canvas>
    </div>
  );
}

export default MyDonutChart;
