import axios from "axios"; // Import axios for making HTTP requests
import { base } from "../axios/axiosInstance"; // Base URL for API requests
import { jwtDecode } from "jwt-decode"; // Function to decode JWT tokens
import moment from "moment"; // Library for handling dates and times
import Cookies from "js-cookie";
import { setLogin } from "../redux-slices/authSlices"; // Redux action to set login state
import { checkUserDetails } from "../utils/checkUserDetails"; // Utility function to check user details
import { toast } from "react-toastify"; // Importing toast to display alerts
import { error, success } from "../redux-slices/toastSlices"; // Redux actions for showing success or error toasts


// Function to log in a user
export const login = (data) => {
  return async (dispatch) => {
    try {
      // Sends a POST request to the login endpoint using axios with the user's data
      const res = await axios.post(`${base}/user/login`, data);

      // Decode the JWT token from response if it exists, otherwise an empty object
      const decode = res.data.token? jwtDecode(res.data.token) : {};

      // Calculates the expiration date of the token  and convert it to a JavaScript Date object
      const exp = moment(decode.exp * 1000).toDate();

      // Sets a cookie with the token, expiring when the token expires
      Cookies.set("token", res.data.token, { expires: exp });

     // Dispatch a success message using redux-toastify
      dispatch(success("Login Successfully"));

      // Dispatch the setLogin action with user ID and user type to Redux store.
      dispatch(setLogin({ userId: decode.user_id, role: decode.user_type }));

      // Call a utility function to perform further user details check
      checkUserDetails(decode);
    } catch (err) {
      // Error handling: if there's a specific message in the response, dispatch it; otherwise, a general error message
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
      // Dispatch the setLogin action with user ID and user type to Redux store
      dispatch(setLogin({ userId: decode.user_id, role: decode.user_type }));
      checkUserDetails(decode);
    } catch (err) {
      console.log("error:", err);
    }
  };
};

// Function to log out the user
export const logoutUser = async () => {
  // Remove the 'token' cookie
  Cookies.remove("token");
  // Redirect the user to the homepage
  window.location.href = "/";
};
