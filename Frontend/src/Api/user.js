import axiosInstance from "../axios/axiosInstance";
import { setPrescription, setUser } from "../redux-slices/userSlices";

export const getUserProfile = () => {
  return async (dispatch) => {
    await axiosInstance
      .get(`/user/profile`)
      .then((res) => {
        dispatch(setUser(res.data.profile[0]));
      })
      .catch((err) => {
        dispatch(setUser(null))
      });
  };
};

export const getPrescriptionList = () => {
  return async (dispatch) => {
    await axiosInstance
      .get(`patient/fetch-prescriptions`)
      .then((res) => {
        dispatch(setPrescription(res?.data))
      })
      .catch((err) => {
        dispatch(setUser(null))
      });
  };
};
