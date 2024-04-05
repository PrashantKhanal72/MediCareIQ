import axiosInstance from "../axios/axiosInstance";
import { setTokenDetails } from "../redux-slices/authSlices";
import { error } from "../redux-slices/toastSlices";
import { setVerifyMessage } from "../redux-slices/userSlices";

export const verifyConfirmationNumber = (data, setOpen) => {
  return async (dispatch) => {
    try {
      const res = await axiosInstance.post(`/patient/verify-token`, data);
      if (res?.data) {
        window.location.href = `/call-doctor/${data?.token}`;
      }
    } catch (err) {
      if (err?.response?.status === 404) {
        dispatch(error("Invalid Confirmation Number"));
      } else {
        dispatch(setVerifyMessage("Error"));
      }
    }
  };
};

export const checkConfirmationNumber = (data, setOpen) => {
  return async (dispatch) => {
    try {
      const res = await axiosInstance.post(`/patient/verify-token`, data);
      console.log('re', res)
      dispatch(setTokenDetails(res?.data));
    } catch (err) {
     console.log('err', err)
    }
  };
};
