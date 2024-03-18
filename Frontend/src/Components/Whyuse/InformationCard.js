import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function InformationCard(props) {
  return (
    <div className="info-cards">
      <span className="info-card-icon">
        <FontAwesomeIcon className="info-fa-icon" icon={props.icon} />
      </span>
      <img src={props.img} alt="doctor" />
      <div className="content">
        <p className="info-card-title">{props.title}</p>
        <p className="info-card-description">{props.description}</p>
      </div>
    </div>
  );
}

export default InformationCard;
