import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Navbar() {
  const [nav, setNav] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const openNav = () => {
    setNav(!nav);
  };

  const handleChatBtnClick = () => {
    if (!isButtonDisabled) {
      toast.info("Experiencing high traffic, Please wait a moment.", {
        position: toast.POSITION.TOP_CENTER,
        onOpen: () => setIsButtonDisabled(true),
        onClose: () => setIsButtonDisabled(false),
      });
    }
  };

  return (
    <div className="navbar-section">
      <h1 className="navbar-title">
        <Link to="/">
          <div className="logo">
            <img
              src={process.env.PUBLIC_URL + "/images/logo.png"}
              alt="Example"
            />
          </div>
        </Link>
      </h1>

      {/* Desktop */}
      <ul className="navbar-items">
        <li>
          <Link to="/bookappointment" className="navbar-links">
            Book Appointment
          </Link>
        </li>
        <li>
          <a href="#services" className="navbar-links">
            Consult Now
          </a>
        </li>
        <li>
          <a href="#about" className="navbar-links">
            Nearest Lab Center
          </a>
        </li>
        <li>
          <a href="#reviews" className="navbar-links">
            Health Resources
          </a>
        </li>
        <li>
          <a href="#doctors" className="navbar-links">
            Report Analysis
          </a>
        </li>
        <li>
          <a href="#doctors" className="navbar-links">
            About us
          </a>
        </li>
      </ul>

      <button
        className="navbar-btn"
        type="button"
        disabled={isButtonDisabled}
        onClick={handleChatBtnClick}
      >
        <FontAwesomeIcon icon={faCommentDots} />  Book Appointment
      </button>

      {/* Mobile */}
      <div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>
        <div onClick={openNav} className="mobile-navbar-close">
          <FontAwesomeIcon icon={faXmark} className="hamb-icon" />
        </div>

        <ul className="mobile-navbar-links">
          <li>
            <Link onClick={openNav} to="/">
           Home
            </Link>
          </li>
          <li>
            <Link onClick={openNav} to="/bookappointment" >
              Book Appointment
              </Link>
          </li>
          <li>
            <a onClick={openNav} href="#services">
            Consult Now
            </a>
          </li>
          <li>
            <a onClick={openNav} href="#about">
            Nearest Lab Center
            </a>
          </li>
          <li>
            <a onClick={openNav} href="#reviews">
            Health Resources
            </a>
          </li>
          <li>
            <a onClick={openNav} href="#doctors">
            Report Analysis
            </a>
          </li>
          <li>
            <a onClick={openNav} href="#contact">
            About us
            </a>
          </li>
        </ul>
      </div>

      {/* Hamburger Icon */}
      <div className="mobile-nav">
        <FontAwesomeIcon
          icon={faBars}
          onClick={openNav}
          className="hamb-icon"
        />
      </div>
    </div>
  );
}

export default Navbar;
