import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  doctors: [],
  schedules: []
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
   }
}})

export const { setDoctorList, setScheduleList } = doctorSlices.actions

export default doctorSlices.reducer
