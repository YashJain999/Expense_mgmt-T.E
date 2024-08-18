import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ data, title, dataKey }) => {
  const chartData = {
    labels: data.map(item => `${item.item} (${(item[dataKey] / getTotal(data, dataKey) * 100).toFixed(2)}%)`),
    datasets: [
      {
        label: title,
        data: data.map(item => item[dataKey]),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9966',
          '#66FF99',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9966',
          '#66FF99',
        ],
      },
    ],
  };

  return <Pie data={chartData} />;
};

const getTotal = (data, key) => {
  return data.reduce((total, item) => total + item[key], 0);
};

const PieChartsPage = ({ dataBudget, dataActual }) => {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <h2>Budgeted Amount</h2>
        <PieChart data={dataBudget} title="Budgeted Amount" dataKey="budgeted_amt" />
      </div>
      <div style={{ flex: 1 }}>
        <h2>Actual Expense</h2>
        <PieChart data={dataActual} title="Actual Expense" dataKey="actual_exp" />
      </div>
    </div>
  );
};

export default PieChartsPage;