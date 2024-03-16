import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import LabDetails from "../Components/Labs/Labdetails";

import { Container, Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

import MenuItem from "@mui/material/MenuItem";


import labdata from "../Data/labs";

const NearestLabs = () => {
  const navigate = useNavigate();

  const [selectedLocation, setSelectedLocation] = useState("Kathmandu");
  const filteredLabs = labdata.filter((lab) =>
    lab.location.toLowerCase().includes(selectedLocation.toLowerCase())
  );

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const navigateToLabDetails = (labId) => {
    navigate(`/lab/${labId}`);
  };
  
  return (
    <>
      <Navbar />
      <Container>
        <Box>
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">City</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                value={selectedLocation}
                onChange={handleLocationChange}
              >
                <MenuItem value={"Kathmandu"}>Kathmandu</MenuItem>
                <MenuItem value={"Bhaktapur"}>Bhaktapur</MenuItem>
                <MenuItem value={"Biratnagar"}>Biratnagar</MenuItem>
                <MenuItem value={"Pokhara"}>Pokhara</MenuItem>
                <MenuItem value={"Palpa"}>Palpa</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Box py={5}>
          <h1>Nearest Labs</h1>
          <Grid container spacing={2}>
            {filteredLabs.map((lab) => (
              <Grid item xs={6} md={4} key={lab.name}>
                <Card>
                  <CardContent>
                  <Typography
                      variant="h5"
                      component="div"
                      onClick={() => navigateToLabDetails(lab.id)}
                      style={{ cursor: "pointer" }}
                    >
                      {lab.name}
                    </Typography>
                    <p>
                      Opening hours
                      <p>
                        <span>{lab.openingHours}</span>
                      </p>
                    </p>

                    <p>
                      Location
                      <p>
                        <span>{lab.location}</span>
                      </p>
                    </p>

                    <p>
                      Phone number
                      <p>
                        <span>{lab.phoneNumber}</span>
                      </p>
                    </p>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default NearestLabs;
