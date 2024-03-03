import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../assets/css/EnterBudget.css'; 
import axios from 'axios';

function EnterBudget({ isOffcanvasOpen }) {
    const [selectedYear, setSelectedYear] = useState('');
    const [budgetData, setBudgetData] = useState([]);
    const { username } = useParams();
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

    const handleEditClick = () => {
        setIsEditing(true); //edit 
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
        // Submit button f
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
                {budgetData.map((item, index) => (
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
                            <td>{isEditing ? <input defaultValue="" /> : ''}</td>
                            <td>{isEditing ? <input defaultValue="" /> : ''}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button className="Editenterbudget" onClick={handleEditClick} style={{ display: !isEditing ? 'inline-block' : 'none' }}>Edit</button>
            <button className="saveenterbudget" onClick={handleSaveClick} style={{ display: isEditing ? 'inline-block' : 'none' }}>Save</button>
            <button className="cancelenterbudget" onClick={handleCancelClick} style={{ display: isEditing ? 'inline-block' : 'none' }}>Cancel</button>

        </div>
    );
}

export default EnterBudget;
