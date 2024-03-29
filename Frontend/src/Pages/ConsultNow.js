// Importing necessary React components and Material UI components for UI design
import React, { useEffect } from "react";
import Navbar from "../Components/Navbar/index";
import Footer from "../Components/Footer";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import { Container, Stack, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { verifyConfirmationNumber } from "../Api/verify";
import { paymentList } from "../Api/payment";

// Defining the ConsultNow component
const ConsultNow = () => {
   const dispatch = useAppDispatch()
   const { register, handleSubmit } = useForm()
   const { verifyMessage} = useAppSelector(state => state.user)

   const submitData = (data)=> {
      dispatch(verifyConfirmationNumber(data))
   }

  return (
    <div className="home-section">
      <Navbar /> {/* Displaying the navigation bar at the top */}
      <h1>Enter Confirmation Number</h1> {/* Section title for entering confirmation number */}
       <form onSubmit={handleSubmit(submitData)}>
      <Container maxWidth="sm">
        {/* Container to limit the width of the content */}
        <Box pb={3}>
          {/* Box component for spacing */}
          <Stack spacing={2}>
            {/* Stack for vertical layout with consistent spacing */}
            <TextField
              {...register('token')}
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            /> {/* Input field for entering the confirmation number */}
            <Button type="submit" variant="contained">Start Video Consultation</Button>
            {/* Button to initiate the video consultation */}
          </Stack>
        </Box>

        <Divider /> {/* Visual divider between sections */}

        <Box py={5} >
          {/* Box component for spacing around the next section */}
          <Stack spacing={3}>
            {/* Another Stack for vertical layout with slightly larger spacing */}
            <p>
              If you do not have a confirmation number, please book an appointment to
              consult with a doctor.
            </p> {/* Informative text */}
            <Button variant="outlined">Book Appointment</Button>
            {/* Button to navigate to the appointment booking page */}
          </Stack>
        </Box>
      </Container>
      </form>
      <Footer /> {/* Displaying the footer at the bottom */}
    </div>
  );
};

export default ConsultNow;
