import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../assets/css/PrincipalDashboard.css';
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import ButtonComponent from './ButtonComponent';
import TableComponent from './TableComponent';

function PrincipalDashboard({ isOffcanvasOpen, toggleOffcanvas, closeOffcanvas }) {
  const AppStyle = {
    position: "relative",
    top: "-0px",
    left: isOffcanvasOpen ? '0px' : '0%',
    width: isOffcanvasOpen ? 'calc(100% - 260px)' : '100%',
    transition: 'all 0.5s ease',
    zIndex: 1000,
  };

  const [selectedYear, setSelectedYear] = useState('');
  const [YearDetails, setYearDetails] = useState([]);
  const [pdfRecords, setPdfRecords] = useState([]);
  const [showEditWarning, setShowEditWarning] = useState(false);
  const [departmentStates, setDepartmentStates] = useState(getInitialDepartmentStates());

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/dropdown/');
      console.log(response.data)
      setYearDetails(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleViewDetails = useCallback(async () => {
    try {
      setPdfRecords([]);
      setDepartmentStates(getInitialDepartmentStates());

      const response = await axios.get(`http://localhost:8000/get_all_pdf_records/?selectedYear=${selectedYear}`);
      const fetchedData = response.data;
      setPdfRecords(fetchedData);

      const updatedDepartmentStates = getInitialDepartmentStates();
      fetchedData.forEach((record) => {
        updatedDepartmentStates[record.dept] = {
          ...updatedDepartmentStates[record.dept],
          selectedOption: record.status || '',
          hasPlaceholder: true,
          placeholderValue: record.comment || '',
          pdfAvailable: true,
        };
      });

      setDepartmentStates(updatedDepartmentStates);
    } catch (error) {
      console.error('Error fetching PDF records:', error);
    }
  }, [selectedYear]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedYear) {
      handleViewDetails();
    }
  }, [selectedYear, handleViewDetails]);

  const handleOptionChange = (department, option) => {
    if (!departmentStates[department]?.editVisible) {
      setShowEditWarning(true);
      setTimeout(() => setShowEditWarning(false), 5000);
      return;
    }
    setShowEditWarning(false);
    setDepartmentStates((prevStates) => ({
      ...prevStates,
      [department]: {
        ...prevStates[department],
        selectedOption: option,
      },
    }));
  };

  const handleEditButtonClick = (department) => {
    if (!departmentStates[department]?.pdfAvailable) {
      setShowEditWarning(true);
      setTimeout(() => setShowEditWarning(false), 5000);
      return;
    }

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
    const originalOption = departmentStates[department]?.originalOption || '';
    const originalComment = departmentStates[department]?.originalComment || '';

    setDepartmentStates((prevStates) => ({
      ...prevStates,
      [department]: {
        ...prevStates[department],
        selectedOption: originalOption,
        placeholderValue: originalComment,
        editVisible: false,
        hasPlaceholder: false,
      },
    }));
  };

  const handleCommentChange = (department, value) => {
    if (!departmentStates[department]?.editVisible) {
      setShowEditWarning(true);
      setTimeout(() => setShowEditWarning(false), 5000);
      return;
    }
    setShowEditWarning(false);
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
      await axios.post("http://localhost:8000/principal_status/", {
        dept: department,
        year: selectedYear,
        status: departmentStates[department].selectedOption,
        comment: departmentStates[department].placeholderValue,
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
    }
  };

  const handleDownloadPDF = (pdfId, dept) => {
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

  const generatePrincipalDashRows = () => {
    const principalDashRows = [];

    Object.keys(departmentStates).forEach(department => {
      const row = [];

      row.push({
        item: department,
        styles: { textAlign: 'left', width: "40%" },
        className: "Itemname text-left bg-primary bg-gradient text-white"
      });

      row.push({
        item: pdfRecords.some(record => record.dept === department) ? (
          <i className="fas fa-download fa-2xl" onClick={() => handleDownloadPDF(pdfRecords.find(record => record.dept === department)?.pdf_id, department)}></i>
        ) : (
          <span>No PDF</span>
        ),
        styles: { textAlign: 'center', width: "20%" },
        className: "downloadfile text-center"
      });

      row.push({
        item: departmentStates[department]?.pdfAvailable ? (
          <>
            <input className="Dashprincipalinp" type="radio" name={department} value='Accept' checked={departmentStates[department]?.selectedOption === 'Accept'} onChange={() => handleOptionChange(department, 'Accept')} />
            <input className="Dashprincipalinp" type="radio" name={department} value='Reject' checked={departmentStates[department]?.selectedOption === 'Reject'} onChange={() => handleOptionChange(department, 'Reject')} />
            <textarea value={departmentStates[department]?.placeholderValue} onChange={(e) => handleCommentChange(department, e.target.value)} placeholder='Add comment...' disabled={!departmentStates[department]?.editVisible} />
            <div className="buttons">
              {departmentStates[department]?.editVisible ? (
                <>
                  <ButtonComponent
                    className='btn-success' text="Save"
                    onClick={() => handleSaveButtonClick(department)}
                  />
                  <ButtonComponent
                    onClick={() => handleCancelButtonClick(department)}
                    text="Cancel" className="btn-danger"
                  />
                </>
              ) : (
                <ButtonComponent
                  onClick={() => handleEditButtonClick(department)}
                  text="Edit" className='btn-primary'
                />
              )}
            </div>
          </>
        ) : (
          <div className="alert alert-warning">
            No PDF uploaded for this department.
          </div>
        ),
        styles: { textAlign: 'center', width: "40%" },
        className: "status text-center"
      });

      principalDashRows.push(row);
    });

    return principalDashRows;
  };

  return (
    <div className='container p-2 mw-5' style={AppStyle}>
      <Navbar
        title="LabTracker"
        isOffcanvasOpen={isOffcanvasOpen}
        toggleOffcanvas={toggleOffcanvas}
      />
      <div className="app">
        <Sidebar
          isOffcanvasOpen={isOffcanvasOpen}
          toggleOffcanvas={toggleOffcanvas}
        />
      </div>

      {showEditWarning && (
        <div className="alert alert-warning" role="alert">
          {departmentStates[selectedYear]?.pdfAvailable
            ? "Please click the 'Edit' button to make changes."
            : "No PDF uploaded by this department."}
        </div>
      )}

      <TableComponent
        thData={[{ text: "Departments", className: "Deptcol" }, { text: "Download", className: "Downloadcol" }, { text: "Status", className: "Statuscol" }]}
        tbData={generatePrincipalDashRows()}
        caption={
          <div className='d-flex flex-row justify-content-between px-3 mt-2'>
            <span className='h2'>Dashboard</span>
            <select
              className="w-25 bg-primary text-white h5 border px-2" aria-labelledby="dropdownMenuButton2"
              value={selectedYear}
              onChange={(e) => { setSelectedYear(e.target.value); }}>
              <option className="" value="" disabled >Financial Year</option>
              {YearDetails.map((item, index) => (
                <option className='' key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        }
      />
    </div>
  );
}

function getInitialDepartmentStates() {
  return {
    "Artificial Intelligence and Machine Learning": { selectedOption: '', hasPlaceholder: false, placeholderValue: '', editVisible: false, pdfAvailable: false },
    "Civil": { selectedOption: '', hasPlaceholder: false, placeholderValue: '', editVisible: false, pdfAvailable: false },
    "Computer Science": { selectedOption: '', hasPlaceholder: false, placeholderValue: '', editVisible: false, pdfAvailable: false },
    "Data Science": { selectedOption: '', hasPlaceholder: false, placeholderValue: '', editVisible: false, pdfAvailable: false },
    "Information Technology": { selectedOption: '', hasPlaceholder: false, placeholderValue: '', editVisible: false, pdfAvailable: false },
    "Mechanical": { selectedOption: '', hasPlaceholder: false, placeholderValue: '', editVisible: false, pdfAvailable: false },
  };
};

export default PrincipalDashboard;

