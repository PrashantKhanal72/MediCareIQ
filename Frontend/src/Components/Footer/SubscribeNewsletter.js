// Importing necessary hooks from React and components from react-toastify for displaying notifications
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
// Importing CSS for react-toastify to style the toast notifications
import "react-toastify/dist/ReactToastify.css";

function SubscribeNewsletter() {
  // State to store the input email from the user
  const [inputEmail, setInputEmail] = useState("");
  // State to manage the button disabled status to prevent multiple submissions
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  // Regular expression to validate the email format
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

// Function to update the inputEmail state when the user types in the email input field
  const handleEmailInput = (event) => {
    setInputEmail(event.target.value);
  };
// Function to handle the click event of the subscribe button
  const handleBookAppointmentClick = () => {
    // Check if the button is not disabled to prevent multiple submissions
      
    if (!isButtonDisabled) {
      // Test the inputEmail against the emailRegex to validate
      emailRegex.test(inputEmail)
        ? toast.success("Subscribed to Newsletter !", { // If email is valid, show success toast
            position: toast.POSITION.TOP_CENTER,
            onOpen: () => {
              setIsButtonDisabled(true); // Disable the button to prevent multiple submissions
              setInputEmail(""); // Reset the email input field
            },
            onClose: () => setIsButtonDisabled(false), // Enable the button again after the toast closes
          })
        : toast.error("Invalid Email Address !", { // If email is invalid, show error toast
            position: toast.POSITION.TOP_CENTER,
            onOpen: () => setIsButtonDisabled(true), // Disable the button to prevent more attempts
            onClose: () => setIsButtonDisabled(false), // Enable the button again after the toast closes
          });
    }
  };

  // Render the component
  return (
    <div className="ft-info-p2">
      <p className="ft-input-title">Stay Update to our Newsletter</p>
      <input
        type="text"
        inputMode="email"
        className="ft-input"
        placeholder="Enter your email address"
        name="email"
        value={inputEmail} // Controlled component with value set to inputEmail state
        onChange={handleEmailInput} // Update state on input change
        autoComplete="true" // Enable autocomplete for email input
      />
      <button
        className="text-appointment-btn"
        type="button"
        disabled={isButtonDisabled} // Button is disabled based on isButtonDisabled state
        onClick={handleBookAppointmentClick} // Handle subscribe button click
      >
        Subscribe
      </button>
      {/* ToastContainer to display the toast notifications */}
      <ToastContainer autoClose={4000} limit={1} closeButton={false} />
    </div>
  );
}

export default SubscribeNewsletter;
