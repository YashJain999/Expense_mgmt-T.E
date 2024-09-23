import React, { useState, useEffect } from 'react';
import '../assets/css/ViewBudget.css';
import Table from './CumulativeTable'
import axios from 'axios';
import { useParams } from "react-router-dom";
import ButtonComponent from './ButtonComponent';

function Cumulative() {
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedYearfrom, setSelectedYearfrom] = useState('');
    const [budgetData, setBudgetData] = useState([]);
    const [data, setData] = useState([]);
    const { username } = useParams();
    // Function to calculate selectedYearto based on selectedYear
    const calculateSelectedYearto = (year) => {
        const [startYear, endYear] = year.split('-');
        const newstartYear = parseInt(startYear, 10) - 3;
        const newendYear = parseInt(endYear, 10) - 3;
        return `${newstartYear}-${newendYear}`;
    };
    // Call calculateSelectedYearto when selectedYear changes
    useEffect(() => {
        setSelectedYearfrom(calculateSelectedYearto(selectedYear));
    }, [selectedYear]);
    useEffect(() => {
        handleYearSubmit();
    }, [selectedYearfrom]);
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
            if (selectedYear !== '' && selectedYearfrom !== '') {
                const selectedYearto = selectedYear;
                const response = await axios.post('http://localhost:8000/get_budget_data/', { selectedYearfrom, selectedYearto, username });
                setData(response.data);                
            }
        }
        catch (error) {
            window.alert('Error fetching budget data:', error);
        }
    };
    return (
        <div className='w-100 h-100'>
            {true && (
                <>
                    <Table data={data} caption={
                        <div className='d-flex flex-row justify-content-between px-3 mt-2'>
                            <span className='h2'>Cumulative Budget</span>
                            <select
                                className="w-25 bg-primary text-white h5 border px-2" aria-labelledby="dropdownMenuButton2"
                                value={selectedYear}
                                onChange={(e) => { setSelectedYear(e.target.value); }}>
                                <option className="" value="" disabled >Financial Year</option>
                                {budgetData.map((item, index) => (
                                    <option className='' key={index} value={item}>
                                        {item}
                                    </option>
                                )).reverse()}
                            </select>
                        </div>
                    } />
                    <ButtonComponent onClick={handleDownloadClick} text={"Download"} />
                </>
            )}
        </div>
    );
}

export default Cumulative;