import React, { useState } from 'react';
import './uploadbud.css'; 

function uploadBudget(){
  const [selectedYear, setSelectedYear] = useState('three'); 

  
  // const handleDownloadClick = () => {

  //   alert('Download button clicked');
  // };

 
  // const handleSaveClick = () => {
  
  //   alert('Save button clicked');
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
      <br></br>
      <table>
        <thead>
          <tr>
            <th class="budget">Uploaded Budget</th>
            <th class="time">Time</th>
            <th class="status">Status</th>
            <th class="comments">Comments</th>
            
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><div class="table"></div></td>
            <td>
            </td>
            <td>
              
            </td>
          </tr>
          <tr>
            <td><div class="table"></div></td>
            <td>
            </td>
            <td>
              {/* <input type="text" id="expenses-software" name="expenses-software" /> */}
            </td>
            <td>
            </td>
          </tr>
          <tr>
            <td><div class="table"></div></td>
            <td>
            </td>
            <td>
            </td>
            <td>
            </td>
          </tr>
          <tr>
            <td><div class="table"></div></td>
            <td>
            </td>
            <td>
            </td>
            <td></td>
          </tr>
          <tr>
            <td><div class="table"></div></td>
            <td>
            </td>
            <td>
            </td>
            <td></td>
          </tr>
          <tr>
            <td><div class="table"></div></td>
            <td>
            </td>
            <td>
            </td>
            <td></td>
          </tr>
          
        </tbody>
      </table>

      
      {/* <button class="Edit" onClick={handleDownloadClick}>Edit</button>

    
      <button class="save" onClick={handleSaveClick}>Save</button> */}
    </div>
  );
}

export default uploadBudget;
