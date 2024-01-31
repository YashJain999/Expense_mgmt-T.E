import "./App.css";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import React, { useState } from 'react';
import Login from './components/Login';
import RegistrationForm from './components/RegistrationForm';
import PasswordReset from './components/PasswordReset';
import Navbar from "./components/Navbar";
import Sidebar from './components/Sidebar';
import Bills from './components/Bills';
import Budget from "./components/Budget";
import Quotation from './components/Quotation';
import Purchase from './components/Purchase';
import CentralDeadStock from "./components/CentralDeadStock";
import Feedback from "./components/Feedback";
import EnterBudget from "./components/EnterBudget";
import UploadBudget from "./components/UploadBudget";
import ViewBudget from "./components/ViewBudget";
import UpdateFinancialYear from "./components/UpdateFinancialYear";
import Home from "./components/Home";
import PrincipalDashboard from "./components/PrincipalDashboard";

function App() {
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(true);
  const closeOffcanvas = () => {
    setIsOffcanvasOpen(false);
  };
  const toggleOffcanvas = () => {
    setIsOffcanvasOpen(!isOffcanvasOpen);
  };

  return (
    <>
      <div className="main-container">
      <BrowserRouter>
      {window.location.pathname !== '/' && window.location.pathname !== '/login' && window.location.pathname !== '/register' && window.location.pathname !== '/password-reset' && (
            <>
              <Navbar title='LabTracker' isOffcanvasOpen={isOffcanvasOpen} toggleOffcanvas={toggleOffcanvas} />
              <div className="app">
                <Sidebar isOffcanvasOpen={isOffcanvasOpen} closeOffcanvas={closeOffcanvas} />
              </div>
            </>
          )}
              <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<RegistrationForm />} /> 
              <Route path='/password-reset' element={<PasswordReset />} />
              <Route exact path="/home/:username" element={<Home isOffcanvasOpen={isOffcanvasOpen}/>}></Route>
              <Route exact path="/budget" element={<Budget isOffcanvasOpen={isOffcanvasOpen}/>}></Route>
              <Route exact path="/budget/enterbudget" element={<EnterBudget  isOffcanvasOpen={isOffcanvasOpen}/>}></Route>
              <Route exact path="/budget/viewbudget" element={<ViewBudget  isOffcanvasOpen={isOffcanvasOpen}/>}></Route>
              <Route exact path="/budget/uploadbudget" element={<UploadBudget  isOffcanvasOpen={isOffcanvasOpen}/>}></Route>
              <Route exact path="/budget/updatefinancialyear" element={<UpdateFinancialYear  isOffcanvasOpen={isOffcanvasOpen}/>}></Route>
              <Route exact path="/quotation" element={<Quotation  isOffcanvasOpen={isOffcanvasOpen}/>}></Route>
              <Route exact path="/purchase" element={<Purchase  isOffcanvasOpen={isOffcanvasOpen}/>}></Route>
              <Route exact path="/bills" element={<Bills  isOffcanvasOpen={isOffcanvasOpen}/>}></Route>
              <Route exact path="/centraldeadstock" element={<CentralDeadStock  isOffcanvasOpen={isOffcanvasOpen}/>}></Route>
              <Route exact path="/feedback" element={<Feedback  isOffcanvasOpen={isOffcanvasOpen}/>}></Route>
              <Route exact path="/PrincipalDashboard" element={<PrincipalDashboard isOffcanvasOpen={isOffcanvasOpen}/>}></Route>
              </Routes>
      </BrowserRouter>
      </div>
    </>
  );
}

export default App;