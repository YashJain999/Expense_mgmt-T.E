import React, { useState } from "react";
import { NavLink, useParams, useLocation } from "react-router-dom";
import "../assets/css/Sidebar.css";

export default function Sidebar({ isOffcanvasOpen, toggleOffcanvas }) {
  const NavLinkStyle = {
    // textDecoration: "none",
    width: 20,
    // border: "none",
    // color: "none",
  };

  const { username } = useParams();
  const location = useLocation();

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
      { text: "Compare by Bar Graphs", path: `/home/${username}/budget/graphs` },
      { text: "Compare by Line Graphs", path: `/home/${username}/budget/linegraphs` },
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

  return (
    <>
      <div
        className="offcanvas offcanvas-start text-bg-dark border-bottom show"
        data-bs-backdrop="false"
        data-bs-target="#offcanvasDark"
        data-bs-theme="dark"
        tabIndex="-1"
        id="offcanvasDark"
        aria-labelledby="offcanvasDarkLabel"
        style={{ width: 260, transition: "all 0.3s ease" }}
      >
        <div className="offcanvas-header ">
          <h5 className="offcanvas-title" id="offcanvasDarkLabel">
            Labtracker
          </h5>
          {isOffcanvasOpen ? (
            <button
              type="button"
              className="btn btn-close "
              onClick={toggleOffcanvas}
              data-bs-dismiss="offcanvas"
              data-bs-backdrop="false"
              data-bs-target="#offcanvasDark"
              aria-label="Close"
            ></button>
          ) : null}
        </div>
        <div className="offcanvas-body">
          <ul className="list-group list-group-flush">
            {location.state.desig === "HOD" && shouldShowList && (
              <li className="list-group-item">
                <div className="submenu-item">
                  <NavLink
                    to={`/home/${username}/budget`}
                    state={{ desig: location.state.desig }}
                    style={NavLinkStyle}
                  >
                    <button
                      type="button"
                      className="btn"
                      onClick={() => {
                        toggleBudgetList();
                        toggleList();
                      }}
                    >
                      Budget
                    </button>
                  </NavLink>
                </div>
              </li>
            )}
            {location.state.desig === "HOD" && isBudgetListVisible && (
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <NavLink
                    to={`/home/${username}`}
                    style={NavLinkStyle}
                    activestyle={{
                      fontWeight: "bold",
                      color: "red",
                      backgroundColor: "pink",
                    }}
                    state={{ desig: location.state.desig }}
                  >
                    <button
                      type="button"
                      className="btn"
                      onClick={() => {
                        toggleBudgetList();
                        toggleList();
                      }}
                    >
                      Budget
                    </button>
                  </NavLink>
                </li>
                <div className=" m-n1 pt-2 container">
                  {shouldShowBudget.map((item, index) => (
                    <div className="menu-scrollable"key={index}>
                      <li className="list-unstyled" >
                        <NavLink
                          to={item.path}
                          style={NavLinkStyle}
                          activestyle={{
                            fontWeight: "bold",
                            color: "red",
                            backgroundColor: "pink",
                          }}
                          state={{ desig: location.state.desig }}
                        >
                          <button
                            type="button"
                            className="btn"
                            onClick={item.onClick}
                          >
                            {item.text}
                          </button>
                        </NavLink>
                      </li>
                    </div>
                  ))}
                </div>
              </ul>
            )}
            {location.state.desig === "HOD" && shouldShowList && (
              <li className="list-group-item">
                <NavLink
                  to={`/home/${username}/quotation`}
                  style={NavLinkStyle}
                  state={{ desig: location.state.desig }}
                >
                  <button
                    type="button"
                    className="btn"
                    onClick={() => {
                      toggleQuotationList();
                      toggleList();
                    }}
                  >
                    Quotation
                  </button>
                </NavLink>
              </li>
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
                      className="btn"
                      onClick={() => {
                        toggleQuotationList();
                        toggleList();
                      }}
                    >
                      Quotation
                    </button>
                  </NavLink>
                </li>
                <div className=" m-n1 pt-2 container ">
                  {shouldShowQuotation.map((item, text) => (
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
                          {item.text}
                        </button>
                      </NavLink>
                    </li>
                  ))}
                </div>
              </ul>
            )}
            {location.state.desig === "HOD" && shouldShowList && (
              <li className="list-group-item">
                <NavLink
                  to={`/home/${username}/purchase`}
                  state={{ desig: location.state.desig }}
                  style={NavLinkStyle}
                >
                  <button
                    type="button"
                    className="btn"
                    onClick={() => {
                      togglePurchaseList();
                      toggleList();
                    }}
                  >
                    Purchase
                  </button>
                </NavLink>
              </li>
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
                      className="btn"
                      onClick={() => {
                        togglePurchaseList();
                        toggleList();
                      }}
                    >
                      Purchase
                    </button>
                  </NavLink>
                </li>
                <div className=" m-n1 pt-2 container">
                  {shouldShowPurchase.map((item, text) => (
                    <li className="list-unstyled" key={text}>
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
                          {item.text}
                        </button>
                      </NavLink>
                    </li>
                  ))}
                </div>
              </ul>
            )}
            {location.state.desig === "HOD" && shouldShowList && (
              <li className="list-group-item">
                <NavLink
                  to={`/home/${username}/bills`}
                  state={{ desig: location.state.desig }}
                  style={NavLinkStyle}
                >
                  <button
                    type="button"
                    className="btn"
                    onClick={() => {
                      toggleBillsList();
                      toggleList();
                    }}
                  >
                    Bills
                  </button>
                </NavLink>
              </li>
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
                      className="btn"
                      onClick={() => {
                        toggleBillsList();
                        toggleList();
                      }}
                    >
                      Bills
                    </button>
                  </NavLink>
                </li>
                <div className=" m-n1 pt-2 container">
                  {shouldShowBills.map((item, text) => (
                    <li className="list-unstyled" key={text}>
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
                          {item.text}
                        </button>
                      </NavLink>
                    </li>
                  ))}
                </div>
              </ul>
            )}
            {location.state.desig === "HOD" && shouldShowList && (
              <li className="list-group-item">
                <NavLink
                  to={`/home/${username}/centraldeadstock`}
                  state={{ desig: location.state.desig }}
                  style={NavLinkStyle}
                >
                  <button
                    type="button"
                    className="btn"
                    onClick={() => {
                      toggleCDSList();
                      toggleList();
                    }}
                  >
                    Central Dead Stock
                  </button>
                </NavLink>
              </li>
            )}
            {location.state.desig === "HOD" && isCDSListVisible && (
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <NavLink
                    to={`/home/${username}`}
                    style={NavLinkStyle}
                    activestyle={{
                      fontWeight: "bold",
                      color: "red",
                    }}
                    state={{ desig: location.state.desig }}
                  >
                    <button
                      type="button"
                      className="btn"
                      onClick={() => {
                        toggleCDSList();
                        toggleList();
                      }}
                    >
                      Central Dead Stock
                    </button>
                  </NavLink>
                </li>
                <div className=" m-n1 pt-2 container">
                  {shouldShowCDS.map((item, text) => (
                    <li className="list-unstyled" key={text}>
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
                          {item.text}
                        </button>
                      </NavLink>
                    </li>
                  ))}
                </div>
              </ul>
            )}
            {location.state.desig === "HOD" && shouldShowList && (
              <li className="list-group-item">
                <NavLink
                  to={`/home/${username}/feedback`}
                  state={{ desig: location.state.desig }}
                  style={NavLinkStyle}
                >
                  <button
                    type="button"
                    className="btn"
                    onClick={() => {
                      toggleFeedBackList();
                      toggleList();
                    }}
                  >
                    Feedback
                  </button>
                </NavLink>
              </li>
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
                      className="btn"
                      onClick={() => {
                        toggleFeedBackList();
                        toggleList();
                      }}
                    >
                      Feedback
                    </button>
                  </NavLink>
                </li>
                <div className=" m-n1 pt-2 container">
                  {shouldShowFeedback.map((item, text) => (
                    <li className="list-unstyled" key={text}>
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
                          {item.text}
                        </button>
                      </NavLink>
                    </li>
                  ))}
                </div>
              </ul>
            )}
            {location.state.desig === "Principal" && shouldShowList && (
              <li className="list-group-item">
                <NavLink
                  to={`/home/${username}/principal`}
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
                    PrincipalDashboard
                  </button>
                </NavLink>
              </li>
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
                      className="btn"
                      onClick={() => {
                        toggleList();
                      }}
                    >
                      PrincipalDashboard
                    </button>
                  </NavLink>
                </li>
              </ul>
            )}
            {location.state.desig === "Principal" && shouldShowList && (
              <li className="list-group-item">
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
      {/* </div>   */}
    </>
  );
}
