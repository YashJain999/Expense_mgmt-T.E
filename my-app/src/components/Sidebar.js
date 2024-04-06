import React, { useState } from "react";
import { NavLink, useParams, useLocation } from "react-router-dom";
import "../assets/css/Sidebar.css";
import "../../src/App.css";

export default function Sidebar({ isOffcanvasOpen, toggleOffcanvas }) {
  const { username } = useParams();
  const location = useLocation();

  const NavLinkStyle = {
    width: 20,
  };

  //showing budget list
  const [shouldShowBudget, setShouldShowBudget] = useState([]);
  const [isBudgetListVisible, setIsBudgetListVisible] = useState(false);

  const toggleBudgetList = () => {
    const buttonObject1 = [
      { text: "Enter Budget", path: `/home/${username}/budget/enterbudget` },
      { text: "View Budget", path: `/home/${username}/budget/viewbudget` },
      { text: "Upload Budget", path: `/home/${username}/budget/uploadbudget` },
      {
        text: "Update Financial Year",
        path: `/home/${username}/budget/updatefinancialyear`,
      },
      { text: "Budget Analysis", path: `/home/${username}/budget/graphs` },
    ];
    setShouldShowBudget(buttonObject1);
    setIsBudgetListVisible(!isBudgetListVisible);
  };

  //showing quotation list
  const [shouldShowQuotation, setShouldShowQuotation] = useState([]);
  const [isQuotationListVisible, setIsQuotationListVisible] = useState(false);
  const toggleQuotationList = () => {
    const buttonObject2 = [
      { text: "Q.B1", path: `/home/${username}/quotation/uploadquotation` },
      { text: "Q.B2", path: `/home/${username}/quotation/reviewquotation` },
    ];
    setShouldShowQuotation(buttonObject2);
    setIsQuotationListVisible(!isQuotationListVisible);
  };

  //showing purchase list
  const [shouldShowPurchase, setShouldShowPurchase] = useState([]);
  const [isPurchaseListVisible, setIsPurchaseListVisible] = useState(false);
  const togglePurchaseList = () => {
    const buttonObject3 = [
      { text: "p.B1", path: `/home/${username}/purchase/p.b1` },
      { text: "p.B2", path: `/home/${username}/purchase/p.b2` },
    ];
    setShouldShowPurchase(buttonObject3);
    setIsPurchaseListVisible(!isPurchaseListVisible);
  };

  //showing bills list
  const [shouldShowBills, setShouldShowBills] = useState([]);
  const [isBillsListVisible, setIsBillsListVisible] = useState(false);
  const toggleBillsList = () => {
    const buttonObject4 = [
      { text: "b.B1", path: `/home/${username}/bills/b.b1` },
      { text: "b.B2", path: `/home/${username}/bills/b.b2` },
    ];
    setShouldShowBills(buttonObject4);
    setIsBillsListVisible(!isBillsListVisible);
  };

  //showing centraldeadstock list
  const [shouldShowCDS, setShouldShowCDS] = useState(true);
  const [isCDSListVisible, setIsCDSListVisible] = useState(false);
  const toggleCDSList = () => {
    const buttonObject5 = [
      {
        text: "cds.B1",
        path: `/home/${username}/centraldeadstock/centraldeadstock.b1`,
      },
      {
        text: "cds.B2",
        path: `/home/${username}/centraldeadstock/centraldeadstock.b2`,
      },
    ];
    setShouldShowCDS(buttonObject5);
    setIsCDSListVisible(!isCDSListVisible);
  };

  //showing feedback list
  const [shouldShowFeedback, setShouldShowFeedBack] = useState(true);
  const [isFeedBackListVisible, setIsFeedBackListVisible] = useState(false);
  const toggleFeedBackList = () => {
    const buttonObject6 = [
      { text: "fdb.B1", path: `/home/${username}/feedback/feedback.b1` },
      { text: "fdb.B2", path: `/home/${username}/feedback/feedback.b2` },
    ];
    setShouldShowFeedBack(buttonObject6);
    setIsFeedBackListVisible(!isFeedBackListVisible);
  };

  //showing main list
  const [shouldShowList, setShouldShowList] = useState(true);
  const toggleList = () => {
    setShouldShowList(!shouldShowList);
  };

  const shouldRenderButtons = location.state.desig === "HOD" && shouldShowList;

  const buttons = [
    {
      path: `/home/${username}/budget`,
      text: "Budget",
      icon: "fa-indian-rupee-sign",
      onClick: toggleBudgetList,
    },
    {
      path: `/home/${username}/quotation`,
      text: "Quotation",
      icon: "fa-money-check-dollar",
      onClick: toggleQuotationList,
    },
    {
      path: `/home/${username}/purchase`,
      text: "Purchase",
      icon: "fa-shopping-cart",
      onClick: togglePurchaseList,
    },
    {
      path: `/home/${username}/bills`,
      text: "Bills",
      icon: "fa-file-invoice-dollar",
      onClick: toggleBillsList,
    },
    {
      path: `/home/${username}/centraldeadstock`,
      text: "Central Dead Stock",
      icon: "fa-box-open",
      onClick: toggleCDSList,
    },
    {
      path: `/home/${username}/feedback`,
      text: "Feedback",
      icon: "fa-message",
      onClick: toggleFeedBackList,
    },
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
        <div className="offcanvas-header overflow-hidden">
          {isOffcanvasOpen ? (
            <>
              <h5 className="offcanvas-title" id="offcanvasDarkLabel">
                <i className="fa-solid fa-cart-flatbed"></i>Labtracker
              </h5>
              <button
                type="button"
                className="btn-close "
                onClick={toggleOffcanvas}
                data-bs-dismiss="offcanvas"
                data-bs-backdrop="false"
                data-bs-target="#offcanvasDark"
                aria-label="Close"
              ></button>
            </>
          ) : (
            <div
              className="offcanvas-title overflow-hidden"
              id="offcanvasDarkLabel"
            >
              <i className="fa-solid fa-cart-flatbed"></i>
            </div>
          )}
        </div>
        <div className="offcanvas-body">
          <ul className="list-group list-group-flush">
            {shouldRenderButtons && (
              <div>
                {buttons.map((button) => (
                  <ul className="list-group list-group-flush ">
                    <li className="bg-transparent justify-content-center list-group-item list-unstyled " key={button.text}>
                      <div className="submenu-item">
                        <NavLink
                          to={button.path}
                          className="isActive"
                          style={
                            "isActive"
                              ? {
                                  ...NavLinkStyle,
                                  color:"red",
                                }
                              : NavLinkStyle
                          }
                          state={{ desig: location.state.desig }}
                        >
                          <button
                            type="button"
                            className={`btn ${
                              isOffcanvasOpen ? "w-100" : "p-3"
                            }`}
                            style={{
                              height: isOffcanvasOpen ? "auto" : "40px",
                            }}
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
                            <i
                              className={`fa-solid justify-content-center ${button.icon}`}
                            ></i>
                            <div
                              className={`overflow-hidden transition-all ${
                                isOffcanvasOpen ? "w-100 ml-3" : "w-0"
                              }`}
                            >
                              {button.text}
                            </div>
                          </button>
                        </NavLink>
                      </div>
                    </li>
                  </ul>
                ))}
              </div>
            )}

            {location.state.desig === "HOD" && isBudgetListVisible && (
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <NavLink
                    to={`/home/${username}`}
                    style={NavLinkStyle}
                    state={{ desig: location.state.desig }}
                  >
                    <button
                      type="button"
                      className={`btn ${
                        isOffcanvasOpen ? "w-100" : "p-3"
                      }`}
                      style={{
                        height: isOffcanvasOpen ? "auto" : "40px",
                      }}
                      onClick={() => {
                        toggleBudgetList();
                        toggleList();
                      }}
                    >
                      <i className="fa-solid fa-indian-rupee-sign"></i>
                      <div
                              className={`overflow-hidden transition-all ${
                                isOffcanvasOpen ? "w-100 ml-3" : "w-0"
                              }`}>
                      Budget
                      </div>
                    </button>
                  </NavLink>
                </li>
                <div className=" m-n1 pt-2 container">
                    {shouldShowBudget.map((item) => (
                      <div className="menu-scrollable" >
                        <li className="list-unstyled" key={item.text}>
                          <NavLink
                            to={item.path}
                            state={{ desig: location.state.desig }}
                          >
                            <button
                              type="button"
                              className="btn"
                              style={{
                                backgroundColor: location.pathname === item.path ? 'blue' : '', 
                                color: location.pathname === item.path ? 'white' : '',
                              }}
                              onClick={item.onClick}
                            >
                              <div
                              className={`overflow-hidden transition-all ${
                                isOffcanvasOpen ? "w-100 ml-3" : "w-0"
                              }`}>
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
            {location.state.desig === "HOD" && isQuotationListVisible && (
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <NavLink
                    to={`/home/${username}`}
                    state={{ desig: location.state.desig }}
                    style={NavLinkStyle}
                  >
                    <button
                      type="button"
                      className={`btn ${
                        isOffcanvasOpen ? "w-100" : "p-3"
                      }`}
                      style={{
                        height: isOffcanvasOpen ? "auto" : "40px",
                      }}
                      onClick={() => {
                        toggleQuotationList();
                        toggleList();
                      }}
                    >
                      <i className="fa-solid fa-money-check-dollar"></i>
                      <div
                              className={`overflow-hidden transition-all ${
                                isOffcanvasOpen ? "w-100 ml-3" : "w-0"
                              }`}>
                      Quotation
                      </div>
                    </button>
                  </NavLink>
                </li>
                <div className=" m-n1 pt-2 container ">
                  {shouldShowQuotation.map((item) => (
                    <li className="list-unstyled" key={item.text}>
                      <NavLink
                        to={item.path}
                        state={{ desig: location.state.desig }}
                        style={NavLinkStyle}
                      >
                        <button
                          type="button"
                          className="btn"
                          onClick={item.onClick}
                        >
                          <div
                              className={`overflow-hidden transition-all ${
                                isOffcanvasOpen ? "w-100 ml-3" : "w-0"
                              }`}>
                              {item.text}
                              </div>
                        </button>
                      </NavLink>
                    </li>
                  ))}
                </div>
              </ul>
            )}
            {location.state.desig === "HOD" && isPurchaseListVisible && (
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <NavLink
                    to={`/home/${username}`}
                    state={{ desig: location.state.desig }}
                    style={NavLinkStyle}
                  >
                    <button
                      type="button"
                      className={`btn ${
                        isOffcanvasOpen ? "w-100" : "p-3"
                      }`}
                      style={{
                        height: isOffcanvasOpen ? "auto" : "40px",
                      }}
                      onClick={() => {
                        togglePurchaseList();
                        toggleList();
                      }}
                    >
                      <i className="fa-solid fa-cart-shopping"></i>
                      <div
                              className={`overflow-hidden transition-all ${
                                isOffcanvasOpen ? "w-100 ml-3" : "w-0"
                              }`}>
                      Purchase
                      </div>
                    </button>
                  </NavLink>
                </li>
                <div className=" m-n1 pt-2 container">
                  {shouldShowPurchase.map((item) => (
                    <li className="list-unstyled" key={item.text}>
                      <NavLink
                        to={item.path}
                        state={{ desig: location.state.desig }}
                        style={NavLinkStyle}
                      >
                        <button
                          type="button"
                          className="btn"
                          onClick={item.onClick}
                        >
                          <div
                              className={`overflow-hidden transition-all ${
                                isOffcanvasOpen ? "w-100 ml-3" : "w-0"
                              }`}>
                              {item.text}
                              </div>
                        </button>
                      </NavLink>
                    </li>
                  ))}
                </div>
              </ul>
            )}
            {location.state.desig === "HOD" && isBillsListVisible && (
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <NavLink
                    to={`/home/${username}/bills`}
                    state={{ desig: location.state.desig }}
                    style={NavLinkStyle}
                  >
                    <button
                      type="button"
                      className={`btn ${
                        isOffcanvasOpen ? "w-100" : "p-3"
                      }`}
                      style={{
                        height: isOffcanvasOpen ? "auto" : "40px",
                      }}
                      onClick={() => {
                        toggleBillsList();
                        toggleList();
                      }}
                    >
                      <i className="fa-solid fa-file-invoice-dollar"></i>
                      <div
                              className={`overflow-hidden transition-all ${
                                isOffcanvasOpen ? "w-100 ml-3" : "w-0"
                              }`}>
                      Bills
                      </div>
                    </button>
                  </NavLink>
                </li>
                <div className=" m-n1 pt-2 container">
                  {shouldShowBills.map((item) => (
                    <li className="list-unstyled" key={item.text}>
                      <NavLink
                        to={item.path}
                        state={{ desig: location.state.desig }}
                        style={NavLinkStyle}
                      >
                        <button
                          type="button"
                          className="btn"
                          onClick={item.onClick}
                        >
                          <div
                              className={`overflow-hidden transition-all ${
                                isOffcanvasOpen ? "w-100 ml-3" : "w-0"
                              }`}>
                              {item.text}
                              </div>
                        </button>
                      </NavLink>
                    </li>
                  ))}
                </div>
              </ul>
            )}
            {location.state.desig === "HOD" && isCDSListVisible && (
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <NavLink
                    to={`/home/${username}`}
                    state={{ desig: location.state.desig }}
                    style={NavLinkStyle}
                  >
                    <button
                      type="button"
                      className={`btn ${
                        isOffcanvasOpen ? "w-100" : "p-3"
                      }`}
                      style={{
                        height: isOffcanvasOpen ? "auto" : "40px",
                      }}
                      onClick={() => {
                        toggleCDSList();
                        toggleList();
                      }}
                    >
                      <i className="fa-solid fa-box-open"></i>
                      <div
                              className={`overflow-hidden transition-all ${
                                isOffcanvasOpen ? "w-100 ml-3" : "w-0"
                              }`}>
                      Central Dead Stock
                    </div>
                    </button>
                  </NavLink>
                </li>
                <div className=" m-n1 pt-2 container">
                  {shouldShowCDS.map((item) => (
                    <li className="list-unstyled" key={item.text}>
                      <NavLink
                        to={item.path}
                        state={{ desig: location.state.desig }}
                        style={NavLinkStyle}
                      >
                        <button
                          type="button"
                          className={`btn ${
                            isOffcanvasOpen ? "w-100" : "p-3"
                          }`}
                          onClick={item.onClick}
                        >
                          <div
                              className={`overflow-hidden transition-all ${
                                isOffcanvasOpen ? "w-100 ml-3" : "w-0"
                              }`}>
                              {item.text}
                              </div>
                        </button>
                      </NavLink>
                    </li>
                  ))}
                </div>
              </ul>
            )}
            {location.state.desig === "HOD" && isFeedBackListVisible && (
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <NavLink
                    to={`/home/${username}`}
                    state={{ desig: location.state.desig }}
                    style={NavLinkStyle}
                  >
                    <button
                      type="button"
                      className={`btn ${
                        isOffcanvasOpen ? "w-100" : "p-3"
                      }`}
                      style={{
                        height: isOffcanvasOpen ? "auto" : "40px",
                      }}
                      onClick={() => {
                        toggleFeedBackList();
                        toggleList();
                      }}
                    >
                      <i className="fa-solid fa-message"></i>
                      <div
                              className={`overflow-hidden transition-all ${
                                isOffcanvasOpen ? "w-100 ml-3" : "w-0"
                              }`}>
                      Feedback
                      </div>
                    </button>
                  </NavLink>
                </li>
                <div className=" m-n1 pt-2 container">
                  {shouldShowFeedback.map((item) => (
                    <li className="list-unstyled" key={item.text}>
                      <NavLink
                        to={item.path}
                        state={{ desig: location.state.desig }}
                        style={NavLinkStyle}
                      >
                        <button
                          type="button"
                          className={`btn ${
                            isOffcanvasOpen ? "w-100" : "p-3"
                          }`}
                          onClick={item.onClick}
                        >
                          <div
                              className={`overflow-hidden transition-all ${
                                isOffcanvasOpen ? "w-100 ml-3" : "w-0"
                              }`}>
                              {item.text}
                              </div>
                        </button>
                      </NavLink>
                    </li>
                  ))}
                </div>
              </ul>
            )}
            {location.state.desig === "Principal" && !shouldShowList && (
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <NavLink
                    to={`/home/${username}`}
                    state={{ desig: location.state.desig }}
                    style={NavLinkStyle}
                  >
                    <button
                      type="button"
                      className={`btn ${
                        isOffcanvasOpen ? "w-100" : "p-3"
                      }`}
                      style={{
                        height: isOffcanvasOpen ? "auto" : "40px",
                      }}
                      onClick={() => {
                        toggleList();
                      }}
                    >
                      <div
                              className={`overflow-hidden transition-all ${
                                isOffcanvasOpen ? "w-100 ml-3" : "w-0"
                              }`}>
                      PrincipalDashboard
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
                    // to={`/home/${username}/principalquotation`}
                    state={{ desig: location.state.desig }}
                    style={NavLinkStyle}
                  >
                    <button
                      type="button"
                      className="btn"
                      // onClick={() => {
                      //   toggleList();
                      // }}
                    >
                      PrincipalDashboard Quotation
                    </button>
                  </NavLink>
                </div>
              </li>
            )}
            {/* {location.state.desig === "Principal" && !shouldShowList && (
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <NavLink
                    to={`/home/${username}`}
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
                      PrincipalDashboard Quotation
                    </button>
                  </NavLink>
                </li>
              </ul>
            )} */}
            {location.state.desig === "Principal" &&
              "HOD" &&
              shouldShowList && (
                <li className="list-group-item">
                  <button type="button" className="btn" onClick={toggleList}>
                    Logout
                  </button>
                </li>
              )}
          </ul>
        </div>
      </div>
    </>
  );
}
