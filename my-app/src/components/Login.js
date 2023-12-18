import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/login.css';

function Login() {
  const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://127.0.0.1:8000/login/', {
          username: username,
          password: password,
        });
  
        if (response.status === 200) {
          window.alert('Login successful');
          navigate(`/home/${username}`);
        } 
        else if (response.status === 401) {
          window.alert('Invalid credentials');
        } 
      } 
      catch (error) {
        console.error('Error:', error);
        window.alert('Invalid credentials');
      }
    };
    return (
    <div className="login-app">
      <span id="logo">LABTRACKER</span>
      <span id="logo-desc">
        LAB INVENTORY & <br />
        EXPENSES MANAGER.
      </span>
      <div className="container glass">
        <div className="login-container">
          <h3>Login</h3>
          <form className="login-form" onSubmit={handleLogin} >
            <div className="input-box">
              <span className="icon">
                <i className="fa-solid fa-user"></i>
              </span>
              <input type="text" name="username" placeholder="Email" id="Username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
              <br />
              <br />
            </div>
            <div className="input-box">
              <span className="icon">
                <i className="fa-solid fa-lock"></i>
              </span>
              <input type="password" name="password" placeholder="Password" id="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <br />
              <br />
              <br />
              <br />
            </div>
            {/* <Link to="/home">home</Link> */}
            <button type="submit" >Submit</button>
            <br />
            <br />
            <div id="fg">
              <Link to="/register" style={{ marginRight: '120px' }}>Register Now!</Link>
              <Link to="/password-reset">Forgot Password?</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;