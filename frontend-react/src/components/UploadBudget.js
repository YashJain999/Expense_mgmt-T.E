import React, { useState } from 'react';

function UploadBudget({isOffcanvasOpen}){
  const [selectedYear, setSelectedYear] = useState('three'); 
  const AppStyle = {
    position:"relative",
    top:"100px",
    left : isOffcanvasOpen ? '130px': '0%'  ,
    width: isOffcanvasOpen ? 'calc(100% - 260px)': '100%'  ,
    transition: 'all 0.5s ease',
    zIndex: 1000,
  };
  
  // const handleDownloadClick = () => {

  //   alert('Download button clicked');
  // };

 
  // const handleSaveClick = () => {
  
  //   alert('Save button clicked');
  // };

  return (
  <div className='container p-2 mw-5' style={AppStyle}>
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
            <th className="budget">Uploaded Budget</th>
            <th className="time">Time</th>
            <th className="status">Status</th>
            <th className="comments">Comments</th>
            
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><div className="table"></div></td>
            <td>
            </td>
            <td>
              
            </td>
          </tr>
          <tr>
            <td><div className="table"></div></td>
            <td>
            </td>
            <td>
              {/* <input type="text" id="expenses-software" name="expenses-software" /> */}
            </td>
            <td>
            </td>
          </tr>
          <tr>
            <td><div className="table"></div></td>
            <td>
            </td>
            <td>
            </td>
            <td>
            </td>
          </tr>
          <tr>
            <td><div className="table"></div></td>
            <td>
            </td>
            <td>
            </td>
            <td></td>
          </tr>
          <tr>
            <td><div className="table"></div></td>
            <td>
            </td>
            <td>
            </td>
            <td></td>
          </tr>
          <tr>
            <td><div className="table"></div></td>
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

export default UploadBudget;
