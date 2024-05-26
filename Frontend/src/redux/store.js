import { configureStore } from '@reduxjs/toolkit'
import authSlices from '../redux-slices/authSlices'
import doctorSlices from '../redux-slices/doctorSlices'
import userSlices from '../redux-slices/userSlices'
import reportSlices from '../redux-slices/reportSlices'
import toastSlices from '../redux-slices/toastSlices'
import labSlices from '../redux-slices/labSlices'

// Configure the Redux store by combining all the slices  with an object containing a reducer property.
export const store = configureStore({
    // Define the reducer object that combines the slices
    // key (slice of the state): value (reducer function from the slice)
  reducer: {
    auth: authSlices,
    doctor: doctorSlices,
    user: userSlices,
    report: reportSlices,
    toast: toastSlices,
    labs: labSlices
  },
})
