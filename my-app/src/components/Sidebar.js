import React, { useState } from "react";
import { NavLink, useParams, useLocation } from "react-router-dom";
import "../assets/css/Sidebar.css";
import "../../src/App.css";
import { text } from "@fortawesome/fontawesome-svg-core";

export default function Sidebar({ isOffcanvasOpen, toggleOffcanvas }) {
  const { username, u_dept, u_desig } = useParams();
  const location = useLocation();

  const NavLinkStyle = {
    textDecoration: 'none'
  };

  // hod budget section
  const [shouldShowBudget, setShouldShowBudget] = useState([]);
  const [isBudgetListVisible, setIsBudgetListVisible] = useState(false);
  const toggleBudgetList = () => {
    const buttonObject1 = [
      { text: "Enter Budget", path: `/home/${username}/${u_dept}/budget/enterbudget` },
      { text: "View Budget", path: `/home/${username}/${u_dept}/budget/viewbudget` },
      { text: "Upload Budget", path: `/home/${username}/${u_dept}/budget/uploadbudget` },
      { text: "Update Financial Year", path: `/home/${username}/${u_dept}/budget/updatefinancialyear` },
      { text: "Budget Analysis", path: `/home/${username}/${u_dept}/budget/graphs` },
      { text: "Prediction Analysis", path: `/home/${username}/${u_dept}/budget/prediction` },
    ];
    setShouldShowBudget(buttonObject1);
    setIsBudgetListVisible(!isBudgetListVisible);
  };

  //hod quotation section
  const [shouldShowQuotation, setShouldShowQuotation] = useState([]);
  const [isQuotationListVisible, setIsQuotationListVisible] = useState(false);
  const toggleQuotationList = () => {
    const buttonObject2 = [
      { text: "Upload Quotation", path: `/home/${username}/${u_dept}/quotation/uploadquotation` },
      { text: "Q.B2", path: `/home/${username}/${u_dept}/quotation/reviewquotation` },
    ];
    setShouldShowQuotation(buttonObject2);
    setIsQuotationListVisible(!isQuotationListVisible);
  };

  // hod purchase section
  const [shouldShowPurchase, setShouldShowPurchase] = useState([]);
  const [isPurchaseListVisible, setIsPurchaseListVisible] = useState(false);
  const togglePurchaseList = () => {
    const buttonObject3 = [
      { text: "p.B1", path: `/home/${username}/${u_dept}/purchase/p.b1` },
      { text: "p.B2", path: `/home/${username}/${u_dept}/purchase/p.b2` },
    ];
    setShouldShowPurchase(buttonObject3);
    setIsPurchaseListVisible(!isPurchaseListVisible);
  };

  //hod bills section
  const [shouldShowBills, setShouldShowBills] = useState([]);
  const [isBillsListVisible, setIsBillsListVisible] = useState(false);
  const toggleBillsList = () => {
    const buttonObject4 = [
      { text: "b.B1", path: `/home/${username}/${u_dept}/bills/b.b1` },
      { text: "b.B2", path: `/home/${username}/${u_dept}/bills/b.b2` },
    ];
    setShouldShowBills(buttonObject4);
    setIsBillsListVisible(!isBillsListVisible);
  };

  // hod showcds section
  const [shouldShowCDS, setShouldShowCDS] = useState([]);
  const [isCDSListVisible, setIsCDSListVisible] = useState(false);
  const toggleCDSList = () => {
    const buttonObject5 = [
      { text: "cds.B1", path: `/home/${username}/${u_dept}/centraldeadstock/centraldeadstock.b1` },
      { text: "cds.B2", path: `/home/${username}/${u_dept}/centraldeadstock/centraldeadstock.b2` },
    ];
    setShouldShowCDS(buttonObject5);
    setIsCDSListVisible(!isCDSListVisible);
  };

  // hod feedback section
  const [shouldShowFeedback, setShouldShowFeedback] = useState([]);
  const [isFeedbackListVisible, setIsFeedbackListVisible] = useState(false);
  const toggleFeedbackList = () => {
    const buttonObject6 = [
      { text: "fdb.B1", path: `/home/${username}/${u_dept}/feedback/feedback.b1` },
      { text: "fdb.B2", path: `/home/${username}/${u_dept}/feedback/feedback.b2` },
    ];
    setShouldShowFeedback(buttonObject6);
    setIsFeedbackListVisible(!isFeedbackListVisible);
  };

  // // principal section
  // const [shouldShowPrincipalBudget, setShouldShowPrincipalBudget] = useState([]);
  // const [isPrincipalBudgetListVisible, setIsPrincipalBudgetListVisible] = useState(false);
  // const togglePrincipalBudgetList = () => {
  //   const buttonObject = [
  //     { text: "Upload Principal Budget", path: `/home/${username}/${u_desig}/principalbudget` },
  //   ];
  //   setShouldShowPrincipalBudget(buttonObject);
  //   setIsPrincipalBudgetListVisible(!isPrincipalBudgetListVisible);
  // };

  const [shouldShowList, setShouldShowList] = useState(true);
  const toggleList = () => setShouldShowList(!shouldShowList);

  const shouldRenderButtons = location.state.desig === "HOD" && shouldShowList;

  const buttons = [
    {
      path: `/home/${username}/${u_dept}/budget`,
      text: "Budget",
      icon: "fa-indian-rupee-sign",
      left: "10px",
      onClick: toggleBudgetList,
    },
    {
      path: `/home/${username}/${u_dept}/quotation`,
      text: "Quotation",
      icon: "fa-money-check-dollar",
      left: "-10px",
      onClick: toggleQuotationList,
    },
    {
      path: `/home/${username}/${u_dept}/purchase`,
      text: "Purchase",
      icon: "fa-shopping-cart",
      left: "5px",
      onClick: togglePurchaseList,
    },
    {
      path: `/home/${username}/${u_dept}/bills`,
      text: "Bills",
      icon: "fa-file-invoice-dollar",
      left: "0px",
      onClick: toggleBillsList,
    },
    {
      path: `/home/${username}/${u_dept}/centraldeadstock`,
      text: "Central Dead Stock",
      icon: "fa-box-open",
      left: "5px",
      onClick: toggleCDSList,
    },
    {
      path: `/home/${username}/${u_dept}/feedback`,
      text: "Feedback",
      icon: "fa-message",
      onClick: toggleFeedbackList,
    },
    // {
    //   path: `/home/${username}/principalbudget`,
    //   text: "Budget",
    //   icon: "fa-money-check-dollar",
    //   onClick: togglePrincipalBudgetList,
    // },

  ];

  const innerButtonsDetails = [
    {
      onCondition: location.state.desig === "HOD" && isBudgetListVisible,
      subButtons: shouldShowBudget,
      text: "Budget",
      icon: "fa-indian-rupee-sign",
      onClick: () => { toggleBudgetList(); toggleList(); },
    },
    {
      onCondition: location.state.desig === "HOD" && isQuotationListVisible,
      subButtons: shouldShowQuotation,
      text: "Quotation",
      icon: "fa-money-check-dollar",
      onClick: () => { toggleQuotationList(); toggleList(); },
    },
    {
      onCondition: location.state.desig === "HOD" && isPurchaseListVisible,
      subButtons: shouldShowPurchase,
      text: "Purchase",
      icon: "fa-shopping-cart",
      onClick: () => { togglePurchaseList(); toggleList(); },
    },
    {
      onCondition: location.state.desig === "HOD" && isBillsListVisible,
      subButtons: shouldShowBills,
      text: "Bills",
      icon: "fa-file-invoice-dollar",
      onClick: () => { toggleBillsList(); toggleList(); },
    },
    {
      onCondition: location.state.desig === "HOD" && isCDSListVisible,
      subButtons: shouldShowCDS,
      text: "Central Dead Stock",
      icon: "fa-box-open",
      onClick: () => { toggleCDSList(); toggleList(); },
    },
    {
      onCondition: location.state.desig === "HOD" && isFeedbackListVisible,
      subButtons: shouldShowFeedback,
      text: "Feedback",
      icon: "fa-message",
      onClick: () => { toggleFeedbackList(); toggleList(); },
    },
    //  {
    //   onCondition: location.state.desig === "Principal" && isPrincipalBudgetListVisible,
    //   subButtons: shouldShowPrincipalBudget,
    //   text: "View Uploaded Budget",
    //   icon: "fa-money-check-dollar",
    //   onClick: () => { togglePrincipalBudgetList(); },
    // },
  ];

  return (
    <>
      <div
        className="offcanvas offcanvas-start transform-x-0 text-bg-dark border-bottom show overflow-hidden"
        data-bs-backdrop="false"
        data-bs-target="#offcanvasDark"
        data-bs-theme="dark"
        tabIndex="-1"
        id="offcanvasDark"
        aria-labelledby="offcanvasDarkLabel"
        style={{
          width: isOffcanvasOpen ? "260px" : "72px",
          left: isOffcanvasOpen ? "0%" : "0px",
          transform: "translateX(0%)",
        }}
      >
        <div className="w-100 offcanvas-header overflow-hidden">
          {isOffcanvasOpen ? (
            <>
              <h5 className="offcanvas-title" id="offcanvasDarkLabel">
                <i className="pt-1 fa-solid fa-cart-flatbed p-2 h4"></i>Labtracker
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={toggleOffcanvas}
                data-bs-dismiss="offcanvas"
                data-bs-backdrop="false"
                data-bs-target="#offcanvasDark"
                aria-label="Close"
              ></button>
            </>
          ) : (
            <div
              className="w-100 offcanvas-title overflow-hidden"
              id="offcanvasDarkLabel"
            >
              <i className="pt-1 fa-solid fa-cart-flatbed h3"></i>
            </div>
          )}
        </div>
        <div className="w-100 offcanvas-body">
          <div className="w-100 h-100">
            {shouldRenderButtons && (
              <ul className="w-100 h-100 list-group list-group-flush">
                {buttons.map((button) => (
                  <li
                    className={`w-100 justify-content-center list-group-item list-unstyled ${!isOffcanvasOpen && 'px-0'}`}
                    key={button.text}
                    style={{ border: 'none' }}
                  >
                    <div className={`w-100 h-100 submenu-item ${!isOffcanvasOpen && 'px-0'}`}>
                      <NavLink
                        to={button.path}
                        className="isActive w-100 h-100"
                        style={
                          "isActive"
                            ? {
                                ...NavLinkStyle,
                                color: "red",
                              }
                            : NavLinkStyle
                        }
                        state={{ desig: location.state.desig }}
                      >
                        <button
                          type="button"
                          className={`w-100 h-100 btn ${isOffcanvasOpen ? 'p-2 text-left' : 'py-2 px-0 text-center'}`}
                          onClick={() => {
                            if (button.onClick) {
                              button.onClick();
                              toggleList();
                              if (!isOffcanvasOpen) {
                                toggleOffcanvas();
                              }
                            }
                          }}
                        >
                          <div className={`w-100 h-100 d-flex flex-row align-items-center`}>
                            <i
                              className={` ${isOffcanvasOpen ? 'py-1 pe-2' : 'w-100'} h-100 fa-solid ${button.icon}`}
                              style={{ width: '20%' }}
                            ></i>
                            <div
                              className={`w-80 overflow-hidden transition-all ${
                                isOffcanvasOpen ? "ml-3" : "d-none"
                              }`}
                            >
                              {button.text}
                            </div>
                          </div>
                        </button>
                      </NavLink>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {innerButtonsDetails.map((innBtnDtl) => (
              <React.Fragment key={innBtnDtl.text}>
                {innBtnDtl['onCondition'] && (
                  <ul className="w-100 h-100 list-group list-group-flush">
                    <li
                      className={`w-100 list-group-item list-unstyled ${!isOffcanvasOpen && 'px-0'}`}
                      style={{ border: 'none' }}
                    >
                      <NavLink
                        to={`/home/${username}/${u_dept}/`}
                        className={`w-100 h-100`}
                        style={NavLinkStyle}
                        state={{ desig: location.state.desig }}
                      >
                        <button
                          type="button"
                          className={`w-100 h-100 btn ${isOffcanvasOpen ? 'p-2 text-left' : 'py-2 px-0 text-center'}`}
                          onClick={innBtnDtl.onClick}
                          style={{
                            height: isOffcanvasOpen ? "auto" : "40px",
                          }}
                        >
                          <div className={`w-100 h-100 d-flex flex-row align-items-center`}>
                            <i
                              className={` ${isOffcanvasOpen ? 'py-1 pe-2' : 'w-100'} h-100 fa-solid ${innBtnDtl.icon}`}
                              style={{ width: '20%' }}
                            ></i>
                            <div
                              className={`w-80 overflow-hidden transition-all ${
                                isOffcanvasOpen ? "ml-3" : "d-none"
                              }`}
                            >
                              {innBtnDtl.text}
                            </div>
                          </div>
                        </button>
                      </NavLink>
                    </li>
                    <div
                      className={`w-100 h-100 m-n1 pt-2 container ${isOffcanvasOpen ? "" : "d-none"}`}
                    >
                      {innBtnDtl.subButtons.map((item) => (
                        <div className="w-100 menu-scrollable pb-3" key={item.text}>
                          <li className="w-100 h-100 list-unstyled">
                            <NavLink
                              to={item.path}
                              state={{ desig: location.state.desig }}
                              className={`w-100 h-100`}
                            >
                              <button
                                type="button"
                                className="w-100 h-100 btn p-2 text-start"
                                style={{
                                  backgroundColor: location.pathname === item.path ? 'blue' : '',
                                  color: location.pathname === item.path ? 'white' : '',
                                }}
                                onClick={item.onClick}
                              >
                                <div
                                  className={`w-100 h-100 overflow-hidden transition-all ${!isOffcanvasOpen && 'text-nowrap'}`}
                                >
                                  {item.text}
                                </div>
                              </button>
                            </NavLink>
                          </li>
                        </div>
                      ))}
                    </div>
                  </ul>
                )}
              </React.Fragment>
            ))}
           {location.state.desig === "Principal" && !shouldShowList && (
             <ul className="w-100 h-100 list-group list-group-flush">
                <li className={`w-100 justify-content-center list-group-item list-unstyled  ${!isOffcanvasOpen && 'px-0'}`} style={{border: 'none'}}>
                  <NavLink
                    to={`/home/${username}/`}
                    className="isActive w-100 h-100"
                    state={{ desig: location.state.desig }}
                    style={NavLinkStyle}
                  >
                    <button
                      type="button"
                      className={`w-100 h-100 btn ${isOffcanvasOpen ? 'p-2 text-left' : 'py-2 px-0 text-center'}`}
                      style={{
                        height: isOffcanvasOpen ? "auto" : "40px",
                      }}
                      onClick={() => {
                        toggleList();
                      }}
                    >
                      <div className={`w-100 h-100 d-flex flex-row align-items-center`}>
                      <i
                    className={` ${isOffcanvasOpen ? 'py-1 pe-2' : 'w-100'} h-100 fa-solid fa-indian-rupee-sign`}
                    style={{width: '20%'}}
                    ></i>
                      <div
                                className={`w-80 overflow-hidden transition-all ${
                                  isOffcanvasOpen ? "ml-3" : "d-none"
                                }`}>
                      PrincipalDashboard
                    </div>
                    </div>
                    </button>
                  </NavLink>
                </li>
              </ul>
            )}
            {location.state.desig === "Principal" && shouldShowList && (
              <li className="list-group-item">
                <div className="submenu-item">
                  <NavLink
                    to={`/home/${username}/${u_dept}/principalbudget`}
                    state={{ desig: location.state.desig }}
                    style={NavLinkStyle}
                  >
                    <button
                      type="button"
                      className="btn"
                      onClick={() => {
                        toggleList();
                      }}
                    >
                      Uploaded Budget
                    </button>
                  </NavLink>
                </div>
              </li>
            )}
          </div>
        </div>
      </div>
    </>
  );
}