import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const Bars = ({ data_budget, data_actual, data_year }) => {
  const chartData = {
    labels: data_year.map((iteam) => iteam.Desc),
    datasets: [
      {
        label: "Budgeted Amount",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.4)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: data_budget.map((item) => item.budgeted_amt),
      },
      {
        label: "Actual Expense",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: data_actual.map((item) => item.actual_exp),
      },
    ],
  };
  return (
    <div>
      <h2>Bar Graph</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default Bars;
