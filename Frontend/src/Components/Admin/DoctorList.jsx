import { Button } from "@mui/material";
import { useState } from "react";
import AddModal from "../modal/AddModal";
import AddDoctor from "./AddDoctor";
import { useAppSelector } from "../../redux/hook";
import CustomizedTables from "../Table/CustomizableTable";
import DoctorTableBody from "./DoctorTableBody";

const heading = [
  {
    title: "Name",
  },
  {
    title: "Specialist",
  },
  {
    title: "Gender",
  },
  {
    title: "",
  },
  {
    title: "",
  },
];

const DoctorList = () => {
  const [addDoctor, setAddDoctor] = useState(false);
  const { doctors } = useAppSelector((state) => state.doctor);

  return (
    <div className="w-full p-4">
      <div className="mb-10" onClick={() => setAddDoctor(true)}>
        <Button variant="contained">Add Doctor</Button>
      </div>
      <div className="w-full">
        {/* This is table component */}
        <CustomizedTables heading={heading}>
          <DoctorTableBody data={doctors} />
        </CustomizedTables>
      </div>
      {/* The form to create new Doctor */}
      <AddModal
        open={addDoctor}
        onClose={() => setAddDoctor(false)}
        title="Add Doctor"
      >
        <AddDoctor setIsOpen={setAddDoctor} />
      </AddModal>

    </div>
  );
};

export default DoctorList;
