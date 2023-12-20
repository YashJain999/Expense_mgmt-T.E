import React from "react";
// import 'D:/Yash/React/TE-College Project/Expense_mgmt-T.E/frontend-react/src/App.css';
import classes from "./Login.module.css";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className={classes.loginmaindiv}>
      <span id={classes.logo}>LABTRACKER</span>
      <span id={classes.logodesc}>
        LAB INVENTORY & <br />
        EXPENSES MANAGER.
      </span>
      <div className={`${classes.container} ${classes.glass}`}>
        <div className={classes.logincontainer}>
          <h3>Login</h3>
          <form className={classes.loginform} action="#" method="post">
            <div className={classes.inputbox}>
              <span className={classes.icon}>
                <i className="fa-solid fa-user"></i>
              </span>
              <input
                type="text"
                name="username"
                placeholder="Email"
                id="Username"
                required
              />{" "}
              <br />
              <br />
            </div>
            <div className={classes.inputbox}>
              <span className={classes.icon}>
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
