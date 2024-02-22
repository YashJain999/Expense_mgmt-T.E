import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/RegistrationForm.css'; 

function CreateUser() {
  const [userData, setUserData] = useState({
    u_email: '',
    u_pass: '',
    u_desig: '',
    u_dep: '',
  });
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(userData.u_pass)) {
      alert('Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)');
      return;
    }

    // Email domain validation
    if (!userData.u_email.endsWith('@apsit.edu.in')) {
      alert('Email domain should be @apsit.edu.in');
      return;
    }
    try {
      const response = await axios.post('http://127.0.0.1:8000/create-user/', {
        u_email: userData.u_email,
        u_pass: userData.u_pass,
        u_desig: userData.u_desig,
        u_dep: userData.u_dep,
      });
      if (response.status === 201) {
        window.alert('User created successfully');
        navigate(`/`);
      } 
      if (response.status === 400) {
        window.alert('Email already exists');
      }
    } catch (error) {
      console.error('Error:', error);
      window.alert('Failed to create user');
    }
  };
  
  return (
    <>
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
            name="u_email"
            value={userData.u_email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="u_pass"
            value={userData.u_pass}
            onChange={handleChange}
            required
          />
        </div>
        <div>
        <label>Designation:</label>
          <select
            name="u_desig"
            value={userData.u_desig}
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
            <option value="HOD">HOD</option>
            <option value="staff">Staff</option>
            <option value="Principal">Principal</option>
          </select>
        </div>
        {/* Conditionally render the department field */}
        {userData.u_desig !== 'Principal' && (
          <div>
            <label>Deparment:</label>
            <select
              name="u_dep"
              value={userData.u_dep}
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
              <option></option>
              <option value="IT">IT</option>
              <option value="CS">CS</option>
              <option value="DS">DS</option>
              <option value="AIML">AIML</option>
              <option value="CIVIL">CIVIL</option>
              <option value="MEC">MEC</option>
            </select>
          </div>
        )}
        <br></br>
        <div id="fg">
              <Link to="/">goto login</Link>
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
        </div>
      </div>
    </div>
    </>
  );
}

export default CreateUser;