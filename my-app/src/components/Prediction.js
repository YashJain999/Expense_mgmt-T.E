import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useParams } from "react-router-dom";
import TableComponent from './TableComponent';

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

  const getTableBodyItemsFromPrediction = () => {
    let updatePredictionBodyRows = []
    Object.keys(predictions).forEach(index => {
      let updatePredictionBodyRow = []
      Object.keys(predictions[index]).forEach(key => {
        let rowcell = {};
        rowcell['item'] = predictions[index][key];
        updatePredictionBodyRow.push(rowcell)
      })
      updatePredictionBodyRows.push(updatePredictionBodyRow);
    })
    return updatePredictionBodyRows;
  }
  return (
    <div className='tablep'>
      <br/>
      <TableComponent 
          thData={[{text:"Item"},{text:"Predicted Budgeted Amount"}]}
          tbData={getTableBodyItemsFromPrediction()}
          caption={
            <div className='d-flex flex-row justify-content-between px-3 mt-2'>
              <span className='h2'>Predictions for Next Year</span>
            </div>
          }
      />
      <br/>
    </div>
  );
};

export default Prediction;