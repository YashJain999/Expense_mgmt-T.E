import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/css/PrincipalDashboard.css'; 
function PrincipalDashboard({ isOffcanvasOpen }) {
  const AppStyle = {
    position:"relative",
    top:"0px",
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
    setDepartmentStates((prevStates) => ({
      ...prevStates,
      [department]: {
        ...prevStates[department],
        selectedOption: option,
      },
    }));
  };

  const handleEditButtonClick = (department) => {
    setDepartmentStates((prevStates) => ({
      ...prevStates,
      [department]: {
        ...prevStates[department],
         editVisible: !prevStates[department].editVisible,
        // editVisible: false,
        hasPlaceholder: true, // Toggle editVisible state
      },
    }));
  };

  const handleCommentChange = (department, value) => {
    // Update the placeholderValue state for the comment box
    setDepartmentStates((prevStates) => ({
      ...prevStates,
      [department]: {
        ...prevStates[department],
        placeholderValue: value,
      },
    }));
  };
  
  
  const handleSaveButtonClick = async (department) => {
    try {
      // Send status and comment to the backend
      await axios.post("http://localhost:8000/principal_status/", {
        dept: department,
        year: selectedYear,
        status: departmentStates[department].selectedOption,
        comment: departmentStates[department].placeholderValue, // Send the comment from the state
      });
      setDepartmentStates((prevStates) => ({
        ...prevStates,
        [department]: {
          ...prevStates[department],
          editVisible: false,
          hasPlaceholder: false,
        },
      }));
    } catch (error) {
      console.error("Error saving status:", error);
      // Handle error
    }
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
      setPdfRecords(response.data);
      const updatedDepartmentStates = { ...departmentStates };
      response.data.forEach((record) => {
        updatedDepartmentStates[record.dept] = {
          ...updatedDepartmentStates[record.dept],
          selectedOption: record.status, // Set selectedOption based on backend data
          hasPlaceholder: true,
          placeholderValue: record.comment || '', // Set comment value if available
        };
      });
      setDepartmentStates(updatedDepartmentStates);
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
  
      <table>
        <thead>
          <tr>
            <th style={{width : "100px"}}>Department</th>
            <th >Download</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
        {Object.keys(departmentStates).map((department, index) => (
            <tr key={index}>
              <td className='deptname'>{department}</td>
              <td className='downloadfile'>
                {pdfRecords.some((record) => record.dept === department) && (
                  <i className="fas fa-download fa-2xl" onClick={() => handleDownloadPDF(pdfRecords.find((record) => record.dept === department)?.pdf_id, department)}></i>
                )}
              </td>
              <td className='status'>
              <label>
                <input
                  className="Dashprincipalinp"
                  type="radio"
                  name={department}
                  value='Accept'
                  checked={departmentStates[department]?.selectedOption === 'Accept'}
                  onChange={() => handleOptionChange(department, 'Accept')}
                />
                Accept
              </label>
              <label>
                <input
                  className="Dashprincipalinp"
                  type="radio"
                  name={department}
                  value='Reject'
                  checked={departmentStates[department]?.selectedOption === 'Reject'}
                  onChange={() => handleOptionChange(department, 'Reject')}
                />
                Reject
              </label>
  
              {departmentStates[department]?.hasPlaceholder && departmentStates[department]?.editVisible && (
  <div>
    <textarea value={departmentStates[department]?.placeholderValue}
                    onChange={(e) => handleCommentChange(department, e.target.value)}
                    placeholder="Comments"
                    rows={3}
                    cols={40}
                    style={{ border: '1px solid black' }}
                  ></textarea>
    <br />
    <button className="tablebutton" onClick={() => handleSaveButtonClick(department)}>
                    Save
                  </button>
                </div>
              )}
              {/* Render Edit button */}
              {!departmentStates[department]?.editVisible && (
                <button className="tablebutton" onClick={() => handleEditButtonClick(department)}>
                  Edit
                </button>
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
    'Artificial Intelligence and Machine Learning',
    'Data Science',
    'Civil',
    'Mechanical',
  ];

  const initialState = {};

  departments.forEach((department) => {
    initialState[department] = {
      selectedOption: '',
      currentOption: '',
      hasPlaceholder: false,
      placeholderValue: '',
      editVisible: false,
    };
  });

  return initialState;
}