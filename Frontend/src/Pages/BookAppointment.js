// Importing necessary React and Material UI components
import React, { useEffect } from "react";
import Navbar from "../Components/Navbar/index";
import Doctors from "../Components/Doctor/Doctors";
import Footer from "../Components/Footer";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useAppDispatch } from "../redux/hook";
import { getDoctorList } from "../Api/admin";

// Home component definition
function Home() {
  
  const dispatch = useAppDispatch()  // used to dispatch data(state) in redux
  // State for managing the selected specialist type
  const [specialist, setSpecialist] = React.useState("");

  // Handler for when the specialist selection changes
  const handleChange = (event) => {
    setSpecialist(event.target.value);
  };

  useEffect(() => {
    dispatch(getDoctorList());
  }, []);

  // Rendering the home page
  return (
    <div className="home-section">
      <Navbar /> {/* Displaying the navigation bar at the top */}
      <h1>Steps to Book Appointment</h1> {/* Section title */}
      {/* Section for general physicians */}
      <Doctors sectionName={"General Physicians"} />
      <hr /> {/* Horizontal rule for visual separation */}
      {/* Section for specialist doctors, with dynamic specialist selection */}
      <Doctors sectionName={"Specialist"}>
        <h2> specialist button</h2>
        <div>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Specialist</InputLabel>
              {/* Dropdown for selecting a specialist type */}
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={specialist}
                label="Age"
                onChange={handleChange}
              >
                {/* Options for different types of specialists */}
                <MenuItem value={"Nephrologist"}>Nephrologist</MenuItem>
                <MenuItem value={"Gastoenterologist"}>Gastoenterologist</MenuItem>
                <MenuItem value={"Gynecologist"}>Gynecologist</MenuItem>
                <MenuItem value={"Dietician"}>Dietician</MenuItem>
                <MenuItem value={"Psychiatrist"}>Psychiatrist</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
      </Doctors>
      <Footer /> {/* Displaying the footer at the bottom */}
    </div>
  );
}

export default Home;
