import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useParams } from "react-router-dom";
import '../assets/css/Prediction.css'; 

const Prediction = () => {
  const [predictions, setPredictions] = useState([]);
  const { username } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:8000/predict/', {username }); // Adjust the URL as needed
        setPredictions(response.data);
      } catch (error) {
        console.error('Error fetching predictions:', error);
      }
    };
    fetchData();
  }, [username]);

  return (
    <div className='tablep'>
      <br/>
      <label className='t1'>Predictions for Next Year</label>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Predicted Budgeted Amount</th>
          </tr>
        </thead>
        <tbody>
          {predictions.map((item, index) => (
            <tr key={index}>
              <td>{item.item}</td>
              <td>{item.predicted_budgeted_amt}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br/>
    </div>
  );
};

export default Prediction;
