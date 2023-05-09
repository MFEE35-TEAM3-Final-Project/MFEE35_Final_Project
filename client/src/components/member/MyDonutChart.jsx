import React from "react";
import Chart from "chart.js/auto";

function MyDonutChart() {
  React.useEffect(() => {
    // 甜甜圈圖
    const donutCanvas = document.getElementById("donutChart");
    const donutCtx = donutCanvas.getContext("2d");

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
                size: 22, // 設置字體大小
              },
            },
          },
        },
        responsive: true,
      },
    };

    new Chart(donutCtx, donutConfig);
  }, []);

  return (
    <div>
      <div className="myBarChart col-6">
        <canvas id="donutChart"></canvas>
      </div>
    </div>
  );
}

export default MyDonutChart;
