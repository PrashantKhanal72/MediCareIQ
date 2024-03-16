import React from "react";
import InformationCard from "./InformationCard";
import {
  faHeartPulse,
  faTruckMedical,
  faTooth,
} from "@fortawesome/free-solid-svg-icons";


function Whyuse() {
  return (
    <div className="info-section" id="services">
      <div className="info-title-content">
        <h3 className="info-title">
          <span>How Does Online Doctor Consultation Work?</span>
        </h3>
        <p className="info-description"></p>
      </div>

      <div className="info-cards-content">
        <p>Step 1</p>
        <p>Step 2</p>
        <p>Step 3</p>
        <p>Step 4</p>
      </div>
    </div>
  );
}

export default Whyuse;
