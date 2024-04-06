import { useEffect } from "react"
import { getPatientListByDocotor } from "../../../Api/doctor"
import { useAppDispatch, useAppSelector } from "../../../redux/hook"
import CustomizedTables from "../../Table/CustomizableTable"
import PatientTableBody from "./PatientTableBody";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const heading = [
  {
    title: "Patinet Name",
  },
  {
    title: "",
  },
  {
    title: "",
  },
];

const PatientList = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const {  patientList } = useAppSelector(state => state.doctor);

  useEffect(()=> {
     dispatch(getPatientListByDocotor())
  }, [])

  return (
    <div className="w-full p-4">
    {/* <div className="mb-10" onClick={() => setAddSchedule(true)}>
      <Button variant="contained">Create Schedule</Button>
    </div> */}
     <div className="mb-10" >
    <Button variant="outlined" onClick={()=> navigate(`/video-call`)}>Join Video Call</Button>
    </div>
    <div className="w-full">
      {/* This is table component */}
      <CustomizedTables heading={heading}>
        <PatientTableBody data={patientList} />
      </CustomizedTables>
    </div>
    {/* The form to create new Doctor */}
  </div>
  )
}

export default PatientList