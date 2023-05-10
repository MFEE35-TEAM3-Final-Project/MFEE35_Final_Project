import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);
const data = {
  labels: ["基礎代謝率", "運動量", "消化代謝"], // 設定圓餅圖的標籤
  datasets: [
    {
      label: "My First Dataset",
      data: [70, 20, 10], // 設定圓餅圖的數據
      backgroundColor: ["#C5A188", "#F2F2F2", "#929292"], // 設定圓餅圖各區塊的顏色
      hoverOffset: 4, // 設定游標移到圓餅圖上時的偏移量
    },
  ],
};

const options = {
  cutout: 200, // 設定圓餅圖中間的空心部分的大小
  responsive: true, // 設定是否要讓圖表具有響應式設計
  maintainAspectRatio: false, // 設定圖表是否要保持比例
  rotation: -90, // 設定圓餅圖的旋轉角度

  animation: {
    duration: 3000, // 設定圓餅圖動畫的持續時間
  },
  plugins: {
    legend: {
      position: "bottom", // 設定圓餅圖的圖例位置
    },
  },
};

const DoughnutChart = () => (
  <Doughnut
    data={data}
    options={options}
    style={{ height: "600px", width: "600px" }}
  />
);

export default DoughnutChart;
