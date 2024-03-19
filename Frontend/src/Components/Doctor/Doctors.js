import React, { Children, useState } from "react";
// Import the DoctorCard component, which will be used to display each doctor's information
import DoctorCard from "./DoctorCard";
// Import DoctorProfileData, which contains the information of doctors to be displayed
import DoctorProfileData from "../../Data/doctor";
import { useAppSelector } from "../../redux/hook";

// Define the Doctors component with props
function Doctors({ sectionName, children }) {
  const { doctors } = useAppSelector((state) => state.doctor);

  return (
    <div className="doctor-section" id="doctors">
      <div className="dt-title-content">
        <h3 className="dt-title">
          {/* Display the section name passed via props or default to "Meet Our Doctors" */}

          <span> {sectionName ? sectionName : "Meet Our Doctors"}</span>
        </h3>
      </div>

      {/* Render any children components passed to Doctors */}
      {children}
      <div className="dt-cards-content">
        {/* Iterate over DoctorProfileData to render a DoctorCard for each doctor */}
        {doctors.map((doctor, index) => {
          return (
            <DoctorCard
              key={index}
              // Pass doctor details as props to each DoctorCard component
              doctorDetails={doctor}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Doctors;
