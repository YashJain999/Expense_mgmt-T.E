import React from 'react';
import { useParams } from 'react-router-dom';

function Home({isOffcanvasOpen}) {
    const AppStyle = {
        position:"relative",
        top:"200px",
        left : isOffcanvasOpen ? '130px': '0%'  ,
        width: isOffcanvasOpen ? 'calc(100% - 260px)': '100%'  ,
        transition: 'all 0.5s ease',
        zIndex: 1000,
      };
    const { username } = useParams();
    return (
        <>
            <div className='container p-2 mw-5' style={AppStyle}>
            <h2 >Home Component<br/> User's Email: {username}</h2>
            </div>
        </>
    )
}

export default Home;