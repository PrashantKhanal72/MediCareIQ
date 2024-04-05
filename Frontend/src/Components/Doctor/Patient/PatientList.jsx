import { useEffect, useState } from "react"
import { getPatientListByDocotor } from "../../../Api/doctor"
import { useAppDispatch, useAppSelector } from "../../../redux/hook"
import CustomizedTables from "../../Table/CustomizableTable"
import PatientTableBody from "./PatientTableBody";



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

  const {  patientList } = useAppSelector(state => state.doctor);

  useEffect(()=> {
     dispatch(getPatientListByDocotor())
  }, [])

  console.log('patienwi ', patientList)

  return (
    <div className="w-full p-4">
    {/* <div className="mb-10" onClick={() => setAddSchedule(true)}>
      <Button variant="contained">Create Schedule</Button>
    </div> */}
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