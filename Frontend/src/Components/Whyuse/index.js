import React from "react";
import InformationCard from "./InformationCard";
import {
  faHeartPulse,
  faTruckMedical,
  faTooth,
} from "@fortawesome/free-solid-svg-icons";

import analyzeReport from "../../Assets/analyze report.jpg";
import healthResources from "../../Assets/healthresources.png";
import labs from "../../Assets/labs.jpg";
import saveTime from "../../Assets/save time and money.jpg";
import verifiedDoctor from "../../Assets/verifieddoctors.png";

function Whyuse() {
  return (
    <div className="info-section" id="services">
      <div className="info-title-content">
        <h3 className="info-title">
          <span>Why Use MedicareIQ?</span>
        </h3>
        <p className="info-description"></p>
      </div>

      <div className="info-cards-content">
        <InformationCard
          title="Verified Doctors"
          description="Discover peace of mind by connecting with certified healthcare professionals, ensuring your health is in reliable hands."
          img={verifiedDoctor}
        />

        <InformationCard
          title="Save Time and Money"
          description=" Revolutionize your healthcare experience, saving precious time and resources through our efficient and cost-effective solutions."
          img={saveTime}
        />

        <InformationCard
          title="Analyze Report"
          description="Empower yourself with detailed insights from thorough report analysis, making informed decisions about your well-being."
          img={analyzeReport}
        />

        <InformationCard
          title="Find Lab Centers"
          description="Navigate seamlessly to nearby lab facilities, ensuring convenient access for all your diagnostic needs."
          img={labs}
        />

        <InformationCard
          title="Health Resources"
          description="Explore a diverse array of health-related information and resources, empowering you to take proactive steps towards a healthier lifestyle."
          img={healthResources}
        />
      </div>
    </div>
  );
}

export default Whyuse;
