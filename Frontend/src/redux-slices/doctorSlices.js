import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  doctors: [],
}

const doctorSlices = createSlice({
  name: "doctor",
  initialState,
  reducers: {
   setDoctorList: (state, action) => {
      state.doctors = action.payload
   },
}})

export const { setDoctorList } = doctorSlices.actions

export default doctorSlices.reducer
