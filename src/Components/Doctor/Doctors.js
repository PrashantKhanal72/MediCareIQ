import React, { Children, useState } from "react";

import DoctorCard from "./DoctorCard";

import DoctorProfileData from "../../Data/doctor";

function Doctors({ sectionName, children }) {
  return (
    <div className="doctor-section" id="doctors">
      <div className="dt-title-content">
        <h3 className="dt-title">
          <span> {sectionName ? sectionName : "Meet Our Doctors"}</span>
        </h3>
      </div>

      {children}
      <div className="dt-cards-content">
        {
          DoctorProfileData.map((doctor) => {
            return (
              <DoctorCard
                img={doctor.image}
                name={doctor.name}
                qualification={doctor.qualification}
                stars={doctor.stars}
                reviews={doctor.reviews}
                education={doctor.education}
                languageSpoken={doctor.languageSpoken}
                nmcNumber={doctor.nmcNumber}
                yearsOfExperience={doctor.yearsOfExperience}
                availableTime={doctor.availableTime}  
              />
            );
          })
        }
      </div>
    </div>
  );
}

export default Doctors;
