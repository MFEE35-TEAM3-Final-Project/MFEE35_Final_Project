import React from "react";
import { Doughnut } from "react-chartjs-2";

const data = {
  labels: ["Red", "Green", "Yellow"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(255, 205, 86, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(255, 205, 86, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  //   scales: {
  //     y: {
  //       //   type: "linear",
  //       beginAtZero: true,
  //     },
  //   },
};

const Chart = () => {
  return (
    <div>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default Chart;
