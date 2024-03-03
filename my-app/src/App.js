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
    <>
      <div className="main-container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/password-reset" element={<PasswordReset />} />
          <Route
            exact
            path="/home/:username/*"
            element={
              <Home
                isOffcanvasOpen={isOffcanvasOpen}
                // closeOffcanvas={closeOffcanvas}
                toggleOffcanvas={toggleOffcanvas}
              />
            }
          />
          {/* <Route
            path="/principal/:username"
            element={<PrincipalDashboard isOffcanvasOpen={isOffcanvasOpen} closeOffcanvas={closeOffcanvas} toggleOffcanvas={toggleOffcanvas}/>}
          /> */}
          {/* <Route exact path="/budget" element={<Budget isOffcanvasOpen={isOffcanvasOpen}/>}></Route>
               <Route exact path="/budget/enterbudget" element={<EnterBudget  isOffcanvasOpen={isOffcanvasOpen}/>}></Route>
                <Route exact path="/budget/viewbudget" element={<ViewBudget  isOffcanvasOpen={isOffcanvasOpen}/>}></Route>
                <Route exact path="/budget/uploadbudget" element={<UploadBudget  isOffcanvasOpen={isOffcanvasOpen}/>}></Route>
                <Route exact path="/budget/updatefinancialyear" element={<UpdateFinancialYear  isOffcanvasOpen={isOffcanvasOpen}/>}></Route>
                <Route exact path="/quotation" element={<Quotation  isOffcanvasOpen={isOffcanvasOpen}/>}></Route>
                <Route exact path="/purchase" element={<Purchase  isOffcanvasOpen={isOffcanvasOpen}/>}></Route>
                <Route exact path="/bills" element={<Bills  isOffcanvasOpen={isOffcanvasOpen}/>}></Route>
                <Route exact path="/centraldeadstock" element={<CentralDeadStock  isOffcanvasOpen={isOffcanvasOpen}/>}></Route>
                <Route exact path="/feedback" element={<Feedback  isOffcanvasOpen={isOffcanvasOpen}/>}></Route> */}
        </Routes>
      </div>
    </>
  );
}

export default App;
