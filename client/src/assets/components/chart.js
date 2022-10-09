import React, { useState, useEffect } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      // as const
    },
    title: {
      display: true,
      text: "",
    },
  },
};
const axios = require("axios").default;

export function Barchart() {
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    const handleChartData = async () => {
      //get remote data after every 25 minutes
      setTimeout(() => {
        axios.get("http://localhost:3001/api/v1/employees").then((response) => {
          if (response.status === 200) {
            setEmployeeData(response.data.employee);
            // console.log(response.data.employee);
          }
        }, 900000);
      });
    };
    handleChartData();
  }, []);
  let labels;

  // labels = [];
  // function iterateChartLabelData() {
  //   for (let i = 0; i < employeeData.length; i++) {
  //     labels.push(employeeData[i].job_title);
  //   }
  //   console.log(labels);
  //   return labels;
  // }
  // iterateChartLabelData();
  labels = employeeData.map((label) => label.job_title);

  let uniqueLabels = [...new Set(labels)];
  // console.log(uniqueLabels);

  let numbers = uniqueLabels.map((label) => {
    return employeeData.filter((data) => {
      return data.job_title === label;
    }).length;
  });
  // console.log(numbers);

  let dataNum;

  dataNum = [];
  function iterateChartData() {
    for (let i = 0; i < employeeData.length; i++) {
      employeeData.filter((item) => {
        if (item.job_title === labels[i]) {
          dataNum.push(item.job_title.length);
        }
        return dataNum;
      });
    }
    // return console.log(dataNum);
    return dataNum;
  }

  iterateChartData();

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Job titles",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: numbers,
      },
    ],
  };
  return <Bar options={options} data={data} />;
}
