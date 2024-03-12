import React from "react";
import Navbar from "../Components/Navbar/index";
import Doctors from "../Components/Doctor/Doctors";
import Howdoesitwork from "../Components/Howdoesitwork/index";
import VideoSection from "../Components/VideosSection"
import Footer from "../Components/Footer";


function Home() {
  return (
    <div className="home-section">
      <Navbar />
      <h1>Steps to Book Appointment</h1>
      <Doctors sectionName={"General Physicians"} />
      <hr />
      <Doctors sectionName={"Specialist"} />
      <Footer />
    </div>
  );
}

export default Home;
