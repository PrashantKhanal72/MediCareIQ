import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  malariaPredict: null,
  fracturePredict: null,
  kidneyPredict: null,
  diabetesPredict: null,
  liverPredict: null,
  heartPredict: null,
}

const reportSlices = createSlice({
  name: "report",
  initialState,
  reducers: {
   setMalariaPredict: (state, action) => {
      state.malariaPredict = action.payload
   },
   setFracturePredict: (state, action) => {
      state.fracturePredict = action.payload
   },
   setKidneyPredict: (state, action) => {
      state.kidneyPredict = action.payload
   },
   setDiabetesPredict: (state, action) => {
      state.diabetesPredict = action.payload
   },
   setLiverPredict: (state, action) => {
      state.liverPredict = action.payload
   },
   setHeartPredict: (state, action) => {
      state.heartPredict = action.payload
   },
}})

export const { setMalariaPredict, setFracturePredict, setKidneyPredict, setDiabetesPredict, setLiverPredict, setHeartPredict } = reportSlices.actions

export default reportSlices.reducer
