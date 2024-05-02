import React, { useState } from 'react';
import BarGraph from './BarGraph';
import LineGraphs from './LineGraphs';
import '../assets/css/Graphs.css';

function Graph({ isOffcanvasOpen }) {
    const [selectedOption, setSelectedOption] = useState('');
    const AppStyle = {
      // position: "relative",
      // top: "-150px",
      // left: isOffcanvasOpen ? '0px' : '0%',
      // width: isOffcanvasOpen ? 'calc(100% - 345px)' : '100%',
      // transition: 'all 0.5s ease',
      // zIndex: 999,
    };
  
    // Function to handle user selection
    const handleOptionSelect = (option) => {
      setSelectedOption(option);
    };
  
    return (
      <div className='w-100 h-100 p-2' style={AppStyle}>
      <div className="header w-100 h-100">
        <div className="w-100 h-100 d-flex flex-row gap-2">
          <button 
              className={`button ${selectedOption === 'bar' ? 'selected' : ''}`} 
              onClick={() => handleOptionSelect('bar')}
            >
              Bar Graph
            </button>
            <button 
              className={`button ${selectedOption === 'line' ? 'selected' : ''}`} 
              onClick={() => handleOptionSelect('line')}
            >
              Line Graph
            </button>
          </div>
        </div>
        <br /><br /><br /><br/><br/>    
        {selectedOption === 'bar' && <BarGraph />}
        {selectedOption === 'line' && <LineGraphs />}
      </div>
    );
  }
  
  export default Graph;