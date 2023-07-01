import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import Cookies from "js-cookie";
const jwtToken = Cookies.get("jwtToken");

const CalorieChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date();
      const cDay = today.getDay();
      const todayTs = today.getTime();
      const startDateTs = todayTs - 1000 * 60 * 60 * 24 * cDay;
      const endDateTs = startDateTs + 1000 * 60 * 60 * 24 * 6;
      const startDate = getFormattedDate(startDateTs);
      const endDate = getFormattedDate(endDateTs);
      console.log("dddddate", startDate, endDate);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/user/meal_records?start_date=${startDate}&end_date=${endDate}`,
          {
            headers: {
              Authorization: jwtToken
            }
          }
        );
        console.log(response);
        const mealRecords = response.data.groupedResult;

        const data = {
          labels: mealRecords.map((record) => record.date),
          datasets: [
            {
              label: "Total Calories",
              data: mealRecords.map((record) => record.total_calories),
              backgroundColor: "rgba(75,192,192,0.6)",
              borderColor: "rgba(75,192,192,1)",
              borderWidth: 1
            }
          ]
        };

        setChartData(data);
      } catch (error) {
        console.error("Error fetching meal records:", error);
      }
    };

    fetchData();
  }, []);

  const getFormattedDate = (timestamp) => {
    //傳入timeStamp
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  return (
    <div className="memberBarChart col-9">
      {chartData ? (
        <Bar data={chartData} />
      ) : (
        <p className="fs-1">這周還沒有記錄飲食</p>
      )}
    </div>
  );
};

export default CalorieChart;
