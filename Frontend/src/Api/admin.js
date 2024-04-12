// Importing configured axios instance and Redux action creators
import axiosInstance from "../axios/axiosInstance";
import { setDoctorList } from "../redux-slices/doctorSlices";
import { error, success } from "../redux-slices/toastSlices";

// Function to retrieve list of doctors
export const getDoctorList = () => {
  return async (dispatch) => {
    axiosInstance
      .get(`/patient/get-doctors`) // Makes GET request to retrieve doctors
      .then((res) => {
        dispatch(setDoctorList(res.data.doctors)); // Dispatches action to store doctor list in Redux
      })
      .catch(() => {
        //       setLoading && setLoading(false)
        // catch error
      });
  };
};

// Function to create a new doctor account
export const createDoctorAccount = (data, setOpen) => {
  return async (dispatch) => {
    try {
      axiosInstance
        .post(`/admin/create-doctor`, data, { // Makes POST request to create doctor
          headers: {
            "Content-Type": "multi-part/form-data", // Sets appropriate content type for file data
          },
        })
        .then((res) => {
          dispatch(getDoctorList()); // Refreshes the doctor list
          setOpen(false);   // Close modal or dialog
        })
        .catch();
    } catch (err) {
      console.log("error", err);
    }
  };
};

// Function to delete a doctor account
export const deleteDoctorAccount = (dataId) => {
  return async (dispatch) => {
    try {
      axiosInstance
        .delete(`/admin/delete-doctor/${dataId}`)  // Makes DELETE request to remove doctor
        .then((res) => {
          dispatch(success("Deleted Successfully"));  // Dispatches success message
          dispatch(getDoctorList()); // Refreshes the doctor list
        })
        .catch((err) => {
          console.log(err)
          dispatch(error(err?.data?.message??'')); // Dispatches error message
        });
    } catch (err) {
      console.log("error", err);
      dispatch(error(err?.data?.message??''));
    }
  };
};

// Function to update a doctor account
export const updateDoctorAccount = (dataId, data, setOpen) => {
  return async (dispatch) => {
    try {
      axiosInstance
        .put(`/admin/update-doctor/${dataId}`, data) // Makes PUT request to update doctor details
        .then((res) => {
          dispatch(success("Doctor details updated Successfully")); // Dispatches success message
          setOpen(false)  // Close modal or dialog
          dispatch(getDoctorList());  // Refreshes the doctor list
        })
        .catch((err) => {
          console.log("err", err);
        });
    } catch (err) {
      console.log("error", err);
    }
  };
};
