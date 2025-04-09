import React, { useState } from "react";
import { Link } from "react-router-dom"; // Lägg till detta om du använder <Link>
import "../styles/Navbar.css";
// import { FaArrowLeft } from "react-icons/fa6";
// import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header-container">
      <div className={`navbar-container ${isMenuOpen ? "flipped" : ""}`}>
        <div className="navbar-front">
          <div
            className="menu-icon"
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            <span className="menu-bar"></span>
            <span className="menu-bar"></span>
            <span className="menu-bar"></span>
          </div>
          <h1 className="menu-header">WATCHLIST</h1>
          <div className="user-profile">
            <span className="profile-icon">👤</span>
            <span className="username">JOE76</span>
          </div>
        </div>
        <div className="navbar-back">
          <div
            className="menu-icon"
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            <span className="menu-bar"></span>
            <span className="menu-bar"></span>
            <span className="menu-bar"></span>
          </div>
          <ul className="menu-options">
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

/*


import React, { useState } from "react";
import { Link } from "react-router-dom"; // Lägg till detta om du använder <Link>
import "../styles/Navbar.css";
// import { FaArrowLeft } from "react-icons/fa6";
// import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className={`navbar-container ${isMenuOpen ? "flipped" : ""}`}>
        <div className="navbar-front">
          <div
            className="menu-icon"
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            <span className="menu-bar"></span>
            <span className="menu-bar"></span>
            <span className="menu-bar"></span>
          </div>
          <h1>WATCHLIST</h1>
          <div className="user-profile">
            <span className="profile-icon">👤</span>
            <span className="username">JOE76</span>
          </div>
        </div>
        <div className="navbar-back">
          <div
            className="menu-icon"
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            <span className="menu-bar"></span>
            <span className="menu-bar"></span>
            <span className="menu-bar"></span>
          </div>
          <ul className="menu-options">
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

 
 */
