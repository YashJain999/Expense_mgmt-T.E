import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../assets/css/EnterBudget.css'; 
import axios from 'axios';

function EnterBudget({ isOffcanvasOpen }) {
    const [selectedYear, setSelectedYear] = useState('');
    const [budgetData, setBudgetData] = useState(getItemData);
    const [fetchedData, setFetchedData] = useState([]);
    const { username } = useParams();
    const [originalBudgetData, setOriginalBudgetData] = useState({});
    // const [itemData, setItemData] = useState(getItemData());
    const [isEditing, setIsEditing] = useState(false);
    const [showEditWarning, setShowEditWarning] = useState(false);
    //list items
    function getItemData() {
        const items = [
            "Laboratory Consumables",
            "Laboratory Equipment",
            "Maintenance and Spares",
            "Miscellaneous expenses",
            "Research and Development",
            "Software",
            "Training and Travel"
        ];

        const initialState = {};
        items.forEach((item) => {
            initialState[item] = {
                budgeted_amt: '',
                actual_exp: '',
                editVisible: false,
                placeholderValue:'',
            };
        });
        return initialState;
    }
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
        setIsEditing(true); // Set isEditing to true to activate editing mode
        // Update each item in budgetData to set editVisible to true
        const updatedBudgetData = Object.keys(budgetData).reduce((acc, item) => {
            acc[item] = { ...budgetData[item], editVisible: true };
            return acc;
        }, {});
        setBudgetData(updatedBudgetData);
        setOriginalBudgetData({ ...budgetData }); // Store original data
    };
    

    const handleSaveClick = async () => {
        try {
            // Create an array to store all the data to be sent
            const requestData = [{
                username: username, // Assuming department is defined somewhere in your component
                year: selectedYear,
            }];
            
            // Loop through each item in budgetData
            Object.keys(budgetData).forEach(item => {
                // Push the data of each item into the requestData array
                requestData.push({
                    item: item,
                    budgeted_amt: budgetData[item].budgeted_amt,
                    actual_exp: budgetData[item].actual_exp
                });
            });
            // Send a POST request to your backend with the requestData array
            await axios.post("http://localhost:8000/update_budget_details/", requestData);
            console.log(requestData)
            // Set isEditing to false to exit editing mode
            setIsEditing(false);
            // Display a pop-up message
            alert("Save button clicked! Data saved successfully!");
        } catch (error) {
            console.error("Error saving status:", error);
            // Handle the error here, such as displaying an error message
        }
    };
    

    const handleCancelClick = () => {
        // Revert changes by replacing current budget data with original copy
        setBudgetData(originalBudgetData); // Revert changes
        setIsEditing(false); // Exit editing mode
    };

    const handleYearSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:8000/get_budget_details/', { selectedYear, username});
            const formattedData = {};
            console.log(response.data);
            response.data.forEach(item => {
                formattedData[item.item] = {
                    budgeted_amt: item.budgeted_amt,
                    actual_exp: item.actual_exp
                };
            });
            setBudgetData(formattedData);
        } catch (error) {
            console.error('Error fetching budget details:', error);
        }
    };

    const handleBudAmtChange = (item, newValue) => {
        if (!budgetData[item]?.editVisible) {
            setShowEditWarning(true);
            setTimeout(() => setShowEditWarning(false), 5000); // Auto hide after 5 seconds
            return;
          }
          setShowEditWarning(false);
        setBudgetData(prevData => ({
            ...prevData,
            [item]: {
                ...prevData[item],
                budgeted_amt: newValue,
            }
        }));
    };

    const handleActExpChange = (item, newValue) => {
        if (!budgetData[item]?.editVisible) {
            setShowEditWarning(true);
            setTimeout(() => setShowEditWarning(false), 5000); // Auto hide after 5 seconds
            return;
          }
          setShowEditWarning(false);
        setBudgetData(prevData => ({
            ...prevData,
            [item]: {
                ...prevData[item],
                actual_exp: newValue
            }
        }));
    };
    const calculateTotal = () => {
        let totalBudgetedAmt = 0;
        let totalActualExpenses = 0;
    
        Object.keys(budgetData).forEach(item => {
            totalBudgetedAmt += parseFloat(budgetData[item].budgeted_amt || 0);
            totalActualExpenses += parseFloat(budgetData[item].actual_exp || 0);
        });
    
        return { totalBudgetedAmt, totalActualExpenses };
    };
    
    return (
        <div className='container p-2 mw-5' style={AppStyle}>
            {/* Dropdown component */}
            <label htmlFor="language">Financial Year:</label>
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
            {showEditWarning && (
      <div className="alert alert-warning" role="alert">
        Please click the "Edit" button to make changes.
      </div>
    )}
            <table>
                <thead>
                    <tr>
                        <th className='Itemcol'>Items</th>
                        <th className='Budgetcol'>Budget</th>
                        <th className='Actexpcol'>Actual Expenses</th>
                    </tr>
                </thead>
                <tbody>
    {Object.keys(budgetData).map((item, index) => (
        <tr key={index}>
            <td>{item}</td>
            <td><input type='number' className='budgetinput' value={budgetData[item].budgeted_amt} onChange={(e) => handleBudAmtChange(item,e.target.value)} placeholder=''></input></td>
            <td><input type='number' value={budgetData[item].actual_exp} onChange={(e) => handleActExpChange(item,e.target.value)} placeholder=''></input></td>
        </tr>
    ))}
    <tr>
                    <td>Total</td>
                    <td>{calculateTotal().totalBudgetedAmt}</td>
                    <td>{calculateTotal().totalActualExpenses}</td>
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