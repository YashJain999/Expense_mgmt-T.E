import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

 function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://127.0.0.1:8000/login/', {
          username: username,
          password: password,
        });
  
        if (response.status === 200) {
          window.alert('Login successful');
        } 
        else if (response.status === 401) {
          window.alert('Invalid credentials');
        } 
      } 
      catch (error) {
        console.error('Error:', error);
        window.alert('something');
      }
    };
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
          <form className="login-form" onSubmit={handleLogin} >
            <div className="input-box">
              <span className="icon">
                <i className="fa-solid fa-user"></i>
              </span>
                <input type="text" name="username" placeholder="Email" id="Username" value={username} onChange={(e) => setUsername(e.target.value)} required/>{' '}
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
            <button type="submit" >Submit</button>
            {/* <p>{message}</p> */}
            <br />
            <br />
            <div id="fg">
              <a href="http://localhost:3000/">Forgot Password?</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;






// import React, { useState } from 'react';
// import axios from 'axios';

// function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post('http://127.0.0.1:8000/login/', {
//         username: username,
//         password: password,
//       });

//       if (response.status === 200) {
//         setMessage('Login successful');
//       } else if (response.status === 401) {
//         setMessage('Invalid credentials');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setMessage('An error occurred while processing your request\n Invalid credentials');
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleLogin}>Login</button>
//       <p>{message}</p>
//     </div>
//   );
// }

// export default Login;
