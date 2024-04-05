import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useAppDispatch } from "../redux/hook";
import { getResourcesList } from "../Api/lab";

const HealthResources = () => {
  const dispatch = useAppDispatch();

  useEffect(()=> {
   dispatch(getResourcesList())
  }, [])
  return (
    <>
      <Navbar />
      <Container>
        <Box py={5}>
          <h1>Health Resources</h1>
          <Grid container spacing={2}>
            <Grid item xs={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="194"
                  image="https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Paella dish"
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    Test Name
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="194"
                  image="https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Paella dish"
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    Test Name
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="194"
                  image="https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Paella dish"
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    Test Name
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="194"
                  image="https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Paella dish"
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    Test Name
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="194"
                  image="https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Paella dish"
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    Test Name
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default HealthResources;
