import React, { useState } from 'react';
import './ViewBudget.css'; 

function FinancialTable() {
  const [selectedYear, setSelectedYear] = useState('three'); 

  
  const handleDownloadClick = () => {

    alert('Download button clicked');
  };
  return (
    <div>
      <label htmlFor="language" >Financial Year :</label>
      <select
        class="year"
        name="language"
        // id="language"
        // className='year'
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
            <th>Budget in CFY</th>
            <th>Actual Expenses In CFY</th>
            <th>Budgeted in CFY m1</th>
            <th>Actual Expenses in CFY m1</th>
            <th>Budgeted in CFY m2</th>
            <th>Actual Expenses in CFY m2</th>
            <th>Budgeted in CFY m3</th>
            <th>Actual Expenses in CFY m3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Laboratory Equipment</td>
            <td>

            </td>
            <td>
              
            </td>
            <td>
              
            </td>
            <td>
              
            </td>
            <td>
              
            </td>
            <td>
              
            </td>
            <td>
              
            </td>
            <td>
              
            </td>
            
          </tr>
          <tr>
            <td>Software</td>
            <td>

            </td>
            <td>
              
            </td>
            <td>
              
            </td>
            <td>
              
            </td>
            <td>
              
            </td>
            <td>
              
            </td>
            <td>
              
            </td>
            <td>
              
            </td>
          </tr>
          <tr>
            <td>Maintenance & Spares</td>
            <td>

            </td>
            <td>
              
            </td>
            <td>
              
            </td>
            <td>
              
            </td>
            <td>
              
            </td>
            <td>
              
            </td>
            <td>
              
            </td>
            <td>
              
            </td>
          </tr>
          <tr>
            <td>Research & Development</td>
            <td>
              
            </td>
            <td>

            </td>
            <td>

            </td>
            <td>
              
            </td>
            <td>
              
            </td>
            <td>
              
            </td>
            <td>
              
            </td>
            <td>
              
            </td>
          </tr>
          <tr>
            <td>Travel and Training</td>
            <td>
              
            </td>
            <td>
             
            </td>
            <td>
              
            </td>
            <td>
              
            </td>
            <td>
              
            </td>
            <td>
              
            </td>
            <td>
              
            </td>
            <td>
              
            </td>
          </tr>
          <tr>
            <td>Miscellaneous expenses</td>
            <td>
              
            </td>
            <td>
              
            </td>
            <td>
              
            </td>
            <td>
              
            </td>
            <td>
              
            </td>
            <td>
              
            </td>
            <td>
              
            </td>
            <td>
              
            </td>
          </tr>
          <tr>
            <td>Total</td>
            <td>
              
            </td>
            <td>
              
            </td>
            <td>
              
            </td>
            <td>
              
            </td>
            <td>
              
            </td>
            <td>
              
            </td>
            <td>
              
            </td>
            <td>
              
            </td>
          </tr>
        </tbody>
      </table>

      
      <button class="Edit" onClick={handleDownloadClick}>Download</button>
    </div>
  );
}

export default FinancialTable;
