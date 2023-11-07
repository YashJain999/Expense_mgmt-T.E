import React from 'react'

const Budget = ({isOffcanvasOpen}) => {
  const AppStyle = {
    position:"relative",
    top:"300px",
    left : isOffcanvasOpen ? '260px': '0%'  ,
    width: isOffcanvasOpen ? 'calc(100% - 260px)': '100%'  ,
    transition: 'all 0.5s ease',
    zIndex: 1000,
  }; 
  return (
        <h2 style={AppStyle}>Budget Section</h2>
  )
}

export default Budget
