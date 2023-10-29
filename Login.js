import React from 'react';
import './App.css';
import './Login.css';
// import PasswordReset from './PasswordReset';
// import RegistrationForm from './RegistrationForm';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="App">
      <span id="logo">LABTRACKER</span>
      <span id="logo-desc">
        LAB INVENTORY & <br />
        EXPENSES MANAGER.
      </span>
      <div className="container glass">
        <div className="login-container">
          <h3>Login</h3>
          <form className="login-form" action="#" method="post">
            <div className="input-box">
              <span className="icon">
                <i className="fa-solid fa-user"></i>
              </span>
              <input
                type="text"
                name="username"
                placeholder="Email"
                id="Username"
                required
              />{' '}
              <br />
              <br />
            </div>
            <div className="input-box">
              <span className="icon">
                <i className="fa-solid fa-lock"></i>
              </span>
              <input
                type="password"
                name="password"
                placeholder="Password"
                id="Password"
                required
              />
              <br />
              <br />
              {/* <a id='forgetpassword' href={<PasswordReset />} >Forgot Password?</a>
              <a id='registernow' href= {<RegistrationForm />}> Register Now!</a> */}
               <Link to="/password-reset">Forgot Password?</Link>
              <Link to="/register">Register Now!</Link>
              <br />
              <br />
            </div>
            <button type="submit">Submit</button>
            <br />
            <br />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;