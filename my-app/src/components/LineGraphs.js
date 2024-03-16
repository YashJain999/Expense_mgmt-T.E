import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams } from "react-router-dom";
import Lines from './Lines';
import '../assets/css/Line.css'; 

export default function LineGraphs({isOffcanvasOpen}) {
    const [selectedYearfrom, setSelectedYearfrom] = useState('');
    const [selectedYearto, setSelectedYearto] = useState('');
    const [budgetData, setBudgetData] = useState([]);
    const [selectedprice , setSelectedprice] =useState('');
    const option = ["budgeted_amt", "actual_exp"];
    const [showInputs, setShowInputs] = useState(false);
    const { username } = useParams();
    const [item_1 ,setitem_1] = useState([]);
    const [item_2 ,setitem_2] = useState([]);
    const [item_3 ,setitem_3] = useState([]);
    const [item_4 ,setitem_4] = useState([]);
    const [item_5 ,setitem_5] = useState([]);
    const [item_6 ,setitem_6] = useState([]);
    const [item_7 ,setitem_7] = useState([]);
    const [data_year, setDataYear] = useState([]);
    const rep = selectedprice;
    const isButtonDisabled = !selectedYearfrom || !selectedYearto || !selectedprice;
    const AppStyle = {
        position:"relative",
        top:"-130px",
        left : isOffcanvasOpen ? '0px': '0%'  ,
        width: isOffcanvasOpen ? 'calc(100% - 260px)': '100%'  ,
        transition: 'all 0.5s ease',
        zIndex: 1000,
    };
    useEffect(() => {
        fetchData();
        // fetchitem();
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
        if (numYearFrom < numYearTo) {
            try {
                const response1 = await axios.post('http://localhost:8000/get_list_amount/', { selectedYearfrom ,selectedYearto,selectedprice ,username });
                setitem_1(response1.data['Item_1']);
                setitem_2(response1.data['Item_2']);
                setitem_3(response1.data['Item_3']);
                setitem_4(response1.data['Item_4']);
                setitem_5(response1.data['Item_5']);
                setitem_6(response1.data['Item_6']);
                setitem_7(response1.data['Item_7']);
                setDataYear(response1.data['data_year']);
                setShowInputs(true);
                
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
        <label htmlFor='language'className='l2'>
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
            Select one:
        </label>
        <select
            className='price'
            value={selectedprice}
            onChange={(e) => setSelectedprice(e.target.value)}>
                <option value="" disabled >Select an option</option>
                {option.map((item, index) => (
                <option key={index} value={item}>
                    {item}
                </option>
            ))}
        </select>
        <button className="show-line-graph" onClick={handleYearSubmit} disabled={isButtonDisabled}>
            View
        </button>
        <br/>
        {showInputs && (
            <div className='line-graph' >
                <Lines 
                    item_1 = {item_1}
                    item_2 = {item_2}
                    item_3 = {item_3}
                    item_4 = {item_4}
                    item_5 = {item_5}
                    item_6 = {item_6}
                    item_7 = {item_7}
                    data_year={data_year}
                    cho = {rep}
                />
            </div>
        )}
    </div>
    </>
  )
}