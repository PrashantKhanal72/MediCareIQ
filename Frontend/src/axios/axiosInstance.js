// Imports the axios library for making HTTP requests and js-cookie for cookie management
import axios from "axios";
import Cookies from "js-cookie";

// Defines the base URL for all API requests
export const base = "https://backend-medicare-7vod.onrender.com/api/v1";

export const fastApiUrl = "http://127.0.0.1:8000/api/v1";

// Axios Instance setup for fast api request handle
export const fastInstance = axios.create({
   baseURL: fastApiUrl,
   headers: {
    Accept: "application/json",
    "Content-Type" : "application/json; charset=utf-8"
   }
})

// Main Axios instance for regular backend with JSON preferences
const axiosInstance = axios.create({
  baseURL: base, // Sets the base URL for this instance
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
  },
});

// Request interceptor to add a token to every request if it exists
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token"); // Retrieves token from cookies
    if (token) {
      // If a token is found, it's appended to the Authorization header of the request
      config.headers = {
        ...config.headers,
        Authorization: token,
      };
    }
    return config; // Returns the updated configuration for the HTTP request
  },
  (error) => {
    Promise.reject(error); // Handles any request error
  }
);

// Response interceptor for logging and handling errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    return response; // Passes on the response if no errors
  },
  function (error) {
     // Log and reject the promise if an error occurs
    if (error && error.response) {
      console.log('err', error)
    }

    return Promise.reject(error);
  }
);

// Additional response interceptor for handling authentication errors
axiosInstance.interceptors.response.use(
  (response) => {
    // Directly returns the response for successful requests
    return response;
  },
  function (error) {
    // Redirects to home if a 401 unauthorized error occurs
    if (error.response && error.response.status === 401) {
      // If found, redirects the user to the home page for re-authentication
      // window.location.href = "/";
    }
    // For all other errors, rejects the promise with the error
    return Promise.reject(error);
  }
);

// Exports the configured Axios instance for use throughout the application
export default axiosInstance;
