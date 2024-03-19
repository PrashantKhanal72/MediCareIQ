import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { Container, Stack, Box } from "@mui/material";
import { useState } from "react";

const Malaria = () => {
         // State hook for managing the selected image.
  const [selectedImage, setSelectedImage] = useState(null);

  // Function to handle the change event when a new file is selected.
 const handleImageChange = (event) => {
   const file = event.target.files[0]; // Access the file selected by the user.
   if (file) { // Check if a file is selected.
     const reader = new FileReader(); // Create a FileReader to read the file.
     reader.onload = () => { // Set the onload event handler.
       setSelectedImage(reader.result); // Update the state with the base64 encoded image.
     };
     reader.readAsDataURL(file); // Read the file as a data URL.
   }
 };
        
  return (
    <div className="mt-10">
        
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
    </div>
  )
}

export default Malaria
