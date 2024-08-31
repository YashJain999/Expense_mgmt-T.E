import React, { useState, useEffect } from 'react';
import '../assets/css/UpdateFinancialYear.css';   // name changed og name was UpdationTable.css
import axios from 'axios';
import TableComponent from './TableComponent';
import ButtonComponent from './ButtonComponent';

function UpdateFinancialYear({ isOffcanvasOpen }) {
  const AppStyle = {
    // position: "relative",
    // top: "-100px",
    // left: isOffcanvasOpen ? '10px' : '0%',
    // width: isOffcanvasOpen ? 'calc(100% - 260px)' : '100%',
    // transition: 'all 0.5s ease',
    // zIndex: 999,
  };

  const [financialYears, setFinancialYears] = useState([]);
  const [showInputs, setShowInputs] = useState(false);
  const [addButtonClicked, setAddButtonClicked] = useState(false);
  const [yearValue, setYearValue] = useState('');
  const [descValue, setDescValue] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/get_financialyears/');
      const { years, desc } = response.data;
      const data = years.map((year, index) => ({ year, desc: desc[index] }));
      setFinancialYears(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDownloadClick = () => {
    setShowInputs(true);
    setAddButtonClicked(true);
  };

  const handleSaveClick = async () => {
    try {
      const response = await axios.post('http://localhost:8000/post_year_desc/', { F_year: yearValue, Desc: descValue });
      console.log('Data sent successfully:', response.data);
      alert('Data sent successfully!');
      fetchData();
      setShowInputs(false)
      setAddButtonClicked(false)
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Failed to send data');
    }
  };
  // const handleYearChange = (e) => {
  //     const newYearValue = e.target.value;
  //     const newDescValue = `${parseInt(newYearValue) - 1}-${newYearValue}`;
  //     setYearValue(newYearValue);
  //     setDescValue(newDescValue);
  //   };
  // Function to update the value of yearValue and generate the description dynamically
  const handleYearChange = (e) => {
    const newYearValue = e.target.value;
    setYearValue(newYearValue);
    setDescValue(generateDescription(newYearValue));
  };

  // Function to generate the description dynamically based on the year value
  const generateDescription = (yearValue) => {
    if (yearValue.trim() === '') return '';
    const startYear = parseInt(yearValue) - 1;
    return `${startYear}-${yearValue}`;
  };

  const getTableBodyItemsFromUpdateFinancialYears = () => {
    /**
     * financialyears=[{year: 2015, desc: '2014-2015'},{year: 2016, desc: '2015-2016'},...]
     * 
     * 
     * response=[
     *            [
     *                {item:2015},
     *                {item:2014-2015}
     *              ]               
     *            ]
     */

    let updateFinancialYearBodyRows = []
    Object.keys(financialYears).forEach(index => {
      let updateFinancialYearBodyRow = []
      Object.keys(financialYears[index]).forEach(key => {
        let rowcell = {};
        rowcell['item'] = financialYears[index][key];
        updateFinancialYearBodyRow.push(rowcell)
      })

      updateFinancialYearBodyRows.push(updateFinancialYearBodyRow);
    })

    return updateFinancialYearBodyRows;

  }

  return (
    <div className='w-100 h-100' style={AppStyle}>
      <br></br>
      <TableComponent
        thData={[{ text: "Financial Year", className: "" }, { text: "Description", className: "" }]}
        tbData={getTableBodyItemsFromUpdateFinancialYears()}
        caption={
          <div className='d-flex flex-row justify-content-between px-3 mt-2'>
            <span className='h2'>Update Financial Year</span>
          </div>
        }
      />
      {!addButtonClicked &&
        <ButtonComponent onClick={handleDownloadClick} text={"Add Financial year"} />}
      <br></br><br></br>
      {showInputs && (
        <div className='container m-2'>
          Enter the Financial Year
          <input
            type="text"
            pattern="[0-9-]*"
            style={{}}
            placeholder="E.g. 2025"
            value={yearValue}
            onChange={handleYearChange}
            className='border-bottom border-info focus-ring'
          /><br></br>
          <br />
          <label htmlFor="description">Description:</label>
          <span id="description">
            {generateDescription(yearValue)}
          </span><br></br>
          <input type="hidden" id="descValue" value={descValue} />
          <ButtonComponent onClick={handleSaveClick} text={"Submit"} />
        </div>
      )}
    </div>
  );
}

export default UpdateFinancialYear;