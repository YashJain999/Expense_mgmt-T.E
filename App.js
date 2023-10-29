import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import RegistrationForm from './RegistrationForm';
import PasswordReset from './PasswordReset';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<RegistrationForm />} /> 
          <Route path='/password-reset' element={<PasswordReset />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



// import React from 'react';
// import './App.css';
// import RegistrationForm from './RegistrationForm';

// function App() {
//   return (
//     <>
//     <RegistrationForm />
//     {/* <div className="App">
//       <div className="registration-container">
//         <h1>LAB TRACKER</h1>
//         <div className="registration-form">
//           <div className='header'></div>
//           <RegistrationForm />
//         </div>
//       </div>
//     </div> */}
//     </>
//   );
// }

// export default App;


// // import React from 'react';
// // import ReportButton from './ReportButton';


// // class App extends React.Component {
// //   render() {
// //     return (
// //       <div>
// //         <h1>Welcome to Your App</h1>
// //         <ReportButton />
       
// //       </div>
// //     );
// //   }
// // }

// // export default App;

// import React from 'react';
// import './App.css';
// import RegistrationForm from './RegistrationForm';

// function App() {
//   return (
//     <>
//     <div className="App">
//       <div className="registration-container">
//         <h1>LAB TRACKER</h1>
//         <div className="registration-form">
//           <div className='header'></div>
//           <RegistrationForm />
//         </div>
//       </div>
//     </div>
//     </>
//   );
// }

// export default App;
