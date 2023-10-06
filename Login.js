import React from 'react';
import './App.css';

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
              <br />
              <br />
            </div>
            <button type="submit">Submit</button>
            <br />
            <br />
            {/* <div id="fg">
              <a href="http://moodle.apsit.org.in/moodle/login/index.php">Forgot Password?</a>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
