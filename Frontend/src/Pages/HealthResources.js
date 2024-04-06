import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Modal from "@mui/material/Modal";
import YouTube from 'react-youtube';
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { getResourcesList } from "../Api/lab";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  padding: "12px",
};

const ModalComp = function ({ open, onClose, openDetails }) {
  if (!openDetails) return <></>;

  return (
    <Modal
      open={open} // Controls if the modal is open or closed
      onClose={onClose} // Function to call when closing the modal
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className=" flex flex-col items-center w-full justify-center">
          <h2 className="dt-card-name">{`${openDetails[0]?.Name ?? ""}`}</h2>

            <div>
              
            </div>
        </div>
      </Box>
    </Modal>
  );
};

const HealthResources = () => {
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false); // used to open the model when clicked
  const [openDetails, setOpenDetails] = useState(null);
  const [testResource, setTestResource] = useState([]);

  const { resources } = useAppSelector((state) => state.labs);

  useEffect(() => {
    // Grouping data by TestID
    const groupData = resources.reduce((acc, item) => {
      const { TestID } = item;
      if (!acc[TestID]) {
        acc[TestID] = [];
      }
      acc[TestID].push(item);
      return acc;
    }, {});

    // Converting groupedData object into an array of arrays
    const result = Object.values(groupData);
    setTestResource(result);
  }, [resources]);

  useEffect(() => {
    dispatch(getResourcesList());
  }, []);

  const handleOpen = (e, items) => {
    e.preventDefault();
    setOpenDetails(items);
    setOpen(true);
  };

  const handleCloseModal = () => setOpen(false);

  return (
    <>
      <Navbar />
      <Container>
        <Box py={5}>
          <h1>Health Resources</h1>
          <Grid container spacing={4}>
            {testResource?.map((item, index) => {
              return (
                <Grid key={index} item xs={6} md={4}>
                  <Card>
                    <div onClick={(e) => handleOpen(e, item)}>
                      <CardMedia
                        component="img"
                        height="194"
                        image={item[0]?.Image ?? ""}
                        alt="Paella dish"
                      />
                      <CardContent>
                        <Typography variant="h5" component="div">
                          {item[0]?.Name ?? ""}
                        </Typography>
                      </CardContent>
                    </div>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Container>
      <Footer />

      <ModalComp
        open={open}
        onClose={handleCloseModal}
        openDetails={openDetails}
      />
    </>
  );
};

export default HealthResources;
