// import React from "react";
// // import "../../src/App.css" 
// // import { useParams } from "react-router-dom";
// import { Routes, Route, useLocation } from "react-router-dom";
// import { useState } from "react";
// import Navbar from "./Navbar";
// import Sidebar from "./Sidebar";
// import Bills from "./Bills";
// import Budget from "./Budget";
// import Quotation from "./Quotation";
// import Purchase from "./Purchase";
// import CentralDeadStock from "./CentralDeadStock";
// import Feedback from "./Feedback";
// import EnterBudget from "./EnterBudget";
// import UploadBudget from "./UploadBudget";
// import ViewBudget from "./ViewBudget";
// import UpdateFinancialYear from "./UpdateFinancialYear";
// import PrincipalDashboard from "./PrincipalDashboard";
// import PrincipalQuotation from "./PrincipalQuotation";
// import Graph from "./Graph";
// import Prediction from "./Prediction";	
// import UploadQuotation from './UploadQuotation';
// import BgImage from '../assets/images/temp.png'


// function Home() {
//   const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(true);
//   const closeOffcanvas = () => {
//     setIsOffcanvasOpen(false);
//   };
//   const toggleOffcanvas = () => {
//     setIsOffcanvasOpen(!isOffcanvasOpen);
//   };
//   const AppStyle = {
//     position: "relative",
//     // top: "200px",
//     left: isOffcanvasOpen ? "130px" : "0%",
//     width: isOffcanvasOpen ? "calc(100% - 130px)" : "100%",
//     transition: "all 0.5s ease",
//     // zIndex: 1000,
//     // backgroundImage: `url(${BgImage})`,
//     // backgroundRepeat: "no-repeat",
//     // // backgroundAttachment: "fixed", 
//     // backgroundSize: "100% 100vh"
//     // background: "black"
//   };

//   const location = useLocation();
//   console.log(location);
//   return (
//     <div>
//       <div className="container p-2 w-100 h-100" style={AppStyle}>
//         {window.location.pathname !== "/" &&
//           window.location.pathname !== "/login" &&
//           window.location.pathname !== "/register" &&
//           window.location.pathname !== "/password-reset" && (
//             <>
//               <Navbar
//                 title="LabTracker"
//                 isOffcanvasOpen={isOffcanvasOpen}
//                 toggleOffcanvas={toggleOffcanvas}
//               />
//               <div className="app">
//                 <Sidebar
//                   isOffcanvasOpen={isOffcanvasOpen}
//                   toggleOffcanvas={toggleOffcanvas}
//                 />
//               </div>
//             </>
//           )}
//         <div className="w-100 h-100" style={{ marginTop: "100px" }}>
//           <Routes>
//             <Route
//               exact
//               path="/budget"
//               element={<Budget isOffcanvasOpen={isOffcanvasOpen} />}
//             ></Route>
//             <Route
//               exact
//               path="/budget/enterbudget"
//               element={<EnterBudget isOffcanvasOpen={isOffcanvasOpen} />}
//             ></Route>
//             <Route
//               exact
//               path="/budget/viewbudget"
//               element={<ViewBudget isOffcanvasOpen={isOffcanvasOpen} />}
//             ></Route>
//             <Route
//               exact
//               path="/budget/uploadbudget"
//               element={<UploadBudget isOffcanvasOpen={isOffcanvasOpen} />}
//             ></Route>
//             <Route
//               exact
//               path="/budget/updatefinancialyear"
//               element={<UpdateFinancialYear isOffcanvasOpen={isOffcanvasOpen} />}
//             ></Route>
//             <Route
//               exact
//               path="/budget/graphs"
//               element={<Graph isOffcanvasOpen={isOffcanvasOpen} />}
//             ></Route>
// 	    <Route
//             exact
//             path="/budget/prediction"
//             element={<Prediction isOffcanvasOpen={isOffcanvasOpen} />}
//           ></Route>
//             <Route
//               exact
//               path="/quotation"
//               element={<Quotation isOffcanvasOpen={isOffcanvasOpen} />}
//             ></Route>
//             <Route
//               exact
//               path="/quotation/uploadquotation"
//               element={<UploadQuotation isOffcanvasOpen={isOffcanvasOpen} />}
//             ></Route>
//             <Route
//               exact
//               path="/purchase"
//               element={<Purchase isOffcanvasOpen={isOffcanvasOpen} />}
//             ></Route>
//             <Route
//               exact
//               path="/bills"
//               element={<Bills isOffcanvasOpen={isOffcanvasOpen} />}
//             ></Route>
//             <Route
//               exact
//               path="/centraldeadstock"
//               element={<CentralDeadStock isOffcanvasOpen={isOffcanvasOpen} />}
//             ></Route>
//             <Route
//               exact
//               path="/feedback"
//               element={<Feedback isOffcanvasOpen={isOffcanvasOpen} />}
//             ></Route>
//             <Route
//               exact
//               path="/principal"
//               element={
//                 <PrincipalDashboard
//                   isOffcanvasOpen={isOffcanvasOpen}
//                   toggleOffcanvas={toggleOffcanvas}
//                   closeOffcanvas={closeOffcanvas}
//                 />
//               }
//             ></Route>
//             <Route
//               exact
//               path="/principalquotation"
//               element={
//                 <PrincipalQuotation
//                   isOffcanvasOpen={isOffcanvasOpen}
//                   toggleOffcanvas={toggleOffcanvas}
//                   closeOffcanvas={closeOffcanvas}
//                 />
//               }
//             ></Route>
//           </Routes>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;

import React from "react";
// import "../../src/App.css" 
// import { useParams } from "react-router-dom";
import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Bills from "./Bills";
import Budget from "./Budget";
import Quotation from "./Quotation";
import Purchase from "./Purchase";
import CentralDeadStock from "./CentralDeadStock";
import Feedback from "./Feedback";
import EnterBudget from "./EnterBudget";
import UploadBudget from "./UploadBudget";
import ViewBudget from "./ViewBudget";
import UpdateFinancialYear from "./UpdateFinancialYear";
import PrincipalDashboard from "./PrincipalDashboard";
import PrincipalQuotation from "./PrincipalQuotation";
import Graph from "./Graph";
import Prediction from "./Prediction";	
import UploadQuotation from './UploadQuotation';
import BgImage from '../assets/images/temp.png'


function Home() {
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(true);
  const closeOffcanvas = () => {
    setIsOffcanvasOpen(false);
  };
  const toggleOffcanvas = () => {
    setIsOffcanvasOpen(!isOffcanvasOpen);
  };
  const AppStyle = {
    position: "relative",
    // top: "200px",
    left: isOffcanvasOpen ? "130px" : "0%",
    width: isOffcanvasOpen ? "calc(100% - 130px)" : "100%",
    transition: "all 0.5s ease",
    // zIndex: 1000,
    // backgroundImage: `url(${BgImage})`,
    // backgroundRepeat: "no-repeat",
    // // backgroundAttachment: "fixed", 
    // backgroundSize: "100% 100vh"
    // background: "black"
  };

  const location = useLocation();
  console.log(location);
  return (
    <div>
      <div className="container p-2 w-100 h-100" style={AppStyle}>
        {window.location.pathname !== "/" &&
          window.location.pathname !== "/login" &&
          window.location.pathname !== "/register" &&
          window.location.pathname !== "/password-reset" && (
            <>
              <Navbar
                title="LabTracker"
                isOffcanvasOpen={isOffcanvasOpen}
                toggleOffcanvas={toggleOffcanvas}
              />
              <div className="app">
                <Sidebar
                  isOffcanvasOpen={isOffcanvasOpen}
                  toggleOffcanvas={toggleOffcanvas}
                />
              </div>
            </>
          )}
        <div className="w-100 h-100" style={{ marginTop: "100px" }}>
          <Routes>
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
              element={<UpdateFinancialYear isOffcanvasOpen={isOffcanvasOpen} />}
            ></Route>
            <Route
              exact
              path="/budget/graphs"
              element={<Graph isOffcanvasOpen={isOffcanvasOpen} />}
            ></Route>
	    <Route
            exact
            path="/budget/prediction"
            element={<Prediction isOffcanvasOpen={isOffcanvasOpen} />}
          ></Route>
            <Route
              exact
              path="/quotation"
              element={<Quotation isOffcanvasOpen={isOffcanvasOpen} />}
            ></Route>
            <Route
              exact
              path="/quotation/uploadquotation"
              element={<UploadQuotation isOffcanvasOpen={isOffcanvasOpen} />}
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
            <Route
              exact
              path="/principalbudget"
              element={
                <PrincipalDashboard
                  isOffcanvasOpen={isOffcanvasOpen}
                  toggleOffcanvas={toggleOffcanvas}
                  closeOffcanvas={closeOffcanvas}
                />
              }
            ></Route>
            <Route
              exact
              path="/principalquotation"
              element={
                <PrincipalQuotation
                  isOffcanvasOpen={isOffcanvasOpen}
                  toggleOffcanvas={toggleOffcanvas}
                  closeOffcanvas={closeOffcanvas}
                />
              }
            ></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Home;