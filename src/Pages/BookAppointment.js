import React from "react";
import Navbar from "../Components/Navbar/index";
import Doctors from "../Components/Doctor/Doctors";
import Footer from "../Components/Footer";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function Home() {
  const [specialist, setSpecialist] = React.useState("");

  const handleChange = (event) => {
    setSpecialist(event.target.value);
  };

  return (
    <div className="home-section">
      <Navbar />
      <h1>Steps to Book Appointment</h1>
      <Doctors sectionName={"General Physicians"} />
      <hr />
      <Doctors sectionName={"Specialist"}>
        <h2> specialist button</h2>
        <div>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Specialist</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={specialist}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={"Nephrologist"}>Nephrologist</MenuItem>
                <MenuItem value={"Gastoenterologist"}>
                  Gastoenterologist
                </MenuItem>
                <MenuItem value={"Gynecologist"}>Gynecologist</MenuItem>
                <MenuItem value={"Dietician"}>Dietician</MenuItem>
                <MenuItem value={"Psychiatrist"}>Psychiatrist</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
      </Doctors>
      <Footer />
    </div>
  );
}

export default Home;
