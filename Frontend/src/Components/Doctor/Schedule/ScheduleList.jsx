import { useState } from "react";
import { useAppSelector } from "../../../redux/hook";
import { Button } from "@mui/material";
import CustomizedTables from "../../Table/CustomizableTable";
import ScheduleTableBody from "./ScheduleTableBody";
import AddModal from "../../modal/AddModal";
import AddSchedule from "./AddSchedule";

const ScheduleList = () => {
  const [addSchedule, setAddSchedule] = useState();
  const { schedules } = useAppSelector(state => state.doctor);

  const heading = [
    {
      title: "Available Date",
    },
    {
      title: "Start Time",
    },
    {
      title: "End Time",
    },
    {
      title: "",
    },
  ];

  return (
    <div className="w-full p-4">
      <div className="mb-10" onClick={() => setAddSchedule(true)}>
        <Button variant="contained">Create Schedule</Button>
      </div>
      <div className="w-full">
        {/* This is table component */}
        <CustomizedTables heading={heading}>
          <ScheduleTableBody data={schedules} />
        </CustomizedTables>
      </div>
      {/* The form to create new Doctor */}
      <AddModal
        open={addSchedule}
        onClose={() => setAddSchedule(false)}
        title="Add Schedule"
      >
        <AddSchedule setIsOpen={setAddSchedule} />
      </AddModal>
    </div>
  );
};

export default ScheduleList;
