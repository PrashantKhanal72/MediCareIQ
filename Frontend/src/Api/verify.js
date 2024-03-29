import axiosInstance from "../axios/axiosInstance";
import { setVerifyMessage } from "../redux-slices/userSlices";

export const verifyConfirmationNumber = (data, setOpen) => {
  return async (dispatch) => {
    try {
      axiosInstance
        .post(`/patient/verify-token`, data)
        .then((res) => {
                window.location.href = `/call-doctor/${data?.token}`
        })
        .catch((err) => {
          if (err?.response?.status === 404) {
            dispatch(setVerifyMessage("Invalid Confirmation Number"));
          } else {
            dispatch(setVerifyMessage("Error"));
          }
        });
    } catch (err) {
      if (err?.response?.status === 404) {
        dispatch(setVerifyMessage("Invalid Confirmation Number"));
      } else {
        dispatch(setVerifyMessage("Error"));
      }
      dispatch("");
    }
  };
};
