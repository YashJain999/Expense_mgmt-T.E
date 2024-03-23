import React, { useState, useEffect } from 'react';
import '../assets/css/UpdateFinancialYear.css';   // name changed og name was UpdationTable.css
import axios from 'axios'; 

function UpdateFinancialYear({isOffcanvasOpen}) {
  const AppStyle = {
    position:"relative",
    top:"-100px",
    left : isOffcanvasOpen ? '10px': '0%'  ,
    width: isOffcanvasOpen ? 'calc(100% - 260px)': '100%'  ,
    transition: 'all 0.5s ease',
    zIndex: 999,
  };

    const [financialYears, setFinancialYears] = useState([]);
    const [showInputs, setShowInputs] = useState(false);
    const [addButtonClicked, setAddButtonClicked] = useState(false);
    const [yearValue, setYearValue] = useState('');
    const [descValue, setDescValue] = useState('');

    useEffect(() => {
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

    return (
      <div className='container p-2 mw-5' style={AppStyle}>
          <br></br>
          <table>
              <thead>
                  <tr>
                      <th>Financial Year</th>
                      <th>Description</th>
                  </tr>
              </thead>
              <tbody>
                  {financialYears.map((data, index) => (
                      <tr key={index}>
                          <td>{data.year}</td>
                          <td>{data.desc}</td>
                      </tr>
                  ))}
              </tbody>
          </table>

          <br></br>
          <br></br>


          <button className="addfinancialyear" onClick={handleDownloadClick} disabled={addButtonClicked}>
              Add
          </button>

          <br></br><br></br>
          {showInputs && (
              <div className='container m-2'>
              Enter the Financial Year   
              <input
                type="text"
                pattern="[0-9-]*"
                style={{ border: '1px solid black' }}
                placeholder="E.g. 2025"
                value={yearValue}
                onChange={handleYearChange} 
              /><br></br>
              <br />
              {/* Enter its Description     
              <input
                type="text"
                pattern="[0-9-]*"
                style={{ border: '1px solid black' }}
                placeholder="E.g. 2024-2025"
                value={descValue}
                disabled  // Disabled attribute added here
                /><br></br> */}
                <label htmlFor="description">Description:</label>
      <span id="description">
        {generateDescription(yearValue)}
      </span><br></br>
      <input type="hidden" id="descValue" value={descValue} />
              <button className="submitupdatedfinancial" onClick={handleSaveClick} >Submit</button>
            </div>
          )}
      </div>
  );
}

export default UpdateFinancialYear;
