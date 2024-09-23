import React, { useState, useEffect } from 'react';
import '../assets/css/ViewBudget.css';
import axios from 'axios';
import { useParams } from "react-router-dom";
import Table from './CumulativeTable';

function Dynamic() {
    const [selectedYearfrom, setSelectedYearfrom] = useState('');
    const [selectedYearto, setSelectedYearto] = useState('');
    const [budgetData, setBudgetData] = useState([]);
    const [data, setData] = useState([]);
    const { username } = useParams();
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

    useEffect(() => {
        handleYearSubmit();
    }, [selectedYearfrom, selectedYearto]);
    const handleYearSubmit = async () => {
        if (selectedYearfrom !== '' && selectedYearto !== '') {
            if (numYearFrom <= numYearTo) {
                try {
                    const response = await axios.post('http://localhost:8000/get_budget_data/', { selectedYearfrom, selectedYearto, username });
                    setData(response.data);
                }
                catch (error) {
                    console.error('Error fetching budget data:', error);
                }
            }
            else {
                window.alert("Put financial Year From Correctly")
            }
        }
    };

    return (
        <div className='w-100 h-100'>
            {true && (
                <Table data={data} caption={
                    <div className='d-flex flex-row gap-5 px-3 mt-2 '>
                        <span className='h2'>Dynamic Budget</span>
                        <select
                            className="bg-primary text-white h5 border px-0" aria-labelledby="dropdownMenuButton1"
                            value={selectedYearfrom}
                            onChange={(e) => { setSelectedYearfrom(e.target.value); }}>
                            <option className="" value="" disabled >From</option>
                            {budgetData.map((item, index) => (
                                <option className='' key={index} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                        <span>-</span>
                        <select
                            className="bg-primary text-white h5 border px-0" aria-labelledby="dropdownMenuButton2"
                            value={selectedYearto}
                            onChange={(e) => { setSelectedYearto(e.target.value); }}>
                            <option value="" disabled >To</option>
                            {budgetData.map((item, index) => (
                                <option key={index} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>
                } />
            )}
        </div>
    );
}

export default Dynamic;