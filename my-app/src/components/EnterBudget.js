import React, { useState, useEffect } from 'react';
import '../assets/css/EnterBudget.module.css'; 
import axios from 'axios';

function EnterBudget({isOffcanvasOpen}) {
    const [selectedYear, setSelectedYear] = useState('');
    const [budgetData, setBudgetData] = useState([]);
    const [fetchedData, setFetchedData] = useState([]);
    const [isEditing, setIsEditing] = useState(false); // State to track editing status
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
            try {
                const response1 = await axios.post('http://localhost:8000/get_budget_details/', { selectedYear });
                console.log(response1.data);
                const tableRows = document.querySelectorAll('table tbody tr');
                const table = document.querySelector('table');
                let column2 = 0;
                let column1 = 0;
                let item_test = [];
                if (response1.data.length > 0) {
                    response1.data.forEach((data, index) => {
                        item_test.push(data.item);
                        tableRows[index].cells[1].textContent = data.budgeted_amt;
                        column1 += Number(data.budgeted_amt);
                        tableRows[index].cells[2].textContent = data.actual_exp;
                        column2 += Number(data.actual_exp);
                    });
                } else {
                    alert('no data available');
                    handleEditClick();
                }
                const existingTotalRows = document.querySelectorAll('tr.total-row');
                existingTotalRows.forEach(row => row.remove());
    
                // Create a new row element for the individual column sums
                const individualSumsRow = document.createElement('tr');
                individualSumsRow.classList.add('total-row');
                const individualSumsCell = document.createElement('td');
                individualSumsCell.textContent = 'Total';
                individualSumsRow.appendChild(individualSumsCell);
    
                const sumCell1 = document.createElement('td');
                sumCell1.textContent = String(column1);
                individualSumsRow.appendChild(sumCell1);
    
                const sumCell2 = document.createElement('td');
                sumCell2.textContent = String(column2);
                individualSumsRow.appendChild(sumCell2);
    
                // Append the new row to the table body
                table.querySelector('tbody').appendChild(individualSumsRow);
            } catch (error) {
                console.error("Error in getting response:", error); // Log the specific error message
            }
            // Handle successful submission
        } catch (error) {
            console.error('Error submitting selected year:', error);
            // Handle error
        }
    };
    const handleEditClick = () => {
        const tableRows = document.querySelectorAll('table tbody tr');
        // Exclude the last row from editing
        for (let i = 0; i < tableRows.length - 1; i++) {
            const cells = tableRows[i].cells;
            for (let j = 1; j < cells.length; j++) {
                const inputField = document.createElement('input');
                inputField.value = cells[j].textContent;
                cells[j].textContent = '';
                cells[j].appendChild(inputField);
            }
        }
        setIsEditing(true); // Set editing status to true
    };
    const handleSaveClick = async () => {
        const tableRows = document.querySelectorAll('table tbody tr');
        const updatedData = [];
    
        tableRows.forEach((row, index) => {
            const cells = row.cells;
            const itemName = row.cells[0].textContent;
            if (itemName.toLowerCase() !== 'total') {
                const budgetedInput = cells[1].querySelector('input');
                const actualInput = cells[2].querySelector('input');
                const rowData = {
                    item: itemName,
                    budgeted_amt: budgetedInput !== null ? budgetedInput.value : '',
                    actual_exp: actualInput !== null ? actualInput.value : ''
                };
                updatedData.push(rowData);
            }
        });
    
        try {
            const response = await axios.post('http://localhost:8000/update_budget_details/', {
                selectedYear,
                updatedData
            });
            console.log('Data successfully updated:', response.data);
            window.alert("Data Updated Success")
            handleYearSubmit();
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };
    
    return (
        <div className='container p-2 mw-5' style={AppStyle}>
            {/*dropdown component */}
            <label htmlFor="language">Financial Year :</label>
            <select
                className="year"
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
            <th>Budget</th>
            <th>Actual Expenses</th>
          </tr>
        </thead>
        <tbody>
        <tr>
            <td>Laboratory Consumables</td>
            <td></td>
            <td></td>
    </tr>
  
          <tr>
            <td>Laboratory Equipment</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Maintenance and Spares</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Miscellaneous expenses</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Research and Development</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Software</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Training and Travel</td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>

      
      <button class="Edit" onClick={handleEditClick}>Edit</button>
      <button class="save" onClick={handleSaveClick} disabled={!isEditing}>Save</button> {/* Disable save button if not editing */}
    </div>
  );
}


export default EnterBudget;