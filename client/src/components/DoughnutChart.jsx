import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
ChartJS.register(ArcElement, Tooltip, Legend);
const DoughnutChart = ({ mydata }) => {
  const data = {
    labels: ["碳水化合物", "脂肪", "蛋白質", "鈉含量"], // 設定圓餅圖的標籤
    datasets: [
      {
        label: "My First Dataset",
        data: [
          mydata.carbohydrate,
          mydata.crude_fat,
          mydata.crude_protein,
          mydata.sodium / 1000,
        ], // 設定圓餅圖的數據
        backgroundColor: ["#C5A188", "#F2F2F2", "#929292", "#707D90"], // 設定圓餅圖各區塊的顏色
        hoverOffset: 4, // 設定游標移到圓餅圖上時的偏移量
      },
    ],
  };
  // 納的單位為毫克 => /1000
  const options = {
    cutout: 180,
    responsive: true,
    maintainAspectRatio: false,
    rotation: -90,

    animation: {
      duration: 3000,
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: {
            size: 40, // 設定字體大小
          },
        },
      },
    },
  };

  return (
    <Doughnut
      data={data}
      options={options}
      style={{ height: "600px", width: "600px" }}
    />
  );
};

const DoughnutComponent = ({ foodId }) => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/food/search?food_id=${foodId}`)
      .then((res) => {
        console.log();
        setChartData(res.data);
      });
  }, []);

  return <DoughnutChart mydata={chartData} />;
};

export default DoughnutComponent;
