import React from "react";
import PropTypes from "prop-types";
import "../assets/css/Navbar.css";
import { useParams, useNavigate } from "react-router-dom";

export default function Navbar({
  toggleOffcanvas,
  isOffcanvasOpen,
  closeOffcanvas,
}) {
  const navigate = useNavigate();
  const { username, u_dept } = useParams();

  const handleLogout = () => {
    // Clear session data
    sessionStorage.clear(); 
    // Redirect to login page
    navigate('/');
  };

  const displaydepartment = u_dept !== "undefined" ? `Department: ${u_dept}` : `Designation: Principal`;
  const navbarStyle = {
    left: isOffcanvasOpen ? "260px" : "70px",
    right: "0px",
    width: isOffcanvasOpen ? "calc(100% - 260px)" : "96%",
    transition: "all 0.3s ease",
    zIndex: 1000,
  };

  return (
    <nav className="navbar navbar-dark fixed-top fade show navbar-expand-lg bg-dark border-bottom" data-bs-theme="dark" style={navbarStyle}>
      <div className="container-fluid">
        {!isOffcanvasOpen ? (
          <button className="btn-menu" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDark" aria-controls="offcanvasDark" onClick={toggleOffcanvas}>
            <i className="fa-solid fa-bars"></i>
          </button>
        ) : null}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="#navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <i className="fa-solid fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav justify-content-center me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button className="nav-link" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
        <nav className="navbar navbar-light">
          <div className="container-fluid">
            <span className="navbar-brand mb-0 h1">Username: {username}</span>
            
            <span className="navbar-brand mb-0 h1">{displaydepartment}</span>
          </div>
        </nav>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  toggleOffcanvas: PropTypes.func,
  isOffcanvasOpen: PropTypes.bool,
  closeOffcanvas: PropTypes.func,
};

Navbar.defaultProps = {
  toggleOffcanvas: () => {},
  isOffcanvasOpen: false,
  closeOffcanvas: () => {},
};