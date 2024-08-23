import React, { useState, useEffect, useCallback } from 'react';
import '../assets/css/UploadBudget.css';
import axios from 'axios';
import { useParams } from "react-router-dom";
import TableComponent from './TableComponent';
import ButtonComponent from './ButtonComponent';

function UploadBudget() {
  const [selectedYear, setSelectedYear] = useState('');
  const [budgetData, setBudgetData] = useState([]);
  const [showInputs, setShowInputs] = useState(false);
  const [descValue, setDescValue] = useState('');
  const [fetchedData, setFetchedData] = useState([]);
  const [showYearWarning, setShowYearWarning] = useState(false);
  const { username } = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/dropdown/');
      setBudgetData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleYearSubmit = useCallback(async () => {
    if (selectedYear !== '') {
      try {
        const response = await axios.post('http://localhost:8000/submit_year/', { selectedYear });
        console.log('Year selection successful:', response.data);

        const Data = new FormData();
        Data.append('username', username);
        Data.append('selectedYear', selectedYear);

        const response2 = await axios.post('http://localhost:8000/get_uploaded_docs/', Data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        if (response2.status === 200) {
          if (response2.data.length === 0) {
            setShowYearWarning(true); // Show warning if no data is available
            setFetchedData([]); // Clear fetchedData to show an empty table
            setShowInputs(false); // Hide input fields initially
          } else {
            setShowYearWarning(false); // Hide warning if data is available
            setFetchedData(response2.data.map(item => ({
              pdf: item.pdf_name,
              description: item.description,
              status: item.status,
              comment: item.comment
            })));
          }
        } else {
          console.error('Error submitting data:', response2.data);
        }
      } catch (error) {
        console.error('Error submitting selected year:', error);
      }
    }
  }, [selectedYear, username]);

  useEffect(() => {
    handleYearSubmit();
  }, [selectedYear, handleYearSubmit]);

  const handleUploadClick = () => {
    setShowInputs(true); // Show input fields when user clicks Upload
  };

  const handleSaveClick = () => {
    const fileInput = document.getElementById('file');
    const file = fileInput.files[0];
    if (!file) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('selectedYear', selectedYear);
    formData.append('file', file);
    formData.append('description', descValue);

    axios.post('http://localhost:8000/upload_budget/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        if (response.status === 201) {
          console.log('Data successfully submitted:', response.data);
          handleYearSubmit();
          setShowInputs(false);
        } else {
          console.error('Error submitting data:', response.data);
        }
      })
      .catch(error => {
        console.error('Error submitting data:', error);
      });
  };

  const handleDeleteClick = async () => {
    try {
      const Data = new FormData();
      Data.append('username', username);
      Data.append('selectedYear', selectedYear);

      const response = await axios.post('http://localhost:8000/delete_budget/', Data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        console.log('Budget deleted successfully:', response.data);
        setFetchedData([]);
        setShowInputs(false);
      } else {
        console.error('Error deleting data:', response.data);
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const getTableBodyItemsFromUploadBudgetData = () => {
    let uploadBudgetTableBodyRows = [];
    fetchedData.forEach((item, index) => {
      let uploadBudgetTableBodyRow = Object.keys(item).map(key => ({ item: item[key] }));
      uploadBudgetTableBodyRows.push(uploadBudgetTableBodyRow);
    });
    return uploadBudgetTableBodyRows;
  };

  return (
    <div className='w-100 h-100'>
      <TableComponent
        thData={[{ text: "Name of Uploaded Budget", className: "budget" }, { text: "Description", className: "description" }, { text: "Status", className: "status" }, { text: "Comments", className: "comments" }]}
        tbData={getTableBodyItemsFromUploadBudgetData()}
        caption={
          <div className='d-flex flex-row justify-content-between px-3 mt-2'>
            <span className='h2'>Upload Budget</span>
            <select
              className="w-25 bg-primary text-white h5 border px-2"
              aria-labelledby="dropdownMenuButton2"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}>
              <option value="" disabled>Financial Year</option>
              {budgetData.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        }
      />

      {showYearWarning && (
        <div className="alert alert-warning" role="alert">
          No budget data available for the selected year. You can upload a new budget below.
        </div>
      )}

      {fetchedData.length === 0 ? (
        <ButtonComponent onClick={handleUploadClick} text={"Upload"} />
      ) : (
        <>
          <ButtonComponent onClick={handleDeleteClick} text={"Delete"} className='btn-danger' />
          <ButtonComponent onClick={handleUploadClick} text={"Update"} className='btn-warning' />
        </>
      )}

      <br /><br /><br />
      
      {showInputs && (
        <fieldset>
          <br />
          Upload Your File Here: <input type="file" name="file" id="file" />
          <br />
          Description:
          <input
            className="des-budget"
            type='text'
            name='description'
            id='description'
            style={{ border: '1px solid black' }}
            value={descValue}
            onChange={(e) => setDescValue(e.target.value)}
          />
          <ButtonComponent onClick={handleSaveClick} text={"Submit"} className='btn-success' />
        </fieldset>
      )}
    </div>
  );
}

export default UploadBudget;
