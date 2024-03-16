import React, { useState } from "react";
import Navbar from "../Components/Navbar/index";
import Footer from "../Components/Footer";

import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { Container, Stack, Box } from "@mui/material";

const ReportAnalysis = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="home-section">
      <Navbar />
      <h1>Report Analysis</h1>

      <Container maxWidth="sm">
        <Box pb={3}>
          <Stack spacing={2}>
            <Button variant="outlined" component="label">
              Upload File
              <input type="file" hidden onChange={handleImageChange} />
            </Button>
          </Stack>
        </Box>

        <Divider />

        {selectedImage && (
            <div>
              <h2>Selected Image</h2>
              <img
                src={selectedImage}
                alt="Selected"
                style={{ maxWidth: "300px" }}
              />
            </div>
          )}

        <Box py={5}>
          <Stack spacing={3}>
            <Button variant="contained">Predict</Button>
          </Stack>

  
        </Box>
      </Container>

      <Footer />
    </div>
  );
};

export default ReportAnalysis;
