import React, { useState } from 'react';
import './Dashprincipal.css';

function FinancialTable() {
  const [selectedYear, setSelectedYear] = useState('three');
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

  return (
    <div>
      <label htmlFor="language">Financial Year :</label>
      <select
        name="language"
        id="language"
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
      >
        <option value="one">2019-2020</option>
        <option value="two">2020-2021</option>
        <option value="three">2021-2022</option>
      </select>
      <button className='upperedit'>Edit</button>
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

export default FinancialTable;
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
