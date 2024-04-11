import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { Container, Stack, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { malariaAnalysis } from "../../Api/reportAnalysis";
import { setMalariaPredict } from "../../redux-slices/reportSlices";

const Malaria = ({ currentTab }) => {
  // State hook for managing the selected image.
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const dispatch = useAppDispatch();
  const { malariaPredict } = useAppSelector((state) => state.report); // fetch data from store
  const [prediction, setPrediction] = useState("");

  // Function to handle the change event when a new file is selected.
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file); // Access the file selected by the user.
    if (file) {
      // Check if a file is selected.
      const reader = new FileReader(); // Create a FileReader to read the file.
      reader.onload = () => {
        // Set the onload event handler.
        setSelectedImage(reader.result); // Update the state with the base64 encoded image.
      };
      reader.readAsDataURL(file); // Read the file as a data URL.
    }
  };

  const predictImage = () => {
    if (imageFile) {
      dispatch(malariaAnalysis({ file: imageFile }));
    }
  };

  useEffect(() => {
    if (malariaPredict !== null) {
      if (malariaPredict === 1) setPrediction("High");
      else if (malariaPredict === 0) setPrediction("Low");
    } else {
      setPrediction("");
    }
  }, [malariaPredict]);

  useEffect(() => {
    if (currentTab !== 1) dispatch(setMalariaPredict(null));
  }, [currentTab]);

  return (
    <div className="mt-10">
    <p className="p-7">Malaria is a life-threatening disease caused by parasites from infected Anopheles mosquitoes. It can cause fever, chills, and flu-like symptoms, leading to severe complications and death if not treated properly. The Lister Hill National Center for Biomedical Communications (LHNCBC) has developed a dataset for image processing, featuring thin blood smear slide images, used for malaria detection. This dataset aids in developing machine learning models to automatically detect and classify malaria-infected cells, facilitating rapid and accurate diagnoses.</p>
    <br/>
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
            <Button onClick={predictImage} variant="contained">
              Predict
            </Button>
          </Stack>
        </Box>
      </Container>
      {prediction ? (
        <h1
          className={`!py-0 text-[20px] font-semibold ${
            prediction === "High" ? "text-red-600" : "text-yellow-500"
          }`}
        >
          Your chances of getting diesease is {prediction}
        </h1>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Malaria;
