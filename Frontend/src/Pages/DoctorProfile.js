import React from "react";
import Navbar from "../Components/Navbar/index";
import Footer from "../Components/Footer";

import Avatar from "@mui/material/Avatar";
import { Container, Stack, Box, Card, CardContent } from "@mui/material";
import Typography from "@mui/material/Typography";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("2023-05-12", "09:45AM", "CN123456", "John doe"),
  createData("2023-06-28", "02:30PM", "CN789012", "Jane Smith"),
  createData("2023-07-15", "11:15AM", "CN345678", "Alex Johnson"),
  createData("2023-08-02", "04:00PM", "CN901234", "Emily Williams"),
];

const DoctorProfile = () => {
  return (
    <>
      <Navbar />
      <Container>
        <Box py={5}>
          <Stack>
            <Avatar
              alt="Remy Sharp"
              src="https://images.pexels.com/photos/19218034/pexels-photo-19218034/free-photo-of-smiling-doctor-in-a-lab-coat-and-with-a-stethoscope.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              sx={{ width: 120, height: 120 }}
            />
            <h5>Dr. John Doe</h5>
            <p> Gynecologist</p>
          </Stack>
        </Box>

        <Box py={5}>
          <h2>Notifications</h2>
          <Stack gap={1}>
            <Card variant="outlined">
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                  New patient has booked your time for monday
                </Typography>
              </CardContent>
            </Card>
            <Card variant="outlined">
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                  New patient has booked your time for monday
                </Typography>
              </CardContent>
            </Card>
          </Stack>
        </Box>

        <Box py={5}>
          <h2>Upcoming Consultations</h2>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell align="right">Time</TableCell>
                  <TableCell align="right">Consultation Number</TableCell>
                  <TableCell align="right">Patient Profile</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box py={5}>
          <h2>Past Consultations</h2>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell align="right">Time</TableCell>
                  <TableCell align="right">Consultation Number</TableCell>
                  <TableCell align="right">Patient Profile</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default DoctorProfile;
