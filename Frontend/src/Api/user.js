import axiosInstance from "../axios/axiosInstance";
import { setUser } from "../redux-slices/userSlices";

export const getUserProfile = () => {
  return async (dispatch) => {
    axiosInstance
      .get(`/user/profile`)
      .then((res) => {
        dispatch(setUser(res.data.profile[0]));
        console.log("res", res);
      })
      .catch(() => {
        //       setLoading && setLoading(false)
        // catch error
      });
  };
};
