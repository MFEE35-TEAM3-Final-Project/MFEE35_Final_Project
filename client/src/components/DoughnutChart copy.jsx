import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);
const data = {
  labels: ["基礎代謝率", "運動量", "消化代謝"],
  datasets: [
    {
      label: " ",
      data: [70, 20, 10],
      backgroundColor: ["#C5A188", "#F2F2F2", "#929292"],
      hoverOffset: 4
    }
  ]
};

const options = {
  cutout: 120,
  responsive: true,
  maintainAspectRatio: false,
  rotation: -90,

  animation: {
    duration: 3000
  },
  plugins: {
    legend: {
      position: "bottom"
    }
  }
};

const DoughnutChart = () => (
  <>
    <Doughnut data={data} options={options} />
  </>
);

export default DoughnutChart;
