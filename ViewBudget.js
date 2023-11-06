import React, { useState, useEffect } from 'react';
import './ViewBudget.css'; 
import axios from 'axios';

function ViewBudget() {
    const [selectedYear, setSelectedYear] = useState('');
    const [budgetData, setBudgetData] = useState([]);

    const handleDownloadClick = async () => {
        try {
            // here i have sended an API endpoint request to download the pdf 
            // Set the response type to 'blob' to handle binary data like files, such as PDFs.
            // This ensures that the response data is treated as a binary object and allows for proper handling of file downloads.
          const response = await axios.get('http://localhost:8000/generate_pdf/', {selectedYear}, { responseType: 'blob' });
          // created a url for the downloaded blob data
          const url = window.URL.createObjectURL(new Blob([response.data]));
          // Create an anchor element to trigger the download
          const link = document.createElement('a');
          link.href = url; // here we have set the url
          link.setAttribute('download', 'item_master.pdf'); // here also we have set the attribute for filename
          document.body.appendChild(link);  // this appends the anchor tag to the document body
          link.click();  // so on click trigger the downloading process 
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
  const calculateColumnTotal = (columnData) => {
    return columnData.reduce((acc, curr) => acc + (curr ? parseInt(curr) : 0), 0);
  };

  
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
  
      budgetData.forEach((data, index) => {
        tableRows[index].cells[7].textContent = data.budgeted_amt;
        tableRows[index].cells[8].textContent = data.actual_exp;
        // tableRows[index].cells[6].textContent = data.previousYearData.budgetData;
        // Update other table cells in a similar manner
         // Assuming budgetData is sorted by year
      const previousYearData = budgetData[7 + index]; // Get data for the previous year
      if (previousYearData) {
        tableRows[index].cells[5].textContent = previousYearData.budgeted_amt;
        tableRows[index].cells[6].textContent = previousYearData.actual_exp;
        // Update other table cells in a similar manner for the previous year
      }
      const previousYearData1 = budgetData[14 +index];
      if(previousYearData1){
        tableRows[index].cells[3].textContent = previousYearData1.budgeted_amt;
        tableRows[index].cells[4].textContent = previousYearData1.actual_exp;
      }
      const previousYearData2 = budgetData[21 + index];
      if(previousYearData1){
        tableRows[index].cells[1].textContent = previousYearData2.budgeted_amt;
        tableRows[index].cells[2].textContent = previousYearData2.actual_exp;
      }
    
// Get the table element
const table = document.querySelector('table');

// Create a new row element
const newRow = document.createElement('tr');

// Create a new cell element to contain the text "Total"
const totalCell = document.createElement('td');
totalCell.textContent = 'Total';

// // Add the new cell element to the new row element
// newRow.appendChild(totalCell);

// // Calculate the total for each column in the table
// const columnTotals = [];
// for (let i = 0; i < table.rows.length; i++) {
//   const row = table.rows[i];
//   const cells = row.cells;
//   let total = 0;
//   for (let j = 0; j < cells.length; j++) {
//     const cell = cells[j];
//     total += parseInt(cell.textContent);
//   }
//   columnTotals.push(total);
// }

// // Create a new cell element for each column total
// for (let i = 0; i < columnTotals.length; i++) {
//   const totalCell = document.createElement('td');
//   totalCell.textContent = columnTotals[i];
//   newRow.appendChild(totalCell);
// }

// // Add the new row element to the table element
// table.appendChild(newRow);
    });
   
  
  } catch (error) {
    console.error('Error fetching budget data:', error);
  }
};

  return (
    <div>
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
