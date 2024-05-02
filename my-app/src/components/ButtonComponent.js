import React from 'react'

const ButtonComponent = ({ onClick, text, className }) => {
    return (
        <button className={`btn btn-primary bg-gradient w-25 rounded-5 p-2 mt-4 ${className}`} onClick={onClick}><p className='p-0 m-0 h4'>{text}</p></button>
    )
}

export default ButtonComponent