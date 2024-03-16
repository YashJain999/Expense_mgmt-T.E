import React from 'react';
import {Chart as ChartJS} from 'chart.js/auto'
import { Line } from 'react-chartjs-2';

const Lines = ({ item_1 , item_2 , item_3 , item_4 , item_5 ,item_6 , item_7,cho }) => {
    const years = item_1.map(entry => entry.f_year); // Extract f_year values from item_1
    const choi = cho === 'budgeted_amt' ? 'budgeted_amt' : 'actual_exp';
    const datasets = [
        {
            label: 'LAB-CONSUME',
            data: item_1.map(entry => entry[choi]),
            borderColor: 'red',
            fill: false
        },
        {
            label: 'LAB-EQ',
            data: item_2.map(entry => entry[choi]),
            borderColor: 'blue',
            fill: false
        },
        {
            label: 'MAINT-SPARE',
            data: item_3.map(entry => entry[choi]),
            borderColor: 'green',
            fill: false
        },
        {
            label: 'MISC',
            data: item_4.map(entry => entry[choi]),
            borderColor: 'orange',
            fill: false
        },
        {
            label: 'RND',
            data: item_5.map(entry => entry[choi]),
            borderColor: 'purple',
            fill: false
        },
        {
            label: 'SOFT',
            data: item_6.map(entry => entry[choi]),
            borderColor: 'cyan',
            fill: false
        },
        {
            label: 'T&T',
            data: item_7.map(entry => entry[choi]),
            borderColor: 'magenta',
            fill: false
        }
    ];

    const data = {
        labels: years, // Use f_year values as labels for x-axis
        datasets: datasets
    };

  return (
    <div>
        <h2>Line Graph</h2>
      <Line data={data}/>
    </div>
  );
};

export default Lines;