import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import '../assets/css/PrincipalDashboard.css'; 
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function PrincipalDashboard({isOffcanvasOpen,toggleOffcanvas,closeOffcanvas}) {
  const AppStyle = {
    position:"relative",
    top:"-100px",
    left : isOffcanvasOpen ? '0px': '0%'  ,
    width: isOffcanvasOpen ? 'calc(100% - 260px)': '100%'  ,
    transition: 'all 0.5s ease',
    zIndex: 1000,
  };
  const navbarStyle = {
    left: isOffcanvasOpen ? "260px" : "0%",
    right: "0px",
    width: isOffcanvasOpen ? "calc(100% - 260px)" : "100%",
    transition: "all 0.3s ease  ",
    zIndex: 1000,
  };
  const [selectedYear, setSelectedYear] = useState('');
  const [YearDetails, setYearDetails] = useState([]);
  const [pdfRecords, setPdfRecords] = useState([]);
  const [showEditWarning, setShowEditWarning] = useState(false);
  const [departmentStates, setDepartmentStates] = useState(getInitialDepartmentStates());
  const { state } = useLocation();
  console.log(state);

  const handleOptionChange = async (department, option) => {
    if (!departmentStates[department]?.editVisible) {
      setShowEditWarning(true);
      setTimeout(() => setShowEditWarning(false), 5000); // Auto hide after 5 seconds
      return;
    }
    setShowEditWarning(false);
    // Only allow option change if editVisible is true
    if (departmentStates[department]?.editVisible) {
      setDepartmentStates((prevStates) => ({
        ...prevStates,
        [department]: {
          ...prevStates[department],
          selectedOption: option,
        },
      }));
  }
  };

  const handleEditButtonClick = (department) => {
    // Store the current selected option and comment before editing
    const originalOption = departmentStates[department]?.selectedOption || '';
    const originalComment = departmentStates[department]?.placeholderValue || '';
    
    setDepartmentStates((prevStates) => ({
      ...prevStates,
      [department]: {
        ...prevStates[department],
        editVisible: !prevStates[department].editVisible,
        originalOption: originalOption,
        originalComment: originalComment,
        hasPlaceholder: true,
      },
    }));
  };
  
  const handleCancelButtonClick = (department) => {
    // Reset the selectedOption and comment to their original values
    const originalOption = departmentStates[department]?.originalOption || '';
    const originalComment = departmentStates[department]?.originalComment || '';
  
    setDepartmentStates((prevStates) => ({
      ...prevStates,
      [department]: {
        ...prevStates[department],
        selectedOption: originalOption,
        placeholderValue: originalComment,
        editVisible: !prevStates[department].editVisible,
        hasPlaceholder: false,
      },
    }));
  };
  
  const handleCommentChange = (department, value) => {
    if (!departmentStates[department]?.editVisible) {
      setShowEditWarning(true);
      setTimeout(() => setShowEditWarning(false), 5000); // Auto hide after 5 seconds
      return;
    }
    setShowEditWarning(false);
    // Only allow comment change if editVisible is true
    if (departmentStates[department]?.editVisible) {
      setDepartmentStates((prevStates) => ({
        ...prevStates,
        [department]: {
          ...prevStates[department],
          placeholderValue: value,
        },
      }));
  }
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
      // Reset pdfRecords and departmentStates before fetching new data
      setPdfRecords([]);
      setDepartmentStates(getInitialDepartmentStates());
  
      // Fetch new data for the selected year
      const response = await axios.get(`http://localhost:8000/get_all_pdf_records/?selectedYear=${selectedYear}`);
      setPdfRecords(response.data);
  
      const updatedDepartmentStates = getInitialDepartmentStates(); // Reset department states
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
      <Navbar
        title="LabTracker"
        isOffcanvasOpen={isOffcanvasOpen}
        toggleOffcanvas={toggleOffcanvas}
        // style={navbarStyle}
      />
      <div className="app">
        <Sidebar
          isOffcanvasOpen={isOffcanvasOpen}
          // closeOffcanvas={closeOffcanvas}
          toggleOffcanvas={toggleOffcanvas}
        />
      </div>
    <h1> Review the Budget Reports</h1>
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
      {showEditWarning && (
      <div className="alert alert-warning" role="alert">
        Please click the "Edit" button to make changes.
      </div>
    )}
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
                    <textarea 
                        value={departmentStates[department]?.placeholderValue}
                        onChange={(e) => handleCommentChange(department, e.target.value)}
                        placeholder="Comments"
                        rows={3}
                        cols={40}
                        style={{ border: '1px solid black' }}
                      ></textarea>
    <br />
    {departmentStates[department]?.hasPlaceholder && departmentStates[department]?.editVisible && (
                    <div>
    <button className="tablebutton" onClick={() => handleSaveButtonClick(department)}>
                    Save
                  </button>
                  <button className='tablebutton' onClick={()=>handleCancelButtonClick(department)}> Cancel</button>
                 
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