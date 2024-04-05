import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toast: {
    type: "",
    message: "",
  },
};

const toastSlices = createSlice({
  name: "toast",
  initialState,
  reducers: {
    success: (state, action) => {
      state.toast = {
        type: "success",
        message: action.payload,
      };
    },
    error: (state, action) => {
      state.toast = {
        type: "error",
        message: action.payload,
      };
    },
    remove: (state) => {
        state.toast = {
          ...state.toast,
          type: "",
          message: ""
        }
      }
  },
});

export const { success, error, remove } = toastSlices.actions;

export const toast = {
  success,
  error,
  remove
};

export default toastSlices.reducer;
