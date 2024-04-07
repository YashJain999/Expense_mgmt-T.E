import React, { useState } from 'react';
import BarGraph from './BarGraph';
import LineGraphs from './LineGraphs';
import PieGraph from './PieGraph';
import '../assets/css/Graphs.css';

function Graph({ isOffcanvasOpen }) {
    const [selectedOption, setSelectedOption] = useState('');
    const AppStyle = {
      position: "relative",
      top: "-150px",
      left: isOffcanvasOpen ? '0px' : '0%',
      width: isOffcanvasOpen ? 'calc(100% - 345px)' : '100%',
      transition: 'all 0.5s ease',
      zIndex: 1000,
    };
  
    // Function to handle user selection
    const handleOptionSelect = (option) => {
      setSelectedOption(option);
    };
  
    return (
      <div className='container p-2 mw-5' style={AppStyle}>
        <div className="graph-header-g">
          <div className="buttons-container-g">
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
        <br /><br /><br /><br/><br/>    
        {selectedOption === 'bar' && <BarGraph />}
        {selectedOption === 'line' && <LineGraphs />}
        {selectedOption === 'pie' && <PieGraph />}
      </div>
    );
  }
  
  export default Graph;
// import React from 'react';
// import '../assets/css/Prediction.css'; 

// const Graph = (isOffcanvasOpen) => {
//   const AppStyle = {
//           position: "relative",
//           top: "-100px",
//           left: isOffcanvasOpen ? '0px' : '0%',
//           width: isOffcanvasOpen ? 'calc(100% - 60px)' : '100%',
//           transition: 'all 0.5s ease',
//           zIndex: 1000,
//         };
//   return (
//     <div className='container p-2 mw-5' style={AppStyle}>
//     <div className='table'>
//     <label className='t1'>Analyasis</label>
//     <iframe title="budget_analysis" width="1140" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=19eb2046-c49e-439d-bcd0-f4ebf73f0ed3&autoAuth=true&embeddedDemo=true" frameborder="0" allowFullScreen="true"></iframe>      
//     </div>
//     </div>
//   );
// };

// export default Graph;
