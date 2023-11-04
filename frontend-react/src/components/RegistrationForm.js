import React, { useState } from 'react';
import './RegistrationForm.css';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    email: '',
    Password: '',
    designation: '',
    Department: '',
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
    <div className="App">
      <div className="registration-container">
        <h1>LAB TRACKER</h1>
        <div className="registration-form">
          <div className='header'></div>
          <h2>Registration Form</h2>
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
              <label>Department:</label>
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
                <option value="Select Department"></option>
                <option value="Engineering">Engineering</option>
                <option value="Management">Management</option>
                <option value="Design">Design</option>
              </select>
            </div>
            <br></br>
            <div>
              <button type="submit">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;
