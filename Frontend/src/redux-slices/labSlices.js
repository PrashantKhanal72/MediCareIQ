import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  labs: [],
}

const labSlices = createSlice({
  name: "doctor",
  initialState,
  reducers: {
   setLabList: (state, action) => {
      state.labs = action.payload
   },
   setResourceList: (state, action) => {
      state.labs = action.payload
   }
}})

export const { setLabList, setResourceList } = labSlices.actions

export default labSlices.reducer
