import React, { useState } from 'react';
import Cumulative from './Cumulative';
import Dynamic from './Dynamic';
import '../assets/css/BudgetComponent.css';

function ViewBudget({ isOffcanvasOpen }) {
  const [selectedOption, setSelectedOption] = useState('');
  const AppStyle = {
    position: "relative",
    top: "-150px",
    left: isOffcanvasOpen ? '0px' : '0%',
    width: isOffcanvasOpen ? 'calc(100% - 345px)' : '100%',
    transition: 'all 0.5s ease',
    zIndex: 999,
  };

  // Function to handle user selection
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className='container p-2 mw-5' style={AppStyle}>
      <div className="header">
        <div className="buttons-container">
        <button 
            className={`button ${selectedOption === 'cumulative' ? 'selected' : ''}`} 
            onClick={() => handleOptionSelect('cumulative')}
          >
            Cumulative Budget
          </button>
          <button 
            className={`button ${selectedOption === 'dynamic' ? 'selected' : ''}`} 
            onClick={() => handleOptionSelect('dynamic')}
          >
            Dynamic Budget
          </button>
        </div>
      </div>
      <br /><br /><br />
      {selectedOption === 'cumulative' && <Cumulative />}
      {selectedOption === 'dynamic' && <Dynamic />}
    </div>
  );
}

export default ViewBudget;
