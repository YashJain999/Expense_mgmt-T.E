import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/login.css';

function Login() {
  const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
    const handleLogin = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const response = await axios.post('http://127.0.0.1:8000/login/', {
          username: username,
          password: password,
        });
        const responsedata=response.data;  
        if (responsedata['code'] === '10') {
          if (responsedata['u_desig'] === 'HOD'){
            // navigate(`/home/${username}/${responsedata['u_dep']}`);
            const u_dept = responsedata['u_dep'];
            console.log(u_dept)
            setUsername('');
            setPassword('');
            navigate(`/home/${username}/${u_dept}`,{state:{desig:responsedata['u_desig']}});

          }
          else if (responsedata['u_desig'] === 'Principal'){
            // navigate(`/principal`);
            setUsername('');
            setPassword('');
            navigate(`/home/${username}/${'principal'}`,{state:{desig:responsedata["u_desig"]}});
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
      finally{
        setLoading(false);
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
        <div className="login-container w-100 h-100">
          <h3 className='pt-4 '>Login</h3>
          <form className="w-100 h-100 login-form d-flex flex-column justify-content-start align-items-center gap-5" onSubmit={handleLogin} >
            <div className="w-100  pt-3 d-flex flex-column align-items-center" >
              <div className="form-floating input-box ">
                <input type="email" className="form-control p-3" name="username" placeholder="Email" id="Username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                <label for="Username" className='' id="usernamelabel">Email</label>
              </div>
              <br />
              <div className="form-floating input-box d-flex flex-column">
                <input type="password" className="form-control p-3" name="password" placeholder="Password" id="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <label for="Password" className='text-white fs-5' id="passwordlabel">Password</label>
              </div>
            </div>
            <div id="opt" className="d-flex justify-content-center align-items-center w-100">
              <Link to="/register" style={{ marginRight: '120px' }}>Register Now!</Link>
              <Link to="/password-reset">Forgot Password?</Link>
            </div>
            <div className="d-flex justify-content-center align-items-center w-100 mb-3">
            <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;