import React from "react";
import Navbar from "../Components/Navbar/index";
import Footer from "../Components/Footer";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import { Container, Stack, Box } from "@mui/material";

const ConsultNow = () => {
  return (
    <div className="home-section">
      <Navbar />
      <h1>Enter Confirmation Number</h1>

      <Container maxWidth="sm">
        <Box pb={3}>
          <Stack spacing={2}>
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <Button variant="contained">Start Video Consultation</Button>
          </Stack>
        </Box>

        <Divider />

        <Box py={5} >
          <Stack spacing={3}>
            <p>
              If you do not have confirmation number Please Book Appointment to
              consult with Doctor
            </p>

            <Button variant="outlined">Book Appointment</Button>
          </Stack>
        </Box>
      </Container>

      <Footer />
    </div>
  );
};

export default ConsultNow;
