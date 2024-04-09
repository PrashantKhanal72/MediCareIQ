import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Modal from "@mui/material/Modal";
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
import { Link } from "react-router-dom";

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
  console.log(openDetails ?? "");
  return (
    <Modal
      open={open} // Controls if the modal is open or closed
      onClose={onClose} // Function to call when closing the modal
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className=" flex flex-col items-center w-full justify-center">
          <h2 className="dt-card-name ">{`${openDetails[0]?.Name ?? ""}`}</h2>

          <div className="w-full flex justify-center my-2  gap-2 items-center">
            <h1 className="text-[16px] font-semibold">Video : </h1>{" "}
            <Link
              className="underline text-blue-500"
              to={openDetails[0]?.Video ?? ""}
            >
              {openDetails[0]?.Video ?? ""}
            </Link>
          </div>

          <div class="grid w-full grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-center">
                What the test is about?{" "}
              </h3>
              <p>{openDetails[0]?.Description ?? ""} </p>
            </div>
            <div className="flex flex-col gap-2 ">
              <h3 className="font-semibold text-center">
                How to prepare for test?{" "}
              </h3>
              <p>{openDetails[0]?.Preparation ?? ""} </p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-center">
                How the test is done?{" "}
              </h3>
              <p className="text-left">
                {openDetails[0]?.HowIsTestDone ?? ""}{" "}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-center">
                How long does the test results take?{" "}
              </h3>
              <p className="text-left">{openDetails[0]?.ResultTiming ?? ""} </p>
            </div>
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
