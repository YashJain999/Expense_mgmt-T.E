import "./App.css";
import { Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Login from "./components/Login";
import RegistrationForm from "./components/RegistrationForm";
import PasswordReset from "./components/PasswordReset";
import Home from "./components/Home";

function App() {
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(true);
  // const closeOffcanvas = () => {
  //   setIsOffcanvasOpen(false);
  // };
  const toggleOffcanvas = () => {
    setIsOffcanvasOpen(!isOffcanvasOpen);
  };

  return (
    <div className="main-container w-100 mh-100 bg-light overflow-y-scroll" style={{ height: "100vh" }}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route exact path="/home/:username/*" element={<Home isOffcanvasOpen={isOffcanvasOpen}// closeOffcanvas={closeOffcanvas} 
          toggleOffcanvas={toggleOffcanvas} />} />
      </Routes>
    </div>
  );
}

export default App;