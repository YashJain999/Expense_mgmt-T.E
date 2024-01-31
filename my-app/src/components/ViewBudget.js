import React, { useState, useEffect } from 'react';
import '../assets/css/ViewBudget.module.css';
import axios from 'axios';

function ViewBudget({isOffcanvasOpen}) {

  const AppStyle = {
    position:"relative",
    top:"100px",
    left : isOffcanvasOpen ? '130px': '0%'  ,
    width: isOffcanvasOpen ? 'calc(100% - 260px)': '100%'  ,
    transition: 'all 0.5s ease',
    zIndex: 1000,
  };
    const [selectedYear, setSelectedYear] = useState('');
    const [budgetData, setBudgetData] = useState([]);
      const handleDownloadClick = async () => {
        try {
          const response = await fetch(`http://localhost:8000/generate_pdf/?selectedYear=${selectedYear}`, {
              method: 'GET',
          });
  
          const blob = await response.blob();
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `cumulative_budget_report_of_year_${selectedYear}.pdf`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      } catch (error) {
          console.error('Error in downloading', error);
          alert('Error in downloading');
      }
  };
      
      

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/dropdown/'); // endpoint of dropdown
      setBudgetData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  // const calculateColumnTotal = (columnData) => {
  //   return columnData.reduce((acc, curr) => acc + (curr ? parseInt(curr) : 0), 0);
  // };

  
  const handleYearSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8000/submit_year/', { selectedYear });
      console.log('Year selection successful:', response.data);
      // Handle successful submission
    } catch (error) {
      console.error('Error submitting selected year:', error);
      // Handle error
    }
  
    try {
      const response = await axios.post('http://localhost:8000/get_budget_data/', { selectedYear });
      const budgetData = response.data;
      const tableRows = document.querySelectorAll('table tbody tr');
      const table = document.querySelector('table');
      const rows = table.querySelectorAll('tr');
      const columnData = Array.from({ length: 8 }, () => []);
      const rowData = [];
  
      const totalRows = table.querySelectorAll('tr.total');
      let column7 = 0;
    let column8 = 0;
    let column6 = 0;
    let column5 = 0;
    let column4 = 0;
    let column3 = 0;
    let column2 = 0;
    let column1 = 0;
    // Initialize column sums
let columnSums = Array.from({ length: 8 }, () => 0);

budgetData.forEach((data, index) => {
    tableRows[index].cells[7].textContent = data.budgeted_amt;
    tableRows[index].cells[8].textContent = data.actual_exp;
    
    // Update individual column sums
    columnSums[6] += parseFloat(data.budgeted_amt) || 0;
    columnSums[7] += parseFloat(data.actual_exp) || 0;

    // Assuming budgetData is sorted by year
    const previousYearData = budgetData[7 + index]; // Get data for the previous year
    if (previousYearData) {
        tableRows[index].cells[5].textContent = previousYearData.budgeted_amt;
        columnSums[4] += parseFloat(previousYearData.budgeted_amt) || 0;

        tableRows[index].cells[6].textContent = previousYearData.actual_exp;
        columnSums[5] += parseFloat(previousYearData.actual_exp) || 0;
    }

    const previousYearData1 = budgetData[14 + index];
    if (previousYearData1) {
        tableRows[index].cells[3].textContent = previousYearData1.budgeted_amt;
        columnSums[2] += parseFloat(previousYearData1.budgeted_amt) || 0;

        tableRows[index].cells[4].textContent = previousYearData1.actual_exp;
        columnSums[3] += parseFloat(previousYearData1.actual_exp) || 0;
    }

    const previousYearData2 = budgetData[21 + index];
    if (previousYearData2) {
        tableRows[index].cells[1].textContent = previousYearData2.budgeted_amt;
        columnSums[0] += parseFloat(previousYearData2.budgeted_amt) || 0;

        tableRows[index].cells[2].textContent = previousYearData2.actual_exp;
        columnSums[1] += parseFloat(previousYearData2.actual_exp) || 0;
    }


// Create a new row element for the individual column sums
const individualSumsRow = document.createElement('tr');
individualSumsRow.classList.add('total-row');
const individualSumsCell = document.createElement('td');
individualSumsCell.textContent = 'Total';
individualSumsRow.appendChild(individualSumsCell);

// Create and append td elements for each column sum
for (let i = 0; i < 8; i++) {
    const sumCell = document.createElement('td');
    sumCell.textContent = columnSums[i];
    individualSumsRow.appendChild(sumCell);
}

// Remove any existing total rows
const existingTotalRows = document.querySelectorAll('tr.total-row');
existingTotalRows.forEach(row => row.remove());

// Append the new total row
table.appendChild(individualSumsRow);
});

}
   
  
  catch (error) {
    console.error('Error fetching budget data:', error);
  }
};

  return (
    <div className='container p-2 mw-5' style={AppStyle}>
        {/*dropdown component */}
      <label htmlFor="language" >Financial Year :</label>
      <select
  class="year"
  value={selectedYear}
  onChange={(e) => setSelectedYear(e.target.value)}
>
  {budgetData.map((item, index) => (
    <option key={index} value={item}>
      {item}
    </option>
  ))}
</select>

<button class="viewbutton" onClick={handleYearSubmit}>View</button>


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
            <td>Laboratory Consumables</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            </tr>
          <tr>
            <td>Laboratory Equipments</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Maintenance & Spares</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Miscellaneous</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Research and Development</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Software</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Training and travel</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          {/* <tr>
            <td>Total</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr> */}
        </tbody>
      </table>
      <button class="Edit" onClick={handleDownloadClick}>Download</button>
    </div>
  );
}

export default ViewBudget;