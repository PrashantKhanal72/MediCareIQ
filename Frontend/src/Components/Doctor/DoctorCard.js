// Import necessary React and Material-UI components, along with FontAwesome for icons
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import moment from "moment";
import { timeFormatinAMPM } from "../../utils/timeFormatter";
import { useNavigate } from "react-router-dom";
import { base } from "../../axios/axiosInstance";

// Define the style for the modal box, including its position - center, background, border, and padding
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
};

// ModalComp component displays detailed information about a doctor in a modal

const ModalComp = function ({ open, onClose, doctorDetails }) {
  // The modal is structured to include an image, name, qualifications, experience, and other details of the doctor
  const navigate = useNavigate() // used to navigate in the give link
  return (
    <Modal
      open={open} // Controls if the modal is open or closed
      onClose={onClose} // Function to call when closing the modal
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="min-w-[350px]">
          <img
            src={`https://appointment-c3wa.onrender.com/${doctorDetails?.profileUrl??''}`}
            alt={doctorDetails?.first_name ?? ""}
            className="dt-card-img"
          />
          <p className="dt-card-name">{`${doctorDetails?.first_name ?? ""} ${
            doctorDetails?.last_name ?? ""
          }`}</p>
          <p className="dt-card-title">{doctorDetails?.qualification ?? ""}</p>
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
              <div className="flex gap-1">
                <h3>Speciality :</h3>
                <p>{doctorDetails?.speciality || 'None'}</p>
                
              </div>
            </div>
            <div>
              <div className="flex gap-1">
                <h3>Address : </h3>
                <p>{doctorDetails?.address || 'None'}</p>
                
              </div>
            </div>
            <p>Click on suitable time to book appointment</p>
          </div>
        </div>
        <div className="p-4 flex flex-col justify-between">
          <div className=" flex flex-col items-center flex-1">
          <h1 className="font-bold !underline-offset-1">
            Available Appointments
          </h1>
          {doctorDetails?.schedules &&
            doctorDetails.schedules.map((schedule, index) => {
              return (
                <div className="inline-block p-1">
                  <p className="text-center">{schedule?.available_date.split("T")[0]}</p>
                  <Button variant="outlined" key={index}>
                    {`${timeFormatinAMPM(schedule?.start_time)} - ${timeFormatinAMPM(schedule?.end_time)}`}
                  </Button>
                </div>
              );
            })}
        </div>
        <Button variant="outlined" onClick={()=> navigate(`/payment`)}>Book Now</Button>
        </div>
        
      </Box>
    </Modal>
  );
};

// DoctorCard component displays a summary card for a doctor with an option to view more details
function DoctorCard({ doctorDetails }) {
  // useState hook to manage the open/close state of the modal
  const [modalOpen, setModalOpen] = useState(false);
  // Functions to open and close the modal
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <div className="dt-card">
      <img
        src={`https://appointment-c3wa.onrender.com/${doctorDetails?.profileUrl??''}`}
        alt={doctorDetails?.first_name ?? ""}
        className="dt-card-img !object-cover"
      />
      <p className="dt-card-name">{`${doctorDetails?.first_name ?? ""} ${
        doctorDetails?.last_name ?? ""
      }`}</p>
      <p className="dt-card-title">Speciality: {doctorDetails?.speciality || 'None'}</p>
      {/* <p className="dt-card-stars"> */}
      {/* Display star icons and review count */}
      {/* <FontAwesomeIcon
          icon={faStar}
          style={{ color: "#F7BB50", paddingRight: "6px" }}
        /> */}
      {/* {doctorDetails.stars} */}
      {/* <span className="dt-card-reviews"> ({doctorDetails.reviews}+ Reviews)</span> */}
      {/* <br /> */}
      <div className="mt-2">
        {/* Button to open the modal and view more details */}
        <Button variant="outlined" onClick={handleOpenModal}>
          View details
        </Button>
      </div>
      {/* </p> */}
      {/* Modal component to display detailed information */}
      <ModalComp
        open={modalOpen}
        onClose={handleCloseModal}
        doctorDetails={doctorDetails}
      />
    </div>
  );
}

export default DoctorCard;
