import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PrincipalDashboard({ isOffcanvasOpen }) {
  const AppStyle = {
    position:"relative",
    top:"100px",
    left : isOffcanvasOpen ? '130px': '0%'  ,
    width: isOffcanvasOpen ? 'calc(100% - 260px)': '100%'  ,
    transition: 'all 0.5s ease',
    zIndex: 1000,
  };
  const [selectedYear, setSelectedYear] = useState('');
  const [YearDetails, setYearDetails] = useState([]);
  const [pdfRecords, setPdfRecords] = useState([]);
  const [departmentStates, setDepartmentStates] = useState(getInitialDepartmentStates());

  const handleOptionChange = async (department, option) => {
    // Update the selectedOption and hasPlaceholder state locally
    setDepartmentStates((prevStates) => ({
      ...prevStates,
      [department]: {
        ...prevStates[department],
        selectedOption: option,
        hasPlaceholder: true, // Assuming the placeholder should still be shown after changing status
      },
    }));
    
  };
  
  const handleSaveButtonClick = async (department) => {
    try {
      // Send status and comment to the backend
      await axios.post('http://localhost:8000/principal_status/', {
        dept: department,
        year: selectedYear,
        status: departmentStates[department].selectedOption,
        comment: departmentStates[department].placeholderValue // Send the comment from the state
      });
      // Update the editVisible and hasPlaceholder state locally
      setDepartmentStates((prevStates) => ({
        ...prevStates,
        [department]: {
          ...prevStates[department],
          editVisible: true,
          hasPlaceholder: false,
        },
      }));
    } catch (error) {
      console.error('Error saving status:', error);
      // Handle error
    }
  };
  
  const handleEditButtonClick = (department) => {
    // Update the editVisible and hasPlaceholder state locally
    setDepartmentStates((prevStates) => ({
      ...prevStates,
      [department]: {
        ...prevStates[department],
        editVisible: false,
        hasPlaceholder: true,
      },
    }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/dropdown/');
      setYearDetails(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleViewDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/get_all_pdf_records/?selectedYear=${selectedYear}`);
      console.log('PDF records for the selected year:', response.data);
      setPdfRecords(response.data);
    } catch (error) {
      console.error('Error fetching PDF records:', error);
    }
  };

  const handleDownloadPDF = (pdfId,dept) => {
    axios.get(`http://localhost:8000/download_pdf/${pdfId}/`, {
      responseType: 'blob'
    })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${dept}_${pdfId}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(error => {
        console.error('Error downloading PDF:', error);
      });
  };



  return (
    <div className='container p-2 mw-5' style={AppStyle}>
      <label htmlFor="language">Financial Year :</label>
      <select
        className="year"
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
      >
        {YearDetails.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
      <button className='viewDetails' onClick={handleViewDetails}>View</button>

      {/* <table>
        <thead>
          <tr>
            <th>Department</th>
            <th>Download</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {pdfRecords.map((record, index) => (
            <tr key={index}>
              <td>{record.dept}</td>
              <td>
                {record.pdf && (
                  <i className="fas fa-download fa-2xl" onClick={() => handleDownloadPDF(record.pdf_id,record.dept)}></i>
                )}
              </td>
              <td>
                <label>
                  <input
                    type="radio"
                    value="Accept"
                    checked={departmentStates[record.dept]?.selectedOption === 'Accept'}
                    onChange={() => handleOptionChange(record.dept, 'Accept')}
                  />
                  Accept
                </label>

                <label>
                  <input
                    type="radio"
                    value="Reject"
                    checked={departmentStates[record.dept]?.selectedOption === 'Reject'}
                    onChange={() => handleOptionChange(record.dept, 'Reject')}
                  />
                  Reject
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
      <table>
        <colgroup>
        </colgroup>
        <thead>
          <tr>
            <th style={{ width: '70px'}}>Department</th>
            <th>Download</th>
            <th >Status</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(departmentStates).map((department) => (//object.keys method in js which gives arrays of object given.|||.map():is a higher-order function in JavaScript that iterates over each element of an array and applies a function to each element, returning a new array with the results.
            <tr key={department}>                             
              <td className="deptname">{department}</td>
              <td className='downloadfile'>
              <i className="fas fa-download fa-2xl"></i>
              </td>
              <td className='status'>
                <label>
                  <input
                    className="Dashprincipalinp"
                    type="radio"
                    value="Accept"
                    checked={departmentStates[department].selectedOption === 'Accept'}
                    onChange={() => handleOptionChange(department, 'Accept')}
                  />
                  Accept
                </label>

                <label>
                  <input
                    className="Dashprincipalinp"
                    type="radio"
                    value="Reject"
                    checked={departmentStates[department].selectedOption === 'Reject'}
                    onChange={() => handleOptionChange(department, 'Reject')}
                  />
                             Reject
                </label>

                {departmentStates[department].hasPlaceholder && (
                  <div>
                    <textarea
                      value={departmentStates[department].placeholderValue}
                      onChange={(e) =>
                        setDepartmentStates((prevStates) => ({
                          ...prevStates,
                          [department]: {
                            ...prevStates[department],
                            placeholderValue: e.target.value,
                          },
                        }))
                      }
                      placeholder="Comments"
                      rows={3}
                      cols={40}
                      style={{ border: '1px solid black' }}
                      disabled={departmentStates[department].editVisible}
                    ></textarea>
                    <br />
                    <button
                      className="tablebutton"
                      onClick={() => handleSaveButtonClick(department)}
                      disabled={departmentStates[department].editVisible}
                    >
                      Save
                    </button>
                  </div>
                )}

                {departmentStates[department].editVisible && (
                  <div>
                    <button
                      className="tablebutton"
                      onClick={() => handleEditButtonClick(department)}
                    >
                      Edit
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default PrincipalDashboard;
//arrays in javascript
function getInitialDepartmentStates() {
  const departments = [
    'Computer Science',
    'Information Technology',
    'Artificial Intelligence',
    'Data Science',
    'Civil',
    'Mechanical',
  ];

  const initialState = {};

  departments.forEach((department) => {
    initialState[department] = {
      selectedOption: '',
      hasPlaceholder: false,
      placeholderValue: '',
      editVisible: false,
    };
  });

  return initialState;
}
   