import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams } from "react-router-dom";
import { Bar } from 'react-chartjs-2';
import BarGraph from './BarGraph';
import '../assets/css/Graphs.css'; 

export default function Graph() {
    const [selectedYearfrom, setSelectedYearfrom] = useState('');
    const [selectedYearto, setSelectedYearto] = useState('');
    const [selecteditem , setSelectedItem] = useState('');
    const [budgetData, setBudgetData] = useState([]);
    const [item_list, setItem_List] =useState([])
    const { username } = useParams();
    const [data_budget, setDataBudget] = useState([]);
    const [data_actual, setDataActual] = useState([]);
    const [data_year, setDataYear] = useState([]);
    const [showInputs, setShowInputs] = useState(false);
    const isButtonDisabled = !selectedYearfrom || !selectedYearto || !selecteditem;
    const AppStyle = {
        position:"relative",
        top:"-130px",
        // left : isOffcanvasOpen ? '0px': '0%'  ,
        // width: isOffcanvasOpen ? 'calc(100% - 260px)': '100%'  ,
        transition: 'all 0.5s ease',
        zIndex: 1000,
      };

    useEffect(() => {
        fetchData();
        fetchitem();
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
    const fetchitem = async () => {
        try {
            const response = await axios.get('http://localhost:8000/item_dropdown/');
            setItem_List(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const handleYearSubmit = async () => {
        if (numYearFrom <= numYearTo) {
            try {
                const response1 = await axios.post('http://localhost:8000/get_item_amount/', { selectedYearfrom ,selectedYearto,selecteditem ,username });
                if (response1.data['code'] === '10'){
                    window.alert("The Year\n"+response1.data['years']+"\nDo not Contain values");
                    return;
                }
                else{
                    setDataBudget(response1.data['data_budget']);
                    setDataActual(response1.data['data_actual']);
                    setDataYear(response1.data['data_year']);
                    setShowInputs(true);
                }
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        }
        else{
            window.alert("Put financial Year From Correctly")
        }
    };
  return (
    <>
    <div className='container p-2 mw-5' style={AppStyle}>
        <label htmlFor='language'className='l1'>
            Financial Year
        </label>
        <br/>
        <label htmlFor="language">
           Select from :
        </label>
        <select
            className="ddfor-from"
            value={selectedYearfrom}
            onChange={(e) => setSelectedYearfrom(e.target.value)}>
            <option value="" disabled >Select an option</option>
            {budgetData.map((item, index) => (
                <option key={index} value={item}>
                    {item}
                </option>
            ))}
        </select>
        <label htmlFor="language">
           Select to  :
        </label>
        <select
            className="ddfor-to"
            value={selectedYearto}
            onChange={(e) => setSelectedYearto(e.target.value)}>
            <option value="" disabled >Select an option</option>
            {budgetData.map((item, index) => (
                <option key={index} value={item}>
                    {item}
                </option>
            ))}
        </select>
        <br/>
        <label htmlFor="language">
           Select item  :
        </label>
        <select
            className="ddfor-item"
            value={selecteditem}
            onChange={(e) => setSelectedItem(e.target.value)}>
            <option value="" disabled >Select an option</option>
            {item_list.map((item, index) => (
                <option key={index} value={item}>
                    {item}
                </option>
            ))}
        </select>
        <button className="show-graph" onClick={handleYearSubmit} disabled={isButtonDisabled}>
            View
        </button>
        <br/>
        <br/>
        {showInputs && (
            <div className='graph'>
                <BarGraph
                    data_budget={data_budget}
                    data_actual={data_actual}
                    data_year={data_year}
                />
            </div>
        )}
    </div>
    </>
  )
}