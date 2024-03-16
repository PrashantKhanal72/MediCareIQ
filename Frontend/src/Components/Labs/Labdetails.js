// LabDetails.js

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import  labdata from "../../Data/labs";

const LabDetails = () => {
  const { labId } = useParams();
  const [lab, setLab] = useState(null);

  useEffect(() => {
    // Fetch lab data based on labId
    const fetchLabData = () => {
      // Assuming labdata is imported from labs.js
     
      const labDetails = labdata.find((lab) => lab.id === parseInt(labId, 10));

      if (labDetails) {
        setLab(labDetails);
      } else {
        // Handle lab not found
        console.error("Lab not found");
      }
    };

    fetchLabData();
  }, [labId]);

  if (!lab) {
    // Render loading state or handle lab not found
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{lab.name}</h1>
      <p>Opening hours: {lab.openingHours}</p>
      <p>Location: {lab.location}</p>
      <p>Phone number: {lab.phoneNumber}</p>
      {/* Display other details and tests */}
    </div>
  );
};

export default LabDetails;
