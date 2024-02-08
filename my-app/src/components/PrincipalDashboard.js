import React, { useState, useEffect} from 'react';
import '../assets/css/PrincipalDashboard.module.css'; 
import axios from 'axios';

function PrincipalDashboard({isOffcanvasOpen}) {
  //select finantical year js hai 
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

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
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
  
  const [comment, setCSComment] = useState('');
  const [CSbuttonsVisible, setCSButtonsVisible] = useState(true);

  const handleSaveCSButtonClick = () => {
    // Handle the first button click action here
    const formData = new FormData();
    formData.append('dept', 'CS'); // Add the constant dept value
    formData.append('year', selectedYear);
    formData.append('status', selectedOption);
    formData.append('comment', comment);
    
  
    axios.post('http://localhost:8000/principal_status/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(() => {
        window.alert("Status update Successful for Dept: CS")
        // Set CSButtonsVisible to false after the request is completed
        setCSButtonsVisible(false);
      })
      .catch((error) => {
        // Handle error if needed
        console.error('Error posting data:', error);
      });
  };
  

  const [AIcomment, setAIComment] = useState('');
  const [AIbuttonsVisible, setAIButtonsVisible] = useState(true);

  const handleSaveAIButtonClick = () => {
    // Handle the first button click action here
    setAIButtonsVisible(false);
  };

  const [ITcomment, setITComment] = useState('');
  const [ITbuttonsVisible, setITButtonsVisible] = useState(true);

  const handleSaveITButtonClick = () => {
    // Handle the first button click action here
    setITButtonsVisible(false);
  };

  const [DScomment, setDSComment] = useState('');
  const [DSbuttonsVisible, setDSButtonsVisible] = useState(true);

  const handleSaveDSButtonClick = () => {
    // Handle the first button click action here
    setDSButtonsVisible(false);

  };

  const [CVcomment, setCVComment] = useState('');
  const [CVbuttonsVisible, setCVButtonsVisible] = useState(true);

  const handleSaveCVButtonClick = () => {
    // Handle the first button click action here
    setCVButtonsVisible(false);
  };

  const [MEcomment, setMEComment] = useState('');
  const [MEbuttonsVisible, setMEButtonsVisible] = useState(true);

  const handleSaveMEButtonClick = () => {
    // Handle the first button click action here
    setMEButtonsVisible(false);
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
      <button class="viewDetails" onClick={handleViewDetails}>View</button>
      <br></br>
      <table>
        <thead>
          <tr>
          <th>Department</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Comment</th>
                        <th>PDF</th>
          </tr>
        </thead>
        <tbody>
        {pdfRecords.map((record, index) => (
                        <tr key={index}>
                            <td>{record.dept}</td>
                            <td>{record.description}</td>
                            <td>{record.status}</td>
                            <td>{record.comment}</td>
                            <td>
                                {record.pdf && (
                                    <a href={`data:application/pdf;base64,${record.pdf}`} target="_blank" rel="noreferrer">View PDF</a>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
                {pdfRecords.map((pdfData, index) => (
          <div key={index}>
            <iframe src={`data:application/pdf;base64,${pdfData}`} width="100%" height="500"></iframe>
            {/* Alternatively, you can provide download links */}
            <a href={`data:application/pdf;base64,${pdfData}`} download={`pdf_${index}.pdf`}>Download PDF {index}</a>
          </div>
        ))}
        {/* <tbody>
          <tr>
            <td>Computer Science</td>
            <td>
            <i class="fa-sharp fa-solid fa-download fa-2xl"></i>
            </td>
            <td>
            <label>
        <input
          type="radio"
          value="Approve"
          checked={selectedOption === 'Approve'}
          onChange={handleOptionChange}
        />
        Approve
      </label>

      <label>
        <input
          type="radio"
          value="option2"
          checked={selectedOption === 'option2'}
          onChange={handleOptionChange}
        />
        Reject
      </label>

            <textarea
            rows="3"
            cols="40"
              value={comment}
              onChange={(e) => setCSComment(e.target.value)}
              placeholder="Comment"
            />
            <br></br>
            <div>
      {CSbuttonsVisible && (
        <button class="tablebutton" onClick={handleSaveCSButtonClick}>Save</button>
      )}
    </div>  
            </td>
          </tr>
          <tr>
            <td>Information Technology</td>
            <td>
            <i class="fa-sharp fa-solid fa-download fa-2xl"></i>
            </td>
            <td>
            <label>
        <input
          type="radio"
          value="option3"
          checked={selectedOption === 'option3'}
          onChange={handleOptionChange}
        />
        Approve
      </label>

      <label>
        <input
          type="radio"
          value="option4"
          checked={selectedOption === 'option4'}
          onChange={handleOptionChange}
        />
        Reject
      </label>

            <textarea
              rows="3"
              cols="40"
              value={ITcomment}
              onChange={(e) => setITComment(e.target.value)}
              placeholder="Comment"
            />
            <br></br>
            <div>
      {ITbuttonsVisible && (
        <button class="tablebutton"onClick={handleSaveITButtonClick}>Save</button>
      )}
    </div>
            </td>
          </tr>
          <tr>
            <td>Artificial Intelligence</td>
            <td>
            <i class="fa-sharp fa-solid fa-download fa-2xl"></i>
            </td>
            <td>
            <label>
        <input
          type="radio"
          value="option5"
          checked={selectedOption === 'option5'}
          onChange={handleOptionChange}
        />
        Approve
      </label>

      <label>
        <input
          type="radio"
          value="option6"
          checked={selectedOption === 'option6'}
          onChange={handleOptionChange}
        />
        Reject
      </label>

            <textarea
              rows="3"
              cols="40"
              value={AIcomment}
              onChange={(e) => setAIComment(e.target.value)}
              placeholder="Comment"
            />
            <br></br>
            <div>
      {AIbuttonsVisible && (
        <button class="tablebutton"onClick={handleSaveAIButtonClick}>Save</button>
      )}
    </div>
            </td>
          </tr>
          <tr>
            <td>Data Science</td>
            <td>
            <i class="fa-sharp fa-solid fa-download fa-2xl"></i>
            </td>
            <td>
            <label>
        <input
          type="radio"
          value="option7"
          checked={selectedOption === 'option7'}
          onChange={handleOptionChange}
        />
        Approve
      </label>

      <label>
        <input
          type="radio"
          value="option8"
          checked={selectedOption === 'option8'}
          onChange={handleOptionChange}
        />
        Reject
      </label>

            <textarea
            rows="3"
            cols="40"
              value={DScomment}
              onChange={(e) => setDSComment(e.target.value)}
              placeholder="Comment"
            />
            <br></br>
            <div>
      {DSbuttonsVisible && (
        <button class="tablebutton"onClick={handleSaveDSButtonClick}>Save</button>
      )}
    </div>
            </td>
          </tr>
          <tr>
            <td>Civil</td>
            <td>
            <i class="fa-sharp fa-solid fa-download fa-2xl"></i>
            </td>
            <td>
            <label>
        <input
          type="radio"
          value="option9"
          checked={selectedOption === 'option9'}
          onChange={handleOptionChange}
        />
        Approve
      </label>

      <label>
        <input
          type="radio"
          value="option10"
          checked={selectedOption === 'option10'}
          onChange={handleOptionChange}
        />
        Reject
      </label>

            <textarea
              rows="3"
              cols="40"
              value={CVcomment}
              onChange={(e) => setCVComment(e.target.value)}
              placeholder="Comment"
            />
            <br></br>
            <div>
      {CVbuttonsVisible && (
        <button class="tablebutton"onClick={handleSaveCVButtonClick}>Save</button>
      )}
    </div>
            </td>
          </tr>
          <tr>
            <td>Mechanical</td>
            <td>
            <i class="fa-sharp fa-solid fa-download fa-2xl"></i>
            </td>
            <td>
            <label>
        <input
          type="radio"
          value="option11"
          checked={selectedOption === 'option11'}
          onChange={handleOptionChange}
        />
        Approve
      </label>

      <label>
        <input
          type="radio"
          value="option12"
          checked={selectedOption === 'option12'}
          onChange={handleOptionChange}
        />
        Reject
      </label>

            <textarea
              rows="3"
              cols="40"
              value={MEcomment}
              onChange={(e) => setMEComment(e.target.value)}
              placeholder="Comment"
            />
            <br></br>
            <div>
      {MEbuttonsVisible && (
        <button class="tablebutton"onClick={handleSaveMEButtonClick}>Save</button>
      )}
    </div>
            </td>
          </tr>
        </tbody> */}
      </table>
    </div>
  );
}

export default PrincipalDashboard;