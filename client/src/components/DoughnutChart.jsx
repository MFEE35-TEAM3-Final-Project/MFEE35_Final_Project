import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ mydata }) => {
  const { carbohydrate, crude_fat, crude_protein, sodium } = mydata;

  const data = {
    labels: ["碳水化合物", "脂肪", "蛋白質", "鈉含量"],
    datasets: [
      {
        label: "",
        data: [carbohydrate, crude_fat, crude_protein, sodium / 1000],
        backgroundColor: ["#C5A188", "#F2F2F2", "#929292", "#707D90"],
        hoverOffset: 4
      }
    ]
  };

  const options = {
    cutout: 180,
    responsive: true,
    maintainAspectRatio: false,
    rotation: -90,

    animation: {
      duration: 3000
    },
    plugins: {
      tooltip: {
        titleFont: {
          fontSize: 24
        },
        bodyFont: {
          fontSize: 24
        }
      },
      legend: {
        position: "bottom",
        labels: {
          font: {
            fontSize: 40
          }
        }
      }
    }
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/food/search?food_id=${foodId}`)
      .then((res) => {
        setChartData(res.data);
        setIsLoading(false);
      });
  }, [foodId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <DoughnutChart mydata={chartData} />;
};

export default DoughnutComponent;
