import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";

// Cookie
import Cookies from "js-cookie";

function MyBarChart() {
  const barChartRef = useRef(null);
  const [dateRange, setDateRange] = useState("");
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("chartData");
    return savedData ? JSON.parse(savedData) : [];
  });

  const [exerciseRecords, setExerciseRecords] = useState();
  const [targetCal, setTargetCal] = useState(() => {
    const savedTargetCal = localStorage.getItem("targetCal");
    return savedTargetCal ? parseInt(savedTargetCal) : 0;
  });
  const [formattedDate] = useState();

  //計算 TDEE
  useEffect(() => {
    const jwtToken = Cookies.get("jwtToken");

    axios
      .get(
        // `${process.env.REACT_APP_API_URL}/api/user/exercise_records?start_date=${formattedDate}&end_date=${formattedDate}`
        `${process.env.REACT_APP_API_URL}/api/user/exercise_records`,
        {
          headers: {
            Authorization: jwtToken,
          },
        }
      )
      .then((response) => {
        setExerciseRecords(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [formattedDate]);

  // 若初始值為 undefined或 長度不 > 0 則不執行
  useEffect(() => {
    if (
      exerciseRecords !== undefined &&
      exerciseRecords.data.records.length > 0
    ) {
      console.log(exerciseRecords);

      const sortedRecords = exerciseRecords.data.records.sort(
        (a, b) => new Date(b.record_date) - new Date(a.record_date)
      );
      const { birthday, exercise_level, gender, height, weight, record_date } =
        sortedRecords[0];
      console.log({
        birthday,
        exercise_level,
        gender,
        height,
        weight,
        record_date,
      });

      // 計算今年的年紀 age就是年紀
      const calculateAge = (birthday, gender) => {
        const birthDate = new Date(birthday);
        const currentDate = new Date();

        let age = currentDate.getFullYear() - birthDate.getFullYear();

        // 检查是否已经過了生日，若是，年龄减一
        const currentMonth = currentDate.getMonth();
        const birthMonth = birthDate.getMonth();
        const currentDay = currentDate.getDate();
        const birthDay = birthDate.getDate();

        if (
          currentMonth < birthMonth ||
          (currentMonth === birthMonth && currentDay < birthDay)
        ) {
          age--;
        }

        let genderValue = 0;
        if (gender === "male") {
          genderValue = 1;
        }

        return [age, genderValue];
      };

      const [age, genderValue] = calculateAge(birthday, gender);

      const sum1 =
        9.99 * weight + 6.25 * height - 4.92 * age + (166 * genderValue - 161);
      const sum2 = Math.round(sum1) * exercise_level;
      const newTargetCal = Math.round(sum2);
      setTargetCal(newTargetCal);

      // 將 targetCal 儲存在 localStorage 中
      localStorage.setItem("targetCal", newTargetCal.toString());
    }
  }, [exerciseRecords]);

  //取得攝取狀況
  useEffect(() => {
    const jwtToken = Cookies.get("jwtToken");
    const startDate = "2023-05-29";
    const endDate = "2023-06-04";

    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/user/meal_records?start_date=${startDate}&end_date=${endDate}`,
        {
          headers: {
            Authorization: jwtToken,
          },
        }
      )
      .then((res) => {
        const groupedResults = res.data.groupedResults;
        const newData = [];

        for (const dayData of groupedResults) {
          const totalCalories = dayData.total_calories;
          newData.push(totalCalories);
        }

        // 在这里使用 newData 数组进行图表的处理和展示
        setData(newData);
        localStorage.setItem("chartData", JSON.stringify(newData));

        console.log(newData);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  //長條圖
  useEffect(() => {
    const barChartCanvas = barChartRef.current;
    const barChartCtx = barChartCanvas.getContext("2d");
    const labels = getCurrentWeekDates();

    const barChart = new Chart(barChartCtx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            type: "bar",
            backgroundColor: data.map((value) => {
              if (value > targetCal) {
                return "rgba(245,43,16,0.5)";
              } else {
                return "rgba(43,209,189,0.5)";
              }
            }),
            borderColor: data.map((value) => {
              if (value > targetCal) {
                return "rgba(245,43,16)";
              } else {
                return "rgba(43,209,189)";
              }
            }),
            borderWidth: 1,
            label: "熱量攝取",
            data: data,
          },
          {
            type: "line",
            label: "TDEE",
            data: Array(7).fill(targetCal),
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
                size: 24,
              },
              padding: 50, // 調整標籤與圖表之間的距離
            },
          },
        },
        responsive: true,
        scales: {
          x: {
            stacked: true,
            ticks: {
              font: {
                size: 24, // 修改x軸字體大小
              },
            },
          },
          y: {
            stacked: true,
            ticks: {
              font: {
                size: 20, // 修改y軸字體大小
              },
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

  //顯示當周
  // useEffect(() => {
  //   const labels = getCurrentWeekDates();
  //   const startDate = labels[0];
  //   const endDate = labels[labels.length - 1];
  //   const range = `${startDate}~${endDate}`;
  //   setDateRange(range);
  // }, []);

  // const getCurrentWeekDates = () => {
  //   const currentDate = new Date();
  //   const firstDayOfWeek = new Date(
  //     currentDate.setDate(
  //       currentDate.getDate() - ((currentDate.getDay() - 1 + 7) % 7)
  //     )
  //   );
  //   const labels = [];
  //   for (let i = 0; i < 7; i++) {
  //     const date = new Date(firstDayOfWeek);
  //     date.setDate(date.getDate() + i);
  //     const month = date.getMonth() + 1;
  //     const day = date.getDate();
  //     const formattedDate = `${month < 10 ? "0" + month : month}/${
  //       day < 10 ? "0" + day : day
  //     }`;
  //     labels.push(formattedDate);
  //   }
  //   return labels;
  // };

  //顯示下周
  useEffect(() => {
    const labels = getCurrentWeekDates();
    const startDate = labels[0];
    const endDate = labels[labels.length - 1];
    const range = `${startDate}~${endDate}`;
    setDateRange(range);
  }, []);

  const getCurrentWeekDates = () => {
    const currentDate = new Date();
    const nextWeekDate = new Date(
      currentDate.getTime() + 7 * 24 * 60 * 60 * 1000
    ); // 下一周的日期
    const firstDayOfWeek = new Date(
      nextWeekDate.setDate(nextWeekDate.getDate() - nextWeekDate.getDay() + 1)
    ); // 下一周的星期一作为一周的开始
    const labels = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(firstDayOfWeek);
      date.setDate(date.getDate() + i);
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const formattedDate = `${month < 10 ? "0" + month : month}/${
        day < 10 ? "0" + day : day
      }`;
      labels.push(formattedDate);
    }
    return labels;
  };

  return (
    <div className="memberBarChart col-9">
      <div style={{ fontSize: "28px" }}>{dateRange} 熱量攝取</div>
      <canvas ref={barChartRef} id="memberBarChart"></canvas>
    </div>
  );
}

export default MyBarChart;
