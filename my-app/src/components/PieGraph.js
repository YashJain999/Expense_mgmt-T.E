import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import Pie from './Pie';
import '../assets/css/Pie.css'; 

export default function PieGraph({ isOffcanvasOpen }) {
    const [selectedYear, setSelectedYear] = useState('');
    const [data_budget, setdata_budget] = useState('');
    const [data_actual, setdata_actual] = useState('');
    const [budgetData, setBudgetData] = useState([]);
    const [showInputs, setShowInputs] = useState(false);
    const { username } = useParams();
    const isButtonDisabled = !selectedYear;
    const AppStyle = {
        position: "relative",
        top: "-130px",
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
            setBudgetData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleYearSubmit = useCallback(async () => {
        try {
            const response1 = await axios.post('http://localhost:8000/get_pie/', { selectedYear, username });
            if (response1.data['code'] === '10') {
                window.alert("The Year\n" + response1.data['year'] + "\nDo not Contain values");
            } else {
                setdata_budget(response1.data['data_budget']);
                setdata_actual(response1.data['data_actual']);
                setShowInputs(true);
            }
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    }, [selectedYear, username]);

    useEffect(() => {
        if (selectedYear) {
            handleYearSubmit();
        }
    }, [selectedYear, handleYearSubmit]);

    return (
        <>
            <div className='container p-2 mw-5' style={AppStyle}>
                <label htmlFor='language' className='l2'>Financial Year</label>
                <br />
                <label htmlFor="language">Select:</label>
                <select
                    className="ddfor-from"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                >
                    <option value="" disabled>Select an option</option>
                    {budgetData.map((item, index) => (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
                {showInputs && (
                    <div className='Pie-graph'>
                        <Pie dataBudget={data_budget} dataActual={data_actual} />
                    </div>
                )}
            </div>
        </>
    );
}