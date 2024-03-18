// Import necessary React hooks and assets
import React, { useEffect, useState } from "react";
import Doctor from "../../Assets/doctor.png"; // Import an image for the hero section
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesome for icons
import { faCalendarCheck, faAngleUp } from "@fortawesome/free-solid-svg-icons"; // Specific icons used in the component
import { useNavigate } from "react-router-dom"; // Hook for programmatic navigation

function Hero() {
  const navigate = useNavigate(); // Hook to enable navigation to different routes
  const [goUp, setGoUp] = useState(false); // State to manage visibility of the scroll-to-top button

  // Function to scroll the window to the top smoothly
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Function to navigate to the appointment page when the button is clicked
  const handleBookAppointmentClick = () => {
    navigate("/appointment");
  };

  // useEffect hook to add and remove a scroll event listener
  useEffect(() => {
    const onPageScroll = () => {
      // Show the scroll-to-top button if the user scrolls down more than 600px
      if (window.scrollY > 600) {
        setGoUp(true);
      } else {
        setGoUp(false);
      }
    };
    window.addEventListener("scroll", onPageScroll);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("scroll", onPageScroll);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="section-container">
      <div className="hero-section">
        <div className="text-section">
          {/* Headline, title, and description */}
          <p className="text-headline">❤️ Health comes first</p>
          <h2 className="text-title">
            Find your Doctor and make an Appointments
          </h2>
          <p className="text-description">
            Talk to online doctors and get medical advice, online prescriptions,
            refills and medical notes within minutes. On-demand healthcare
            services at your fingertips.
          </p>
          {/* Button to book an appointment */}
          <button
            className="text-appointment-btn"
            type="button"
            onClick={handleBookAppointmentClick}
          >
            <FontAwesomeIcon icon={faCalendarCheck} /> Book Appointment
          </button>
          {/* Statistical data displayed */}
          <div className="text-stats">
            <div className="text-stats-container">
              <p>145k+</p>
              <p>Receive Patients</p>
            </div>

            <div className="text-stats-container">
              <p>50+</p>
              <p>Expert Doctors</p>
            </div>

            <div className="text-stats-container">
              <p>10+</p>
              <p>Years of Experience</p>
            </div>
          </div>
        </div>

        {/* Section for the hero image */}
        <div className="hero-image-section">
          <img className="hero-image1" src={Doctor} alt="Doctor" />
        </div>
      </div>

      {/* Scroll-to-top button, visibility controlled by `goUp` state */}
      <div
        onClick={scrollToTop}
        className={`scroll-up ${goUp ? "show-scroll" : ""}`}
      >
        <FontAwesomeIcon icon={faAngleUp} />
      </div>
    </div>
  );
}

export default Hero;
