import axiosInstance from "../axios/axiosInstance";
import { setUser } from "../redux-slices/userSlices";

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
