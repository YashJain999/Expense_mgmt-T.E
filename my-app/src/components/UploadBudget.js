import React, { useState, useEffect } from 'react';
import '../assets/css/UploadBudget.module.css';
import axios from 'axios';

function UploadBudget({isOffcanvasOpen}) {
  const [selectedYear, setSelectedYear] = useState('');
  const [budgetData, setBudgetData] = useState([]);
  const [showInputs, setShowInputs] = useState(false);
  const [yearValue, setYearValue] = useState('');
  const [descValue, setDescValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [fetchedData, setFetchedData] = useState([]);
  const AppStyle = {
    position:"relative",
    top:"100px",
    left : isOffcanvasOpen ? '130px': '0%'  ,
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
        Data.append('branch', 'IT');
        Data.append('selectedYear', selectedYear);
        const response2 = await axios.post('http://localhost:8000/get_uploaded_docs/', Data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        if (response2.status === 200) {
          if(response2.data.length === 0){
            alert('no data available')
          }
          else{
          if (response2.data && Array.isArray(response2.data)) {
            const data = response2.data.map((item) => ({
              pdf: item.pdf,
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
    const fileInput = document.getElementById('file');
    const file = fileInput.files[0];
  
    const formData = new FormData();
    formData.append('branch', selectedOption);
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
          // Handle successful submission
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
      {/* Dropdown component */}
      <label htmlFor="language">Financial Year :</label>
      <select className="year" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
        {budgetData.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
      <button className="viewbutton" onClick={handleYearSubmit}>
        View
      </button>
      <br></br>
      <table>
        <thead>
          <tr>
            <th className="budget">Name of Uploaded Budget</th>
            <th className="description">Description</th>
            <th className="status">Status</th>
            <th className="comments">Comments</th>
          </tr>
        </thead>
        <tbody>
  {fetchedData.map((data, index) => (
    <tr key={index}>
      <td>{data.pdf}</td>
      <td>{data.description}</td>
      <td>{data.status}</td>
      <td>{data.comment}</td>
    </tr>
  ))}
</tbody>
      </table>

      <button className="save" onClick={handleUploadClick}>
        Upload
      </button>
<br></br><br></br><br></br>
      {showInputs && (
        <fieldset>
          <div>
            Select Your Branch   <input
              type="radio"
              name="branch"
              value="AIML"
              checked={selectedOption === "AIML"}
              onChange={() => setSelectedOption("AIML")}
            />
            <label htmlFor="AIML">AIML</label>
            <input
              type="radio"
              name="branch"
              value="CIVIL"
              checked={selectedOption === "CIVIL"}
              onChange={() => setSelectedOption("CIVIL")}
            />
            <label htmlFor="CIVIL">CIVIL</label>
            <input
              type="radio"
              name="branch"
              value="CS"
              checked={selectedOption === "CS"}
              onChange={() => setSelectedOption("CS")}
            />
            <label htmlFor="CS">CS</label>
            <input
              type="radio"
              name="branch"
              value="DS"
              checked={selectedOption === "DS"}
              onChange={() => setSelectedOption("DS")}
            />
            <label htmlFor="DS">DS</label>
            <input
              type="radio"
              name="branch"
              value="IT"
              checked={selectedOption === "IT"}
              onChange={() => setSelectedOption("IT")}
            />
            <label htmlFor="IT">IT</label>
            <input
              type="radio"
              name="branch"
              value="MECH"
              checked={selectedOption === "MECH"}
              onChange={() => setSelectedOption("MECH")}
            />
            <label htmlFor="MECH">MECH</label>
          </div>
          <br />
          Upload Your File Here : <input type="file" name="file" id="file" />
          <br />
          Description : 
    <input 
      type='text' 
      name='description' 
      id='description' 
      style={{ border: '1px solid black' }}
      value={descValue}
      onChange={(e) => setDescValue(e.target.value)}
    />
          <button className="save" onClick={handleSaveClick}>
            Submit
          </button>
        </fieldset>
      )}
    </div>
  );
}

export default UploadBudget;