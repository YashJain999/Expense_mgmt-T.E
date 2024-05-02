import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../assets/css/EnterBudget.css';
import axios from 'axios';
import TableComponent from './TableComponent';
import ButtonComponent from './ButtonComponent';


function EnterBudget({ isOffcanvasOpen }) {
    const [selectedYear, setSelectedYear] = useState('');
    const [budgetData, setBudgetData] = useState(getItemData); //
    /**
     *  budgetData={
     *      "Laboratory Consumables":{
                    budgeted_amt: '',
                    actual_exp: '',
                    editVisible: false,
                    placeholderValue: '',
                },...
            }
     * */
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
                placeholderValue: '',
            };
        });
        return initialState;
    }
    const AppStyle = {
        // position: "relative",
        // top: "-100px",
        // left: isOffcanvasOpen ? '0px' : '0%',
        // width: isOffcanvasOpen ? 'calc(100% - 260px)' : '100%',
        // transition: 'all 0.5s ease',
        // zIndex: 900,
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
            const response = await axios.post('http://localhost:8000/get_budget_details/', { selectedYear, username });
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

    const getTableBodyItemsFromBudgetData = () => {
        /*             
 *  budgetData={
          "Laboratory Consumables":{
                budgeted_amt: '',
                actual_exp: '',
                editVisible: false,
                placeholderValue: '',
            },...
        }
  */

        /*
         * response=[
                        [
                            { item: "Lab", styles: { textAlign: 'left', width: "40%" }, className: "Itemname text-left bg-secondary text-white" },
                            { item: <input type='number' className='text-center border-success w-100 h-100' value={budgetData[item].budgeted_amt} onChange={(e) => handleBudAmtChange(item, e.target.value)} placeholder=''></input>, styles: { width: "30%" }, className: "tdbudgetinput text-center p-0" },
                        ],
                    ]
         */

        let budgeteTableBodyRows = []
        Object.keys(budgetData).forEach(bItem => {
            let budgeteTableBodyRow = []
            console.log(bItem);
            let rowCell1 = {};
            rowCell1["item"] = bItem;
            rowCell1["styles"] = { textAlign: 'left', width: "40%" };
            rowCell1["className"] = "Itemname text-left bg-primary bg-gradient text-white";
            budgeteTableBodyRow.push(rowCell1)

            let rowCell2 = {};
            rowCell2["item"] = <input type='number' className='text-center border-success w-100 h-100' value={budgetData[bItem].budgeted_amt} onChange={(e) => handleBudAmtChange(bItem, e.target.value)} placeholder=''></input>;
            rowCell2["styles"] = { width: "30%" };
            rowCell2["className"] = "tdbudgetinput text-center p-0";
            budgeteTableBodyRow.push(rowCell2)

            let rowCell3 = {};
            rowCell3["item"] = <input type='number' className="text-center border-danger w-100 h-100" value={budgetData[bItem].actual_exp} onChange={(e) => handleActExpChange(bItem, e.target.value)} placeholder=''></input>;
            rowCell3["styles"] = {};
            rowCell3["className"] = "tdactexp text-center p-0 m-0";
            budgeteTableBodyRow.push(rowCell3)

            budgeteTableBodyRows.push(budgeteTableBodyRow);
        })
        console.log(budgeteTableBodyRows)
        return budgeteTableBodyRows;
    }

    return (
        <div className='container p-2 w-100 h-100' style={AppStyle}>
            {/* Dropdown component */}
            {/* <label htmlFor="language" className='FinanYear'>Financial Year:</label>
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

            <button className="viewbutton" onClick={handleYearSubmit}>View</button> */}
            {showEditWarning && (
                <div className="alert alert-warning" role="alert">
                    Please click the "Edit" button to make changes.
                </div>
            )}
            <br></br>
            <br></br>

            <TableComponent
                thData={[{ text: "Items", className: "Itemcol" }, { text: "Budget", className: "Budgetcol" }, { text: "Actual Expenses", className: "Actexpcol" }]}
                tbData={getTableBodyItemsFromBudgetData()}
                tfData={[{ text: "Total", styles: { textAlign: 'center' } }, { text: calculateTotal().totalBudgetedAmt, className: "text-center" }, { text: calculateTotal().totalActualExpenses, className: "text-center" }]}
                caption={
                    <div className='d-flex flex-row justify-content-between px-3 mt-2'>
                        <span className='h2'>Enter Budget</span>
                        <select
                            className="w-25 bg-primary text-white h5 border px-2" aria-labelledby="dropdownMenuButton2"
                            value={selectedYear}
                            onChange={(e) => { setSelectedYear(e.target.value); handleYearSubmit() }}>
                            <option className="" value="" disabled >Financial Year</option>
                            {fetchedData.map((item, index) => (
                                <option className='' key={index} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>
                }
            />
            {!isEditing ?
                <ButtonComponent onClick={handleEditClick} text="Edit" /> :
                <div className='d-flex flex-row gap-4 justify-content-center'>
                    <ButtonComponent onClick={handleSaveClick} text="Save" className='btn-success' />
                    <ButtonComponent onClick={handleCancelClick} text="Cancel" className='btn-danger' />
                </div>
            }
        </div>
    );
}

export default EnterBudget;