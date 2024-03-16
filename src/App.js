import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./CSS/main.css";
import Home from "./Pages/Home";
import BookAppointment from "./Pages/BookAppointment";
import ConsultNow from "./Pages/ConsultNow";
import DoctorProfile from "./Pages/DoctorProfile";
import HealthResources from "./Pages/HealthResources";
import NearestLabs from "./Pages/NearestLabs";

import LabDetails from "./Components/Labs/Labdetails";
import ReportAnalysis from "./Pages/ReportAnalysis";
import UserProfile from "./Pages/UserProfile";

function App() {
  return (
    <div className="App">
      <Router >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bookappointment" element={<BookAppointment />} />
          <Route path="/consultnow" element={<ConsultNow />} />
          <Route path="/doctorprofile" element={<DoctorProfile />} />
          <Route path="/healthresources" element={<HealthResources />} />
          <Route path="/nearesetlabs" element={<NearestLabs />} />
          <Route path="/lab/:labId" element={<LabDetails />} />
          <Route path="/reportanalysis" element={<ReportAnalysis />} />
          <Route path="/user/:userId" element={<UserProfile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
