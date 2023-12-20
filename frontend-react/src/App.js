import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Bills from "./components/Bills";
import CentralDeadStock from "./components/CentralDeadStock";
import EnterBudget from "./components/EnterBudget";
import Feedback from "./components/Feedback";
import Purchase from "./components/Purchase";
import Quotation from "./components/Quotation";
import UpdateFinancialYear from "./components/UpdateFinancialYear";
import UploadBudget from "./components/UploadBudget";
import ViewBudget from "./components/ViewBudget";
import Budget from "./components/Budget";
// import RegistrationForm from "./components/RegistrationForm";
// import PasswordReset from "./components/PasswordReset";
// import LoginPage from "./pages/LoginPage/LoginPage";

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
          <Navbar title='LabTracker' isOffcanvasOpen={isOffcanvasOpen} toggleOffcanvas={toggleOffcanvas}/>
          <div className="app">
              <Sidebar isOffcanvasOpen={isOffcanvasOpen} closeOffcanvas={closeOffcanvas}/>
          </div>
          <Routes>
            {/* <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/password-reset" element={<PasswordReset />} /> */}
            <Route
              exact
              path="/budget"
              element={<Budget isOffcanvasOpen={isOffcanvasOpen} />}
            ></Route>
            <Route
              exact
              path="/budget/enterbudget"
              element={<EnterBudget isOffcanvasOpen={isOffcanvasOpen} />}
            ></Route>
            <Route
              exact
              path="/budget/viewbudget"
              element={<ViewBudget isOffcanvasOpen={isOffcanvasOpen} />}
            ></Route>
            <Route
              exact
              path="/budget/uploadbudget"
              element={<UploadBudget isOffcanvasOpen={isOffcanvasOpen} />}
            ></Route>
            <Route
              exact
              path="/budget/updatefinancialyear"
              element={
                <UpdateFinancialYear isOffcanvasOpen={isOffcanvasOpen} />
              }
            ></Route>
            <Route
              exact
              path="/quotation"
              element={<Quotation isOffcanvasOpen={isOffcanvasOpen} />}
            ></Route>
            <Route
              exact
              path="/purchase"
              element={<Purchase isOffcanvasOpen={isOffcanvasOpen} />}
            ></Route>
            <Route
              exact
              path="/bills"
              element={<Bills isOffcanvasOpen={isOffcanvasOpen} />}
            ></Route>
            <Route
              exact
              path="/centraldeadstock"
              element={<CentralDeadStock isOffcanvasOpen={isOffcanvasOpen} />}
            ></Route>
            <Route
              exact
              path="/feedback"
              element={<Feedback isOffcanvasOpen={isOffcanvasOpen} />}
            ></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

/* <div>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<RegistrationForm />} /> 
              <Route path='/password-reset' element={<PasswordReset />} />
            </div> */
