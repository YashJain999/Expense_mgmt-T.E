import React from 'react'

function Landing ({isOffcanvasOpen}) {
    const AppStyle = {
        position:"relative",
        top:"300px",
        left : isOffcanvasOpen ? '260px': '0%'  ,
        width: isOffcanvasOpen ? 'calc(100% - 260px)': '100%'  ,
        transition: 'all 0.5s ease',
        zIndex: 1000,
      };  
  return (
    <div className="landingcontainer" style={AppStyle}>
      <h2>Landing</h2>     
    </div>
  );
}

export default Landing;

