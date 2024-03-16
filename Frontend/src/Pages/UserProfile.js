import React from "react";
import Navbar from "../Components/Navbar/index";
import Footer from "../Components/Footer";

import UserProfileHeader from "../Components/User/UserProfileHeader";
import UserAppointmentHistory from "../Components/User/UserAppointmentHistory";

const UserProfile = () => {
  return (
    <div className="home-section">
      <Navbar />
      <div>
        <UserProfileHeader />
        <UserAppointmentHistory />
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
