import React from "react";
import PropTypes from "prop-types";
import "../assets/css/Navbar.css";
import { useParams } from "react-router-dom";
// import { NavLink} from "react-router-dom";

export default function Navbar({
  toggleOffcanvas,
  isOffcanvasOpen,
  closeOffcanvas,
}) {
  const navbarStyle = {
    left: isOffcanvasOpen ? "260px" : "70px",
    right: "0px",
    width: isOffcanvasOpen ? "calc(100% - 260px)" : "96%",
    transition: "all 0.3s ease  ",
    zIndex: 1000,
  };

  // const NavLinkStyle = {
  //   width: 20,
  // };

  const { username } = useParams();
  const {u_dept} = useParams();
  console.log(u_dept)
  return (
    <>
      <nav
        className="navbar navbar-dark fixed-top fade show navbar-expand-lg bg-dark border-bottom "
        data-bs-theme="dark"
        style={navbarStyle}
      >
        <div className="container-fluid">
          {!isOffcanvasOpen ? (
            <button
              className="btn-menu"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasDark"
              aria-controls="offcanvasDark"
              onClick={toggleOffcanvas}
            >
              <i className="fa-solid fa-bars"></i>
            </button>
          ) : null}
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
            <ul className="navbar-nav justify-content-center me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link " aria-current="page" href="/">
                  Logout
                </a>
              </li>
            </ul>
          </div>
          <nav className="navbar navbar-light ">
            <div className="container-fluid">
              <span className="navbar-brand mb-0 h1">Username: {username}</span>
              <span className="navbar-brand mb-0 h1">Department: Data Science</span>
            </div>
          </nav>
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