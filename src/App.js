import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./CSS/main.css";
import Home from "./Pages/Home";
// import Legal from "./Pages/Legal";
// import NotFound from "./Pages/NotFound";
import BookAppointment from "./Pages/BookAppointment";

function App() {
  return (
    <div className="App">
      <Router >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bookappointment" element={<BookAppointment />} />
          {/* <Route path="/legal" element={<Legal />} />
          <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
