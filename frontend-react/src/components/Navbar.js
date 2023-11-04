import React from "react";
import PropTypes from "prop-types";
// import './Navbar.css'; // Import your custom CSS file for Navbar styling
import { Feedback } from './Feedback';

export default function Navbar(props) {
  // const additionalClasses = "navbar sticky-top fade show navbar-expand-lg bg-body-tertiary bg-dark border-bottom ";
  // `navbar ${isSidebarOpen ? 'shrink' : ''} ${additionalClasses}`} data-bs-theme="dark"

  return (
    <div>
      <>
        <nav
          className="navbar sticky-top fade show navbar-expand-lg bg-body-tertiary bg-dark border-bottom py-0cd Feedback "
          data-bs-theme="dark"
        >
          <div className="container-fluid">
            {/* <a className="navbar-brand" href="/">
          <i class="fa-solid fa-bars"></i>
        </a> */}
            <button
              className="btn btn-none side "
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasDark"
              aria-controls="offcanvasExample"
            >
              <i className="fa-solid fa-bars"></i>
            </button>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="/navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            ></button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav active justify-content-center me-auto mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link " aria-current="page" href="/">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Link
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </>
    </div>
  );
}

//setting proptypes for props
Navbar.prototype = {
  title: PropTypes.string,
};

Navbar.defaultProps = {
  title: "title ",
};
