import "./App.css";
import { BrowserRouter,Routes,Route } from "react-router-dom";
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


function App() {
  return (
    <>
        <BrowserRouter>
        <Sidebar />
        <Navbar title='LabTracker'/>
          <Routes>
            <div>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<RegistrationForm />} /> 
              <Route path='/password-reset' element={<PasswordReset />} />
            </div>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/budget" element={<Budget />}></Route>
            <Route exact path="/quotation" element={<Quotation />}></Route>
            <Route exact path="/purchase" element={<Purchase />}></Route>
            <Route exact path="/bills" element={<Bills />}></Route>
            <Route exact path="/centraldeadstock" element={<CentralDeadStock />}></Route>
            <Route exact path="/feedback" element={<Feedback />}></Route>
            <Route exact path="/budget/enterbudget" element={<EnterBudget />}></Route>
            <Route exact path="/budget/viewbudget" element={<ViewBudget />}></Route>
            <Route exact path="/budget/uploadbudget" element={<UploadBudget />}></Route>
            <Route exact path="/budget/updatefinancialyear" element={<UpdateFinancialYear />}></Route>
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;


function Home(){
  return <h2 style={{
    position:"relative",
    height: "40vmin",
    top:"200px",
    left: "490px",
    width: "calc(100% - 560px)",
    transition: "all 0.5s ease",
  }}>Home Component</h2>
}