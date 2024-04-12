import React from "react";
import Navbar from "../Components/Navbar/index";
import Hero from "../Components/Hero/index";
import Whyuse from "../Components/Whyuse/index";
import Howdoesitwork from "../Components/Howdoesitwork/index";
import VideoSection from "../Components/VideosSection"
import Footer from "../Components/Footer";
// import About from "../Components/About";
// import BookAppointment from "../Components/BookAppointment";
// import Reviews from "../Components/Reviews";
// import Doctors from "../Components/Doctors";

function Home() {
  return (
    <div className="home-section">
      <Navbar />
      <Hero />
      {/* <Whyuse /> */}
      {/* <Howdoesitwork /> */}
      {/* <VideoSection /> */}
      <Footer />
      {/*<About />
      <BookAppointment />
      <Reviews />
      <Doctors /> */}
    </div>
  );
}

export default Home;
