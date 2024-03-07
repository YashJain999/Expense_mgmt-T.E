import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../assets/css/EnterBudget.css'; 
import axios from 'axios';

function EnterBudget({ isOffcanvasOpen }) {
    const [selectedYear, setSelectedYear] = useState('');
    const [budgetData, setBudgetData] = useState([]);
    const { username } = useParams();
    const [fetchedData, setFetchedData] = useState([]);
    const [isEditing, setIsEditing] = useState(false); // Initially set to false to hide input fields in the particular rows (easy)
    //list items
    const [items, setItems] = useState([
        "Laboratory Consumables",
        "Laboratory Equipment",
        "Maintenance and Spares",
        "Miscellaneous expenses",
        "Research and Development",
        "Software",
        "Training and Travel"
    ]);

    const AppStyle = {
        position: "relative",
        top: "-100px",
        left: isOffcanvasOpen ? '0px' : '0%',
        width: isOffcanvasOpen ? 'calc(100% - 260px)' : '100%',
        transition: 'all 0.5s ease',
        zIndex: 1000,
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/dropdown/');
            setFetchedData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

     const handleEditClick = () => {
        const inputFields = document.querySelectorAll('table input.edit-input');
        inputFields.forEach(inputField => {
            inputField.disabled = false; // Enable input fields for editing
        });
        setIsEditing(true); // Set editing status to true
    };

    const handleSaveClick = async () => {
        setIsEditing(false); 
        // Display a pop-up message
        alert("Save button clicked!");// save button 
    };

    const handleCancelClick = () => {
        setIsEditing(false); 
    };
    const handleYearSubmit = async () => {
        try {
            // Submit the selected year to the backend
            const response = await axios.post('http://localhost:8000/submit_year/', { selectedYear });
            console.log('Year selection successful:', response.data);
    
            try {
                // Get budget details for the selected year and username
                const response1 = await axios.post('http://localhost:8000/get_budget_details/', { selectedYear, username });
                console.log(response1.data);
    
                // Check if data is available in the response
                if (response1.data.length > 0) {
                    // Map the backend response data and update the budgetData state
                    const mappedData = response1.data.map(item => ({
                        item: item.item, // Map item name
                        budgeted_amt: item.budgeted_amt, // Map budgeted amount
                        actual_exp: item.actual_exp // Map actual expenses
                    }));
                    setBudgetData(mappedData); // Update budgetData state with mapped data
                } else {
                    alert('No data available');
                }
            } catch (error) {
                console.error("Error in getting response:", error);
            }
        } catch (error) {
            console.error('Error submitting selected year:', error);
        }
    };
    
    const handleBudgetedAmtChange = (e, key) => {
        const newData = [...budgetData];
        const index = newData.findIndex(item => item.item === key);
        newData[index].budgeted_amt = e.target.value;
        setBudgetData(newData);
    };
    
    const handleActualExpChange = (e, key) => {
        const newData = [...budgetData];
        const index = newData.findIndex(item => item.item === key);
        newData[index].actual_exp = e.target.value;
        setBudgetData(newData);
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
                {fetchedData.map((item, index) => (
                    <option key={index} value={item}>
                        {item}
                    </option>
                ))}
            </select>
    
    
            <button className="viewbutton" onClick={handleYearSubmit}>View</button>
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
    {items.map((item, index) => (
        <tr key={index}>
            <td>{item}</td>
            {Object.keys(budgetData).map((key, innerIndex) => {
                const data = budgetData[key];
                if (data.item === item) {
                    return [
                        <td key={`${innerIndex}-budget`}>
                            <input
                                type="text"
                                className="budget_input"
                                value={data.budgeted_amt}
                                onChange={(e) => handleBudgetedAmtChange(e, key)}
                            />
                        </td>,
                        <td key={`${innerIndex}-actual`}>
                            <input
                                type="text"
                                value={data.actual_exp}
                                onChange={(e) => handleActualExpChange(e, key)}
                            />
                        </td>
                    ];
                }
                return null;
            })}
        </tr>
    ))}
    {/* Total Row */}
    <tr className='total-row'>
        <td>Total</td>
        <td>
            {Object.values(budgetData).reduce((acc, cur) => acc + cur.budgeted_amt, 0)}
        </td>
        <td>
            {Object.values(budgetData).reduce((acc, cur) => acc + cur.actual_exp, 0)}
        </td>
    </tr>
</tbody>


            </table>
    
            <button className="Editenterbudget" onClick={handleEditClick} style={{ display: !isEditing ? 'inline-block' : 'none' }}>Edit</button>
            <button className="saveenterbudget" onClick={handleSaveClick} style={{ display: isEditing ? 'inline-block' : 'none' }}>Save</button>
            <button className="cancelenterbudget" onClick={handleCancelClick} style={{ display: isEditing ? 'inline-block' : 'none' }}>Cancel</button>
    
        </div>
    );
    
}

export default EnterBudget;