import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  user: null,
  verifyMessage: '',
  paymentList: [],
  prescriptionList: []
}

const userSlices = createSlice({
  name: "user",
  initialState,
  reducers: {
   setUser: (state, action) => {
      state.user = action.payload
   },
   setVerifyMessage: (state, action) => {
      state.verifyMessage = action.payload
   },
   setPaymentList: (state, action) => {
      state.paymentList = action.payload
   },
   setPrescription: (state, action) => {
      state.prescriptionList = action.payload
   },
}})

export const { setUser, setVerifyMessage, setPaymentList, setPrescription } = userSlices.actions

export default userSlices.reducer
