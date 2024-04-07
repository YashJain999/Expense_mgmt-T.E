import React, { useState, useEffect } from 'react';
import '../assets/css/ViewBudget.css';
import axios from 'axios';
import {useParams } from "react-router-dom";
import Table from './Table';

function Dynamic({isOffcanvasOpen}) {
    const [selectedYearfrom, setSelectedYearfrom] = useState('');
    const [selectedYearto, setSelectedYearto] = useState('');
    const [budgetData, setBudgetData] = useState([]);
    const [data, setData] = useState([]);
    const { username } = useParams();
    const [showInputs, setShowInputs] = useState(false);
    const isButtonDisabled = !selectedYearfrom || !selectedYearto;
    const AppStyle = {
    position:"relative",
    top:"-100px",
    left : isOffcanvasOpen ? '0px': '0%'  ,
    width: isOffcanvasOpen ? 'calc(100% - 360px)': '100%'  ,
    transition: 'all 0.5s ease',
    zIndex: 1000,
    };  

    useEffect(() => {
    fetchData();
    }, []);
    const extractYear = (yearString) => {
    // Split the string by '-'
    const parts = yearString.split('-');
    // Parse the first part as an integer
    return parseInt(parts[0], 10);
    };
    const numYearFrom = extractYear(selectedYearfrom);
    const numYearTo = extractYear(selectedYearto);

    const fetchData = async () => {
    try {
        const response = await axios.get('http://localhost:8000/dropdown/');
        setBudgetData(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    };

    const handleYearSubmit = async () => {
    if (numYearFrom <= numYearTo) {
        try {
        const response = await axios.post('http://localhost:8000/get_budget_data/', { selectedYearfrom, selectedYearto ,username });
        setData(response.data);
        setShowInputs(true);
        }
        catch (error) {
        console.error('Error fetching budget data:', error);
        }
    }
    else {
        window.alert("Put financial Year From Correctly")
    }
    };

    return (
    <div className='container p-2 mw-5' style={AppStyle}><br/>
        <label htmlFor="language" className='c-FinanYear' >Financial Year :</label>
        <label htmlFor="language" className='c-FinanYear'>
            Select from :
        </label>
        <select
            className="c-year"
            value={selectedYearfrom}
            onChange={(e) => setSelectedYearfrom(e.target.value)}>
            <option value="" disabled >Select an option</option>
            {budgetData.map((item, index) => (
                <option key={index} value={item}>
                    {item}
                </option>
            ))}
        </select>
        <label htmlFor="language" className='c-FinanYearto'>
            Select to  :
        </label>
        <select
            className="c-year"
            value={selectedYearto}
            onChange={(e) => setSelectedYearto(e.target.value)}>
            <option value="" disabled >Select an option</option>
            {budgetData.map((item, index) => (
                <option key={index} value={item}>
                    {item}
                </option>
            ))}
        </select>
        <button className="c-viewbutton" onClick={handleYearSubmit} disabled={isButtonDisabled}>View</button>
        <br/>
        {showInputs && (
        <Table data={data}/>
        )}
    </div>
    );
}

export default Dynamic;