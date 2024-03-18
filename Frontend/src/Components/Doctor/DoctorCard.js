// Import necessary React and Material-UI components, along with FontAwesome for icons
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

// Define the style for the modal box, including its position - center, background, border, and padding
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// ModalComp component displays detailed information about a doctor in a modal

const ModalComp = function ({ open, onClose, doctorDetails }) {
  // The modal is structured to include an image, name, qualifications, experience, and other details of the doctor
  return (
    <Modal
      open={open } // Controls if the modal is open or closed
      onClose={onClose}  // Function to call when closing the modal
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <img
          src={doctorDetails.img}
          alt={doctorDetails.name}
          className="dt-card-img"
        />
        <p className="dt-card-name">{doctorDetails.name}</p>
        <p className="dt-card-title">{doctorDetails.qualification}</p>
        {/* <p className="dt-card-title">
          {doctorDetails.yearsOfExperience} years of Experience
        </p> */}

        <div className="d-flex">
          <div>
            {/* <div>
              <h3>Education</h3>
              {doctorDetails.education}
            </div> */}
            {/* <div>
              <h3>Language Spoken</h3>
              {doctorDetails.languageSpoken}
            </div> */}
            <div>
              <h3>Phone Number</h3>
              {doctorDetails.nmcNumber}
            </div>
          </div>
          <div>
            <div>
              <h3>Available Time</h3>

             

              <h3>Mon - Fri</h3>

              {doctorDetails.availableTime &&
                Object.entries(doctorDetails.availableTime).map(
                  ([date, times]) => (
                    <div key={date}>
                      {/* <p>Date: {date}</p> */}
                      <ul>
                        {times.map((time, index) => (
                          <div className="inline-block p-1">
                          <Button variant="outlined" key={index}>{time}</Button>
                          </div>
                        ))}
                      </ul>
                    </div>
                  )
                )}
            </div>
          </div>
          <p>Click on suitable time to book appointment</p>
        </div>
      </Box>
    </Modal>
  );
};

// DoctorCard component displays a summary card for a doctor with an option to view more details
function DoctorCard(props) {
  // useState hook to manage the open/close state of the modal
  const [modalOpen, setModalOpen] = useState(false);
  // Functions to open and close the modal
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <div className="dt-card">
      <img src={props.img} alt={props.name} className="dt-card-img" />
      <p className="dt-card-name">{props.name}</p>
      <p className="dt-card-title">{props.qualification}</p>
      <p className="dt-card-stars">
      {/* Display star icons and review count */}
        <FontAwesomeIcon
          icon={faStar}
          style={{ color: "#F7BB50", paddingRight: "6px" }}
        />
        {props.stars}
        <span className="dt-card-reviews"> ({props.reviews}+ Reviews)</span>
        <br />
        <div className="mt-2">
        {/* Button to open the modal and view more details */}
          <Button variant="outlined" onClick={handleOpenModal}>
            View details
          </Button>
        </div>
      </p>
    {/* Modal component to display detailed information */}
      <ModalComp
        open={modalOpen}
        onClose={handleCloseModal}
        doctorDetails={props}
      />
    </div>
  );
}

export default DoctorCard;
