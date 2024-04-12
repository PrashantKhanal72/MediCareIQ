import React from "react";
import Navbar from "../Components/Navbar/index";
import Hero from "../Components/Hero/index";
import Whyuse from "../Components/Whyuse/index";
import Footer from "../Components/Footer";

function Home() {
  return (
    <div className="home-section">
      <Navbar />
      <Hero />
       <Whyuse />
      <Footer />
    </div>
  );
}

export default Home;
