import axios from "axios";
import { base } from "../axios/axiosInstance";
import { jwtDecode } from "jwt-decode";
import moment from "moment";
import Cookies from "js-cookie";
import { setLogin } from "../redux-slices/authSlices";
import { checkUserDetails } from "../utils/checkUserDetails";
import { toast } from "react-toastify";
import { error, success } from "../redux-slices/toastSlices";

// axios is library

// Function to log in a user
export const login = (data) => {
  return async (dispatch) => {
    try {
      // Sends a POST request to the login endpoint with the user's data
      const res = await axios.post(`${base}/user/login`, data);

      // Decodes the refresh token if it exists
      const decode = res.data.token? jwtDecode(res.data.token) : {};
      // Calculates the expiration date of the token
      const exp = moment(decode.exp * 1000).toDate();
      // Sets a cookie with the token, expiring when the token expires
      Cookies.set("token", res.data.token, { expires: exp });
      // Redirects the user to the home page
      dispatch(success("Login Successfully"))
      dispatch(setLogin({ userId: decode.user_id, role: decode.user_type }));
      checkUserDetails(decode);
    } catch (err) {
      if(err?.response && err?.response?.data ){
        dispatch(error(err?.response?.data?.message??''))
      }else{
        dispatch(error('Something went wrong'))
      }
    }
  };
};

// Function to register a new user
export const registerUser = (data) => {
  return async (dispatch) => {
    try {
      // Sends a POST request to the register endpoint with the user's data
      const res = await axios.post(`${base}/user/register-no-profile`, data 
      );
      // Calculates the expiration date of the token

      // Sets a cookie with the token, expiring when the token expires

      const decode = res.data.token ? jwtDecode(res.data.token) : {};
      const exp = moment(decode.exp * 1000).toDate();

      Cookies.set("token", res.data.token, { expires: exp });
      dispatch(setLogin({ userId: decode.user_id, role: decode.user_type }));
      checkUserDetails(decode);
    } catch (err) {
      console.log("error:", err);
    }
  };
};

// Function to log out the user
export const logoutUser = async () => {
  Cookies.remove("token");
  window.location.href = "/";
};
