// src/RegistrationForm.js
import React, { useState } from 'react';
import './Forget.css'; 

function RegistrationForm() {
  const [formData, setFormData] = useState({
    email: '',
    Passcode: '',
    new:'',
    confirm:'',

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
    <div>
     
      <h2>Forget Password Page</h2>
      
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
          <button1 type="verify">Verify E-mail</button1>
        </div>
        <br></br>
        
        <div>
          <label>Passcode:</label>
          <input
            // type="password"
            type="text"
            name="Passcode"
            value={formData.Passcode}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button1 type="verify">Verify Passcode</button1>
        </div>
        <br></br>
        
        <div>
        <label>New Password:</label>
          <input
            // type="password"
            type="password"
            name="new"
            value={formData.new}
            onChange={handleChange}
            required
          />
        
        </div>
        <div>
        <label>Confirm Password:</label>
          <input
            // type="password"
            type="password"
            name="confirm"
            value={formData.confirm}
            onChange={handleChange}
            required
          />
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
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
    </>
  );
}

export default RegistrationForm;
