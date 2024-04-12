import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import LabDetails from "../Components/Labs/Labdetails";

import { Container, Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

import MenuItem from "@mui/material/MenuItem";

import labdata from "../Data/labs";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { getLabList } from "../Api/lab";

const NearestLabs = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [labData, setLabData] = useState([]);

  const { labs } = useAppSelector((state) => state.labs);

  useEffect(() => {
    dispatch(getLabList());
  }, []);

  useEffect(() => {
    setLabData(labs);
  }, [labs]);

  const dataArray = Object.values(labData);

  const [selectedLocation, setSelectedLocation] = useState("Kathmandu");
  const filteredLabs = dataArray?.filter((lab) =>
    lab?.location?.toLowerCase()?.includes(selectedLocation.toLowerCase())
  );

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const navigateToLabDetails = (labId) => {
    navigate(`/lab/${labId}`);
  };

  console.log("filtered Data", filteredLabs);

  return (
    <>
      <Navbar />
      <Container>
        <Box>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">City</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                value={selectedLocation}
                onChange={handleLocationChange}
              >
                <MenuItem value={"Kathmandu"}>Kathmandu</MenuItem>
                <MenuItem value={"Bhaktapur"}>Bhaktapur</MenuItem>
                <MenuItem value={"Biratnagar"}>Biratnagar</MenuItem>
                <MenuItem value={"Pokhara"}>Pokhara</MenuItem>
                <MenuItem value={"Palpa"}>Palpa</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Box py={5}>
          {/* <h1>Nearest Labs</h1> */}
          <div className="grid w-full grid-cols-2 gap-6">
            {filteredLabs.map((lab) => (
              <div className="p-6 rounded-2xl border-green-600  border-[2px] flex flex-col gap-3">
                <h1 className="text-[20px] font-bold text-blue-800">
                  {lab?.name ?? ""}
                </h1>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col">
                    <p className="text-[15px] font-medium text-gray-600">
                      Opening Time
                    </p>

                    {lab?.openingHours?.split(",").map((item) => {
                      return (
                        <p className="font-semibold text-[17px]">{item}</p>
                      );
                    })}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex flex-col">
                    <p className="text-[15px] font-medium text-gray-600">
                      Location
                    </p>
                    <p className="font-semibold text-[17px]">{lab?.location}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex flex-col gap-1">
                    <p className="text-[15px] font-medium text-gray-600">
                      Contact
                    </p>
                    <p className="font-semibold text-[17px]">
                      {lab?.phoneNumber ?? ""}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex flex-col">
                    <p className="text-[18px] font-bold text-center text-green-600">
                      Available Test
                    </p>
                    <div className="flex flex-col w-full">
                      {lab?.availableTests?.map((item) => {
                        return (
                          <div className="flex justify-between">
                            <p className="font-semibold">{item?.testName ?? ""} </p>
                            <p className="text-[18px]  font-medium">{item?.testPrice ?? ""} </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                
              </div>
            ))}
          </div>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default NearestLabs;
