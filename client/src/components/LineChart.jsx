import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

function LineChart() {
  const chartContainer = useRef(null);

  useEffect(() => {
    const dataList = [];
    const dataList2 = [];
    const labelList = [];
    for (let i = 0; i <= 9; i++) {
      const dataItem = Math.floor(Math.random() * 100);
      const dataItem2 = Math.floor(Math.random() * 100);
      labelList.push(i);
      dataList.push(dataItem);
      dataList2.push(dataItem2);
    }

    const ctx = chartContainer.current.getContext("2d");
    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labelList,
        datasets: [
          {
            label: "",
            data: dataList,
            fill: false,
            borderColor: "rgba(14,72,100,1.0)",
            borderWidth: 1
          },
          {
            label: "",
            data: dataList2,
            fill: false,
            borderColor: "pink",
            borderWidth: 1
          }
        ]
      },
      options: {
        // maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              font: {
                size: -1 // 設置標籤字體大小為 16
              }
            }
          }
        },
        tooltips: {
          enabled: false
        },
        scales: {
          x: {
            ticks: {
              display: false,
              beginAtZero: true
            },
            border: {
                display: false
              },
            grid: {
              display: false
            }
          },
          y: {
            ticks: {
              display: false,
              beginAtZero: true
            },
            border: {
                display: false
              },
            grid: {
              display: false
            }
            
          }
        },
      }
    });

    return () => chart.destroy();
  }, []);

  return <canvas ref={chartContainer} />;
}

export default LineChart;