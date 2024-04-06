// Imports the axios library for making HTTP requests and js-cookie for cookie management
import axios from "axios";
import Cookies from "js-cookie";

// Defines the base URL for all API requests
export const base = "http://localhost:3001/api/v1";

export const fastApiUrl = "http://127.0.0.1:8000/api/v1";
// Instance for fast api request handle
export const fastInstance = axios.create({
   baseURL: fastApiUrl,
   headers: {
    Accept: "application/json",
    "Content-Type" : "application/json; charset=utf-8"
   }
})

// Creates a new Axios instance with a base URL and default headers for JSON requests
const axiosInstance = axios.create({
  baseURL: base, // The base URL for all requests made using this instance
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
  },
});

// Adds a request interceptor to the Axios instance
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      // If a token is found, it's appended to the Authorization header of the request
      config.headers = {
        ...config.headers,
        Authorization: token,
      };
    }
    return config; // Returns the modified config to be used for the request
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (error && error.response) {
      console.log('err', error)
    }

    return Promise.reject(error);
  }
);

// Adds a response interceptor to the Axios instance
axiosInstance.interceptors.response.use(
  (response) => {
    // For successful responses, just passes the response through
    return response;
  },
  function (error) {
    // Checks for unauthorized access (401 status code) in error responses
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
