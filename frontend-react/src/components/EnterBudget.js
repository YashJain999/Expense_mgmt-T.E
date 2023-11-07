import React from 'react'
import { useState } from 'react';
// import './ViewBudget.css'; 
import './EnterBudget.css'; 

function EnterBudget({isOffcanvasOpen}) {
  const AppStyle = {
    position:"relative",
    top:"100px",
    left : isOffcanvasOpen ? '260px': '0%'  ,
    width: isOffcanvasOpen ? 'calc(100% - 260px)': '100%'  ,
    transition: 'all 0.5s ease',
    zIndex: 1000,
  };  

  const [selectedYear, setSelectedYear] = useState('three'); 

  
  const handleEditClick = () => {

    alert('edit button clicked');
  };

 
  const handleSaveClick = () => {
  
    alert('Save button clicked');
  };
  
  return (
    <div className='container pt-0' style={AppStyle}>
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
            <th>Items</th>
            <th>Budget</th>
            <th>Actual Expenses</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Laboratory Equipment</td>
            <td>
              <input type="text" id="budget-laboratory-equipment" name="budget-laboratory-equipment" />
            </td>
            <td>
              <input type="text" id="expenses-laboratory-equipment" name="expenses-laboratory-equipment" />
            </td>
          </tr>
          <tr>
            <td>Software</td>
            <td>
              <input type="text" id="budget-software" name="budget-software" />
            </td>
            <td>
              <input type="text" id="expenses-software" name="expenses-software" />
            </td>
          </tr>
          <tr>
            <td>Laboratory Consumables</td>
            <td>
              <input type="text" id="budget-laboratory-consumables" name="budget-laboratory-consumables" />
            </td>
            <td>
              <input type="text" id="expenses-laboratory-consumables" name="expenses-laboratory-consumables" />
            </td>
          </tr>
          <tr>
            <td>Maintenance & Spares</td>
            <td>
              <input type="text" id="budget-maintenance-spares" name="budget-maintenance-spares" />
            </td>
            <td>
              <input type="text" id="expenses-maintenance-spares" name="expenses-maintenance-spares" />
            </td>
          </tr>
          <tr>
            <td>Research & Development</td>
            <td>
              <input type="text" id="budget-research-development" name="budget-research-development" />
            </td>
            <td>
              <input type="text" id="expenses-research-development" name="expenses-research-development" />
            </td>
          </tr>
          <tr>
            <td>Travel and Training</td>
            <td>
              <input type="text" id="budget-travel-training" name="budget-travel-training" />
            </td>
            <td>
              <input type="text" id="expenses-travel-training" name="expenses-travel-training" />
            </td>
          </tr>
          <tr>
            <td>Miscellaneous expenses</td>
            <td>
              <input type="text" id="budget-miscellaneous-expenses" name="budget-miscellaneous-expenses" />
            </td>
            <td>
              <input type="text" id="expenses-miscellaneous-expenses" name="expenses-miscellaneous-expenses" />
            </td>
          </tr>
          <tr>
            <td>Total</td>
            <td>
              <input type="text" id="total-budget" name="total-budget" />
            </td>
            <td>
              <input type="text" id="total-expenses" name="total-expenses" />
            </td>
          </tr>
        </tbody>
      </table>

      
      <button className="Edit" onClick={handleEditClick}>Edit</button>
    
      <button className="save" onClick={handleSaveClick}>Save</button>
    </div>
  );
}

export default EnterBudget
