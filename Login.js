import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Icon } from 'react-icons-kit'
import {eyeOff} from 'react-icons-kit/feather/eyeOff'
import {eye} from 'react-icons-kit/feather/eye'
// import { FaPlus } from "react-icons-kit/feather/fa6";
import { FaFile } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

import axios from 'axios';
import '../assets/css/login.css';

function Login() {

  const[type , setType] =useState('password');
  const[icon, setIcon] =useState(eyeOff);
  const handleToggle=()=>{
    if(type=='password'){
      setIcon(eye);
      setType('text');
    }
    else{
      setIcon(eyeOff);
      setType('password');
    }
  }
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
        const responsedata=response.data;  
        if (responsedata['code'] === '10') {
          window.alert('Login successful');
          if (responsedata['u_desig'] === 'HOD'){
            // navigate(`/home/${username}/${responsedata['u_dep']}`);
            navigate(`/home/${username}/${responsedata['u_dep']}`,{state:{desig:responsedata['u_desig']}});
          }
          else if (responsedata['u_desig'] === 'Principal'){
            // navigate(`/principal`);
            navigate(`/home/${username}`,{state:{desig:responsedata["u_desig"]}});
          }
        } 
        else if (responsedata['code'] === '20') {
          window.alert('Incorrect Password');
        } 
        else if (responsedata['code'] === '30'){
          window.alert('Incorrect User Email');
        }
        else if (responsedata['code'] === '40'){
          window.alert('User Not Found');
        }
      } 
      catch (error) {
        console.error('Error:', error);
        window.alert('Invalid User Email');
      }
    };
    return (
    <div className="login-app">
      <span id="logo">LABTRACKER</span>
      <span id="logo-desc">
        LAB INVENTORY & <br />
        EXPENSES MANAGER.
      </span>
      <div className="containerlog glass">
        <div className="login-container">
          <h3>Login</h3>
          <form className="login-form" onSubmit={handleLogin} >
            <div className="input-box-username">
              <input type="username" name="username" placeholder="Email" id="Username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
              
              <br />
              <br />
            </div>
            <div className="input-box-password">
              <input type={type} name="password" placeholder="Password" id="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <span onClick={handleToggle}className='icon'><Icon icon={icon} size={30}></Icon></span>
          
              <br />
              <br />
              <br />
              <br />
            </div>
            
            <button type="submit" >Submit</button>
            <br />
            <br />
            <div id="opt">
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
