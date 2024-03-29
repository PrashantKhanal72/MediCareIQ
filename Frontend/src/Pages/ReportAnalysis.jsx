import React, { useState } from "react";
import Navbar from "../Components/Navbar/index";
import Footer from "../Components/Footer";
import { Tab } from "@headlessui/react";
import Malaria from "../Components/ReportAnalysis/Malaria";
import Fracture from "../Components/ReportAnalysis/Fracture";
import Kidney from "../Components/ReportAnalysis/Kidney";
import Diabiates from "../Components/ReportAnalysis/Diabiates";
import Heart from "../Components/ReportAnalysis/Heart";
import Liver from "../Components/ReportAnalysis/Liver";

// Define the ReportAnalysis component.
const ReportAnalysis = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  // Render the component UI.
  return (
    <div className="home-section">
      <Navbar />
      <h1>Report Analysis</h1>
      <div className="mb-10">
        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <Tab.List className="px-6 bg-white flex items-center">
            <Tab className="px-10 text-secondary-black py-3 font-DM-sans text-[17px] leading-[22px] font-medium focus:outline-none aria-selected:bg-green-500 aria-selected:text-white aria-selected:font-bold rounded-sm">
              Malaria
            </Tab>
            <Tab className="px-10 py-3 text-secondary-black font-DM-sans text-[17px] leading-[22px] font-medium focus:outline-none aria-selected:bg-green-500 aria-selected:text-white aria-selected:font-bold">
              Fracture
            </Tab>
            <Tab className="px-10 py-3 text-secondary-black font-DM-sans text-[17px] leading-[22px] font-medium focus:outline-none aria-selected:bg-green-500 aria-selected:text-white aria-selected:font-bold">
              Kidney
            </Tab>
            <Tab className="px-10 py-3 text-secondary-black font-DM-sans text-[17px] leading-[22px] font-medium focus:outline-none aria-selected:bg-green-500 aria-selected:text-white aria-selected:font-bold">
              Diabetes
            </Tab>
            <Tab className="px-10 py-3 text-secondary-black font-DM-sans text-[17px] leading-[22px] font-medium focus:outline-none aria-selected:bg-green-500 aria-selected:text-white aria-selected:font-bold">
              Liver Diesease
            </Tab>
            <Tab className="px-10 py-3 text-secondary-black font-DM-sans text-[17px] leading-[22px] font-medium focus:outline-none aria-selected:bg-green-500 aria-selected:text-white aria-selected:font-bold">
              Heart
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <Malaria currentTab={selectedIndex} />
            </Tab.Panel>
            <Tab.Panel>
              <Fracture currentTab={selectedIndex} />
            </Tab.Panel>
            <Tab.Panel>
              <Kidney currentTab={selectedIndex} />
            </Tab.Panel>
            <Tab.Panel>
              <Diabiates currentTab={selectedIndex} />
            </Tab.Panel>
            <Tab.Panel>
              <Liver currentTab={selectedIndex} />
            </Tab.Panel>
            <Tab.Panel>
              <Heart currentTab={selectedIndex} />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
      <Footer />
    </div>
  );
};

export default ReportAnalysis;
