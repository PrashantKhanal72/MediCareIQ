import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  labs: [],
  resources: []
}

const labSlices = createSlice({
  name: "lab",
  initialState,
  reducers: {
   setLabList: (state, action) => {
      state.labs = action.payload
   },
   setResourceList: (state, action) => {
      state.resources = action.payload
   }
}})

export const { setLabList, setResourceList } = labSlices.actions

export default labSlices.reducer
