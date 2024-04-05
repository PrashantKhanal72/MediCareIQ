import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  doctors: [],
  schedules: [],
  patientList: []
}

const doctorSlices = createSlice({
  name: "doctor",
  initialState,
  reducers: {
   setDoctorList: (state, action) => {
      state.doctors = action.payload
   },
   setScheduleList: (state, action) => {
      state.schedules = action.payload
   },
   setPatientList: (state, action) => {
      state.patientList = action.payload
   }
}})

export const { setDoctorList, setScheduleList, setPatientList } = doctorSlices.actions

export default doctorSlices.reducer
