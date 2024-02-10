import React, { useState, useEffect} from 'react';
import '../assets/css/PrincipalDashboard.module.css'; 
import axios from 'axios';

function PrincipalDashboard({isOffcanvasOpen}) {
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
  //radio button js hai  
  const [selectedOption, setSelectedOption] = useState('option1');
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
      // Handle the PDF records data as needed
  
    } catch (error) {
      console.error('Error fetching PDF records:', error);
      // Handle error
    }
  };
  const [departmentStates, setDepartmentStates] = useState(getInitialDepartmentStates());
  //function to handle department and radiobutton selection
  const handleOptionChange = (department, option) => {
    setDepartmentStates((prevStates) => ({
      ...prevStates,//Spread Operator in js is used to store previous value of state.More detail explanation on pdf
      [department]: {
        ...prevStates[department],
        selectedOption: option,
        hasPlaceholder: true,
        editVisible: false,
      },
    }));
  };
  //function to handle save button in the status column
  const handleSaveButtonClick = (department) => {
    setDepartmentStates((prevStates) => ({
      ...prevStates,
      [department]: {
        ...prevStates[department],
        editVisible: true,
        hasPlaceholder: false,
      },
    }));
  };
  //function to handle edit button in the status column
  const handleEditButtonClick = (department) => {
    setDepartmentStates((prevStates) => ({
      ...prevStates,
      [department]: {
        ...prevStates[department],
        editVisible: false,
        hasPlaceholder: true,
      },
    }));
  };

  const handleDownloadClick = () => {
    alert('Download button clicked');
  };
  const handleSaveClick = () => {
    alert('Download button clicked');
  };

  // const handleSaveClick = (department) => {
  //   setDepartmentStates((prevStates) => ({
  //     ...prevStates,
  //     [department]: {
  //       ...prevStates[department],
  //       editVisible: true,
  //       hasPlaceholder: false,
  //     },
  //   }));
  // };
  const handleDownloadPDF = (pdfId) => {
    axios.get(`http://localhost:8000/download_pdf/${pdfId}/`, {
        responseType: 'blob'  // Ensure response is treated as binary data
    })
    .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${pdfId}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Remove the link after downloading
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
          <th>Department</th>
          <th>PDF</th>
          </tr>
        </thead>
        <tbody>
        {pdfRecords.map((record, index) => (
  <tr key={index}>
    <td>{record.dept}</td>
    <td>
      {record.pdf && (
        <div>
          <i className="fas fa-download fa-2xl" onClick={() => handleDownloadPDF(record.pdf_id)}></i>
        </div>
      )}
    </td>
  </tr>
))}

</tbody>
</table>

      <table>
        <colgroup>
          {/* <col className="department-column" style={{ width: '200px' }} />
          <col className="sample-column" style={{ width: '40px' }} />
          <col className="status-column" style={{ width: '90px' }} /> */}
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

      <button className="Edit" onClick={handleDownloadClick}>
        Edit
      </button>

      <button className="save" onClick={handleSaveClick}>
      {/* <button className="save" onClick={() => handleSaveClick(Object.keys(departmentStates)[0])}></button> */}
        Save
      </button>
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
