import React from "react";

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

// import type { ChartData, ChartOptions } from 'chart.js';

// interface LineProps {
//   options: ChartOptions<'bar'>;
//   data: ChartData<'bar'>;
// }

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
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = ["Frondend", "Backend", "Testing", "Fullstack", "Data Science"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => [200, 399, 300, 120, 432]),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    // {
    //   label: "Dataset 2",
    //   data: labels.map(() => [300, 429, 120, 620, 500, 121, 100]),
    //   backgroundColor: "rgba(53, 162, 235, 0.5)",
    // }
  ],
};

export function Barchart() {
  return <Bar options={options} data={data} />;
}
