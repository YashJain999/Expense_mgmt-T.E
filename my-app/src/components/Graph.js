import React, { useState } from 'react';
import BarGraph from './BarGraph';
import LineGraphs from './LineGraphs';
import PieGraph from './PieGraph';
import '../assets/css/Graphs.css';

function Graph() {
    const [selectedOption, setSelectedOption] = useState('');
    // Function to handle user selection
    const handleOptionSelect = (option) => {
      setSelectedOption(option);
    };
  
    return (
      <div className='w-100 h-100 p-2'>
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
            <button 
              className={`button ${selectedOption === 'pie' ? 'selected' : ''}`} 
              onClick={() => handleOptionSelect('pie')}
            >
              Pie Graph
            </button>
          </div>
        </div>   
        {selectedOption === 'bar' && <BarGraph />}
        {selectedOption === 'line' && <LineGraphs />}
        {selectedOption === 'pie' && <PieGraph />}
      </div>
    );
  }
  
  export default Graph;