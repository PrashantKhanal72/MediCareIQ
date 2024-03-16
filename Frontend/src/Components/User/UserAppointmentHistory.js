import { Container } from "@mui/material";
import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(
  doctor,
  appointmentDate,
  ConfirmationNumber,
  Validity,
  Payment
) {
  return {
    doctor,
    appointmentDate,
    ConfirmationNumber,
    Validity,
    Payment,
  };
}

const rows = [
  createData(
    "ShreeKrishna Joshi",
    "2023-05-12",
    "2443243423",
    "2023-05-12",
    "Khalti"
  ),
  createData(
    "Keshab Pradhan",
    "2023-06-28",
    "53534546564",
    "2023-05-12",
    "Fonepay"
  ),
  createData(
    "Bhanubhakta Shrestha",
    "2023-07-15",
    "343243543",
    "2023-05-12",
    "Fonepay"
  ),
  createData(
    "Sudeep Neupane",
    "2023-08-02",
    "3432434",
    "2023-05-12",
    "esewa"
  ),
];

const UserAppointmentHistory = () => {
  return (
    <div>
      <Container>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Doctor</TableCell>
                <TableCell>Appointment</TableCell>
                <TableCell>Confirmation Number</TableCell>
                <TableCell>Validty</TableCell>
                <TableCell>Payment</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.doctor}</TableCell>
                  <TableCell>{row.appointmentDate}</TableCell>
                  <TableCell>{row.ConfirmationNumber}</TableCell>
                  <TableCell>{row.Validity}</TableCell>
                  <TableCell>{row.Payment}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default UserAppointmentHistory;
