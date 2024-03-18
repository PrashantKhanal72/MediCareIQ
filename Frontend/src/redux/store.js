import { configureStore } from '@reduxjs/toolkit'
import authSlices from '../redux-slices/authSlices'
import doctorSlices from '../redux-slices/doctorSlices'

export const store = configureStore({
  reducer: {
    auth: authSlices,
    doctor: doctorSlices
  },
})
