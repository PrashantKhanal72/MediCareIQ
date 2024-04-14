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
          description="Connect with confidence! Our platform grants you access to a network of verified medical professionals. Schedule your virtual visit and experience healthcare that's trustworthy, transparent, and tailored to your needs."
          img={verifiedDoctor}
        />

        <InformationCard
          title="Save Time and Money"
          description="Our revolutionary platform is designed to streamline your healthcare experience, where you can seamlessly schedule dual appointments with a physician and a specialist in one go. With a single payment, MediCareIQ simplifies your healthcare journey, ensuring you receive comprehensive care without the hassle of multiple transactions."
          img={saveTime}
        />

        <InformationCard
          title="Analyze Report"
          description="Take control of your health with our smart report analysis. Our platform translates complex medical data into clear, actionable insights. Stay informed, stay ahead, and start making decisions that lead to a healthier you."
          img={analyzeReport}
        />

        <InformationCard
          title="Find Lab Centers"
          description="Discover the convenience of easy-access lab centers. Our intuitive platform guides you to nearby facilities, ensuring that your diagnostic needs are met with ease and efficiency."
          img={labs}
        />

        <InformationCard
          title="Health Resources"
          description="Dive into a curated collection of health resources. Whether you're looking to understand a diagnosis or seeking wellness tips, our rich library is your companion in cultivating a more informed, healthier lifestyle."
          img={healthResources}
        />
      </div>
    </div>
  );
}

export default Whyuse;
