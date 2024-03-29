import { configureStore } from '@reduxjs/toolkit'
import authSlices from '../redux-slices/authSlices'
import doctorSlices from '../redux-slices/doctorSlices'
import userSlices from '../redux-slices/userSlices'
import reportSlices from '../redux-slices/reportSlices'

export const store = configureStore({
  reducer: {
    auth: authSlices,
    doctor: doctorSlices,
    user: userSlices,
    report: reportSlices
  },
})
