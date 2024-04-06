import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { setLogin } from "../../redux-slices/authSlices";
import { getUserProfile } from "../../Api/user";
import UserProfile from '../../Assets/user-512.png';
import { checkUserDetails } from "../../utils/checkUserDetails";
import { socket } from "../../Pages/VideoCall";
import Toast from "../common/Toast";

function Navbar() {
  const [nav, setNav] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate()
  const token = Cookies.get("token");

  const { user } = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()

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

  const handleRouting= (e) => {
    e.preventDefault()
    checkUserDetails(user)
  }

  useEffect(()=> {
    if(user && user.email){
      socket.emit("setUsername", user?.profile_id);
    }
  }, [user?.email])
  
  useEffect(()=> {
    if(token){
      dispatch(getUserProfile());
    }
  },[token])


  return (
    <>
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
      </ul>

     { (user && user?.profile_id) ? <div onClick={(e)=> handleRouting(e)} className="flex gap-2 items-center hover:cursor-pointer pr-5">
      <div className="h-[40px] w-[40px]">
      <img src={UserProfile} alt="img" className="h-full rounded-full border-[1px] border-black w-full" />
      </div>
         <p>{user?.first_name??''}</p>
     </div>: 
     <button
        className="navbar-btn"
        type="button"
        disabled={isButtonDisabled}
        onClick={handleChatBtnClick}
      >
        <FontAwesomeIcon icon={faCommentDots} /> Login
      </button>}

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
    <Toast/>
    </>
  );
}

export default Navbar;
