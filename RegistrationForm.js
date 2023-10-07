// src/RegistrationForm.js
import React, { useState } from 'react';
import './RegistrationForm.css'; 

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    designation: '',
  });
  const [backgroundPhoto, setBackgroundPhoto] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    setBackgroundPhoto(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic, including the background photo
    console.log(formData, backgroundPhoto);
  };
  
  return (
    <>
    
   {/* <div>
      <h1>lab travker</h1>
    </div> */}
    <div>
      {/* <h1>samle</h1> */}
      <h2>Registration Form</h2>
      {/* <h3>Enter the following details</h3> */}
      <form onSubmit={handleSubmit}>
        
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            // type="text"
            name="Password"
            value={formData.Password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
        <label>Designation:</label>
          <select
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '15px',
              border: '1px solid #ccc',
              borderRadius: '3px',
            }}
          >
            <option value="Select Designation"></option>
            <option value="Engineer">D1</option>
            <option value="Manager">D2</option>
            <option value="Designer">D3</option>
          </select>
        </div>
        <div>
        <label>Deparment:</label>
          <select
            name="Department"
            value={formData.Department}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '15px',
              border: '1px solid #ccc',
              borderRadius: '3px',
            }}
          >
            <option value="Select Designation"></option>
            <option value="Engineer">D1</option>
            <option value="Manager">D2</option>
            <option value="Designer">D3</option>
          </select>
        </div>
        {/* <div>
          <label>Background Photo:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            required
          />
        </div> */}
        <br></br>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
    </>
  );
}

export default RegistrationForm;
