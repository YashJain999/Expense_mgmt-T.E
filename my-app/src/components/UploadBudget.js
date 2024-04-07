
import React, { useState, useEffect } from 'react';
import '../assets/css/UploadBudget.css';
import axios from 'axios';
import {useParams } from "react-router-dom";


function UploadBudget({isOffcanvasOpen}) {
  const [selectedYear, setSelectedYear] = useState('');
  const [budgetData, setBudgetData] = useState([]);
  const [showInputs, setShowInputs] = useState(false);
  // const [yearValue, setYearValue] = useState('');
  const [descValue, setDescValue] = useState('');
  // const [selectedOption, setSelectedOption] = useState('');
  const [fetchedData, setFetchedData] = useState([]);
  const { username } = useParams();

  const AppStyle = {
    position:"relative",
    top:"-100px",
    left : isOffcanvasOpen ? '0px': '0%'  ,
    width: isOffcanvasOpen ? 'calc(100% - 260px)': '100%'  ,
    transition: 'all 0.5s ease',
    zIndex: 1000,
  };

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

  const handleYearSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8000/submit_year/', { selectedYear });
      console.log('Year selection successful:', response.data);
      // Handle successful submission
      try {
        const Data = new FormData();
        Data.append('username', username);
        Data.append('selectedYear', selectedYear);
        const response2 = await axios.post('http://localhost:8000/get_uploaded_docs/', Data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        if (response2.status === 200) {
          if(response2.data.length === 0){
            alert('no data available')
            handleUploadClick()
          }
          else{
          if (response2.data && Array.isArray(response2.data)) {
            const data = response2.data.map((item) => ({
              pdf: item.pdf_name,
              description: item.description,
              status: item.status,
              comment: item.comment
            }));
            setFetchedData(data);
            console.log('Data sent:', response2.data);
            // alert('Data Sent Successfully');
            // Handle successful submission
          } else {
            console.error('Invalid data format:', response2.data);
            alert('Invalid data format');
            // Handle unexpected data format
          }
        }
        } else {
          console.error('Error submitting data:', response2.data);
          alert('Error in submitting');
          // Handle other status codes or errors
        }
      } catch (error) {
        console.error('Error sending data:', error);
        // Handle error
      }
    } catch (error) {
      console.error('Error submitting selected year:', error);
      // Handle error
    }
  
    
  };

  const handleUploadClick = () => {
    // Define the functionality for the handleSaveClick function here
    setShowInputs(true);
  };

  const handleSaveClick = () => {
    // Check if the file is selected
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
          alert('File Upload Successful')
          handleYearSubmit();
          // Automatically close the fieldset after submission
          setShowInputs(false);
        } else {
          console.error('Error submitting data:', response.data);
          alert('Error in submitting')
          // Handle other status codes or errors
        }
      })
      .catch(error => {
        console.error('Error submitting data:', error);
        alert('Error in submitting')
        // Handle error
      });
  };


  return (
    <div className='container p-2 mw-5' style={AppStyle}>
      <label htmlFor="language"className='FY-UpBud'>Financial Year :</label>
      <select className="year-upload-budget" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
      <option value="" disabled >Select an option</option>
        {budgetData.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
      <button className="viewbuttonupload" onClick={handleYearSubmit}>
        View
      </button>
      <br></br>
      <table>
        <thead>
          <tr>
            <th className="budget-UpBud">Name of Uploaded Budget</th>
            <th className="description-UpBud">Description</th>
            <th className="status-UpBud">Status</th>
            <th className="comments-Upbud">Comments</th>
          </tr>
        </thead>
        <tbody>
  {fetchedData.map((data, index) => (
    <tr key={index}>
      <td className='gen-pdf'>{data.pdf}</td>
      <td className='des-UpBud'>{data.description}</td>
      <td className='enterstatus-UpBud'>{data.status}</td>
      <td className='entercomm-UpBud'>{data.comment}</td>
    </tr>
  ))}
</tbody>
      </table>

      <button className="uploadbutton" onClick={handleUploadClick}>
        Upload
      </button>
<br></br><br></br><br></br>
      {showInputs && (
        <fieldset>
          <br />
          Upload Your File Here : <input type="file" name="file" id="file" />
          <br />
          Description :
    <input 
      className="des-budget"
      type='text' 
      name='description' 
      id='description' 
      
      value={descValue}
      onChange={(e) => setDescValue(e.target.value)}
    />
          <button className="submituploadbudget" onClick={handleSaveClick}>
            Submit
          </button>
        </fieldset>
      )}
    </div>
  );
}

export default UploadBudget;