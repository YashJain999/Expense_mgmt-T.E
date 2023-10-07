// src/App.js
import React from 'react';
import './App.css';
import RegistrationForm from './RegistrationForm';

function App() {
  return (
    <>
    <div className="App">
      <div className="registration-container">
        <h1>LAB TRACKER</h1>
        <div className="registration-form">
          <div className='header'></div>
          <RegistrationForm />
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
