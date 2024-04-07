import React, { useState, useEffect } from 'react';
import '../assets/css/ViewBudget.css';
import Table from './CumulativeTable'
import axios from 'axios';
import {useParams } from "react-router-dom";

function Cumulative({isOffcanvasOpen}) {
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedYearfrom, setSelectedYearfrom] = useState('');
    const [budgetData, setBudgetData] = useState([]);
    const [data, setData] = useState([]);
    const [showInputs, setShowInputs] = useState(false);
    const { username } = useParams();
    const isButtonDisabled = !selectedYear;
    const AppStyle = {
    position:"relative",
    top:"-90px",
    left : isOffcanvasOpen ? '0px': '0%'  ,
    width: isOffcanvasOpen ? 'calc(100% - 360px)': '100%'  ,
    transition: 'all 0.5s ease',
    zIndex: 1000,
    };
    // Function to calculate selectedYearto based on selectedYear
    const calculateSelectedYearto = (year) => {
        const [startYear, endYear] = year.split('-');
        const newstartYear = parseInt(startYear, 10) - 3;
        const newendYear = parseInt(endYear,10) -3;
        return `${newstartYear}-${newendYear}`;
    };
    // Call calculateSelectedYearto when selectedYear changes
    useEffect(() => {
        setSelectedYearfrom(calculateSelectedYearto(selectedYear));
    }, [selectedYear]);
    const handleDownloadClick = async () => {
        try {
            const response = await fetch(`http://localhost:8000/generate_pdf/?selectedYear=${selectedYear}&username=${username}`, {
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
            window.alert('Error in downloading');
        }
    };
    useEffect(() => {
    fetchData();
    }, []);

    const fetchData = async () => {
    try {
        const response = await axios.get('http://localhost:8000/dropdown/'); // endpoint of dropdown
        setBudgetData(response.data.slice(3));
    } catch (error) {
        window.alert('Error fetching data:', error);
    }
    };

    const handleYearSubmit = async () => {
        try {
            const selectedYearto = selectedYear;
            const response = await axios.post('http://localhost:8000/get_budget_data/', {  selectedYearfrom, selectedYearto ,username });
            setData(response.data);
            setShowInputs(true);
        }
        catch (error) {
            window.alert('Error fetching budget data:', error);
        }
    };

    return (
    <div className='container p-2 mw-5' style={AppStyle}>
        <label htmlFor="language" className='c-FinanYear'>Financial Year :</label>
        <select
            class="c-year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}>
            <option value="" disabled >Select an option</option>
            {budgetData.map((item, index) => (
            <option key={index} value={item}>
                {item}
            </option>
            ))}
        </select>
        <button class="c-viewbutton" onClick={handleYearSubmit} disabled={isButtonDisabled}>View</button>
        <br></br>
        {showInputs && (
        <>
        <div className='c-maindiv'>
        <Table data={data}/>
        <button class="Downloadviewbudget" onClick={handleDownloadClick}>Download</button>
        </div>
        </>
        )}   
    </div>
    );
}

export default Cumulative;