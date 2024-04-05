import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  role: null,
  userId: null,
  tokenDetails: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.isAuthenticated = true;
      state.role = action.payload.role;
      state.userId = action.payload.userId;
    },
    setLogout: (state) => {
      state.isAuthenticated = false;
      state.role = null;
      state.userId = null;
    },
    setTokenDetails: (state, action) => {
      state.tokenDetails = action.payload;
    },
  },
});

export const { setLogin, setLogout, setTokenDetails } = authSlice.actions;
export default authSlice.reducer;
