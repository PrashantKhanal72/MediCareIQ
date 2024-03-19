import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Navbar() {
  const [nav, setNav] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate()

  const openNav = () => {
    setNav(!nav);
  };

  const handleChatBtnClick = () => {
    // if (!isButtonDisabled) {
    //   toast.info("Experiencing high traffic, Please wait a moment.", {
    //     position: toast.POSITION.TOP_CENTER,
    //     onOpen: () => setIsButtonDisabled(true),
    //     onClose: () => setIsButtonDisabled(false),
    //   });
    // }
    navigate('/login')
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
          <a href="/consultnow" className="navbar-links">
            Consult Now
          </a>
        </li>
        <li>
          <a href="/nearesetlabs" className="navbar-links">
            Nearest Lab Center
          </a>
        </li>
        <li>
          <a href="/healthresources" className="navbar-links">
            Health Resources
          </a>
        </li>
        <li>
          <a href="/reportanalysis" className="navbar-links">
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
        <FontAwesomeIcon icon={faCommentDots} /> Login
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
            <Link onClick={openNav} to="/bookappointment">
              Book Appointment
            </Link>
          </li>
          <li>
            <a onClick={openNav} href="/consultnow">
              Consult Now
            </a>
          </li>
          <li>
            <a onClick={openNav} href="/nearesetlabs">
              Nearest Lab Center
            </a>
          </li>
          <li>
            <a onClick={openNav} href="/healthresources">
              Health Resources
            </a>
          </li>
          <li>
            <a onClick={openNav} href="/reportanalysis">
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
