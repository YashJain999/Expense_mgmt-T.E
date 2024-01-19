import React from "react";
import PropTypes from "prop-types";
import '../assets/css/Navbar.module.css'; // Import your custom CSS file for Navbar styling

export default function Navbar({toggleOffcanvas,isOffcanvasOpen,props}) {

  const navbarStyle = {
    left : isOffcanvasOpen ? '260px': '0%'  ,
    right : '0px',
    width: isOffcanvasOpen ? 'calc(100% - 260px)': '100%'  ,
    transition: 'all 0.3s ease  ',
    zIndex: 1000,
    };


  return (
      <>
        <nav
          className="navbar navbar-dark fixed-top fade show navbar-expand-lg bg-dark border-bottom py-0cd" data-bs-theme="dark" style={navbarStyle}
        >
          <div className="container-fluid">
            <button
              className="btn"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasDark"
              aria-controls="offcanvasDark"
              onClick={toggleOffcanvas}
            >
              <i className="fa-solid fa-bars"></i>
            </button>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo02"
              aria-controls="#navbarTogglerDemo02"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="fa-solid fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">

              <ul className="navbar-nav active justify-content-center me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link " aria-current="page" href="/">Logout</a>
                </li>
                
              </ul>
            </div>
          </div>
        </nav>
      </>
  );
}

//setting proptypes for props
Navbar.prototype = {
  title: PropTypes.string,
};

Navbar.defaultProps = {
  title: "title ",
};