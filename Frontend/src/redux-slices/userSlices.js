import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  user: {}
}

const userSlices = createSlice({
  name: "user",
  initialState,
  reducers: {
   setUser: (state, action) => {
      state.user = action.payload
   },
}})

export const { setUser } = userSlices.actions

export default userSlices.reducer
