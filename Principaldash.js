import React, { useState } from 'react';
import './Principal.css'; 

function FinancialTable() {
  //select finantical year js hai 
  const [selectedYear, setSelectedYear] = useState('three'); 
  //radio button js hai  
  const [selectedOption, setSelectedOption] = useState('option1');

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };
  
  const [comment, setCSComment] = useState('');
  const handleSave = () => {
    // Handle save action here
  };
  // const [ITcomment, setITComment] = useState('');
  // const handleSave = () => {
  //   // Handle save action here
  // };
  const handleClose = () => {
    // Handle close action here
  };
  const [CSbuttonsVisible, setCSButtonsVisible] = useState(true);

  const handleFirstCSButtonClick = () => {
    // Handle the first button click action here
  };

  const handleSecondCSButtonClick = () => {
    // Handle the second button click action here

    // Hide both buttons
    setCSButtonsVisible(false);
  };
  const [AIcomment, setAIComment] = useState('');
  const [AIbuttonsVisible, setAIButtonsVisible] = useState(true);

  const handleFirstAIButtonClick = () => {
    // Handle the first button click action here
  };

  const handleSecondAIButtonClick = () => {
    // Handle the second button click action here

    // Hide both buttons
    setAIButtonsVisible(false);
  };
  const [ITcomment, setITComment] = useState('');
  const [ITbuttonsVisible, setITButtonsVisible] = useState(true);

  const handleFirstITButtonClick = () => {
    // Handle the first button click action here
  };

  const handleSecondITButtonClick = () => {
    // Handle the second button click action here

    // Hide both buttons
    setITButtonsVisible(false);
  };
  const [DScomment, setDSComment] = useState('');
  const [DSbuttonsVisible, setDSButtonsVisible] = useState(true);

  const handleFirstDSButtonClick = () => {
    // Handle the first button click action here
  };

  const handleSecondDSButtonClick = () => {
    // Handle the second button click action here

    // Hide both buttons
    setDSButtonsVisible(false);
  };
  const [CVcomment, setCVComment] = useState('');
  const [CVbuttonsVisible, setCVButtonsVisible] = useState(true);

  const handleFirstCVButtonClick = () => {
    // Handle the first button click action here
  };

  const handleSecondCVButtonClick = () => {
    // Handle the second button click action here

    // Hide both buttons
    setCVButtonsVisible(false);
  };
  const [MEcomment, setMEComment] = useState('');
  const [MEbuttonsVisible, setMEButtonsVisible] = useState(true);

  const handleFirstMEButtonClick = () => {
    // Handle the first button click action here
  };

  const handleSecondMEButtonClick = () => {
    // Handle the second button click action here

    // Hide both buttons
    setMEButtonsVisible(false);
  };



  
  const handleDownloadClick = () => {

    alert('Download button clicked');
  };

 
  const handleSaveClick = () => {
  
    alert('Save button clicked');
  };

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
      <br></br>
      <table>
        <thead>
          <tr>
            <th>Department</th>
            <th>Download </th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Computer Science</td>
            <td>
            <i class="fa-sharp fa-solid fa-download fa-2xl"></i>
            </td>
            <td>
            <label>
        <input
          type="radio"
          value="option1"
          checked={selectedOption === 'option1'}
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
        <button class="tablebutton" onClick={handleFirstCSButtonClick}>Save</button>
      )}
      {CSbuttonsVisible && (
        <button class="tablebutton" onClick={handleSecondCSButtonClick}>Close</button>
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
        <button class="tablebutton"onClick={handleFirstITButtonClick}>Save</button>
      )}
      {ITbuttonsVisible && (
        <button class="tablebutton"onClick={handleSecondITButtonClick}>Close</button>
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
        <button class="tablebutton"onClick={handleFirstAIButtonClick}>Save</button>
      )}
      {AIbuttonsVisible && (
        <button class="tablebutton"onClick={handleSecondAIButtonClick}>Close</button>
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
        <button class="tablebutton"onClick={handleFirstDSButtonClick}>Save</button>
      )}
      {DSbuttonsVisible && (
        <button class="tablebutton"onClick={handleSecondDSButtonClick}>Close</button>
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
        <button class="tablebutton"onClick={handleFirstCVButtonClick}>Save</button>
      )}
      {CVbuttonsVisible && (
        <button class="tablebutton"onClick={handleSecondCVButtonClick}>Close</button>
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
        <button class="tablebutton"onClick={handleFirstMEButtonClick}>Save</button>
      )}
      {MEbuttonsVisible && (
        <button class="tablebutton"onClick={handleSecondMEButtonClick}>Close</button>
      )}
    </div>
            </td>
          </tr>
          {/* <tr>
            <td>Miscellaneous expenses</td>
            <td>
              <input type="text" id="budget-miscellaneous-expenses" name="budget-miscellaneous-expenses" />
            </td>
            <td>
              <input type="text" id="expenses-miscellaneous-expenses" name="expenses-miscellaneous-expenses" />
            </td>
          </tr> */}
          {/* <tr>
            <td>Total</td>
            <td>
              <input type="text" id="total-budget" name="total-budget" />
            </td>
            <td>
              <input type="text" id="total-expenses" name="total-expenses" />
            </td>
          </tr> */}
        </tbody>
      </table>

      
      <button class="Edit" onClick={handleDownloadClick}>Edit</button>

    
      <button class="save" onClick={handleSaveClick}>Save</button>
    </div>
  );
}

export default FinancialTable;