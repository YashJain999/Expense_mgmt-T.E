import "./App.css";
import { Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Login from "./components/Login";
import RegistrationForm from "./components/RegistrationForm";
import PasswordReset from "./components/PasswordReset";
import Home from "./components/Home";
import PrincipalDashboard from "./components/PrincipalDashboard";

function App() {
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(true);
  // const closeOffcanvas = () => {
  //   setIsOffcanvasOpen(false);
  // };
  const toggleOffcanvas = () => {
    setIsOffcanvasOpen(!isOffcanvasOpen);
  };

  return (
    <>
      <div className="main-container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/password-reset" element={<PasswordReset />} />
          {/* <Route exact path="/home/:username/*" element={<Home isOffcanvasOpen={isOffcanvasOpen} />} />
          <Route path="/principal" element={<PrincipalDashboard/>} /> */}
          <Route
            exact path="/home/:username/*"
            element={
              <Home
                isOffcanvasOpen={isOffcanvasOpen}
                // closeOffcanvas={closeOffcanvas}
                toggleOffcanvas={toggleOffcanvas}
              />
            }
          />
          {/* <Route exact path="/home/:username/*"
            element={<Home isOffcanvasOpen={isOffcanvasOpen} closeOffcanvas={closeOffcanvas} toggleOffcanvas={toggleOffcanvas}/>}
          />
          <Route  path="/principal/:username"
            element={<PrincipalDashboard isOffcanvasOpen={isOffcanvasOpen} closeOffcanvas={closeOffcanvas} toggleOffcanvas={toggleOffcanvas}/>}
          /> */}
        </Routes>
      </div>
    </>
  );
}

export default App;