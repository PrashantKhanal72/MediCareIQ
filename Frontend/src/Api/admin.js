import axiosInstance from "../axios/axiosInstance";
import { setDoctorList } from "../redux-slices/doctorSlices";
import { error, success } from "../redux-slices/toastSlices";

export const getDoctorList = () => {
  return async (dispatch) => {
    axiosInstance
      .get(`/patient/get-doctors`)
      .then((res) => {
        dispatch(setDoctorList(res.data.doctors));
      })
      .catch(() => {
        //       setLoading && setLoading(false)
        // catch error
      });
  };
};

export const createDoctorAccount = (data, setOpen) => {
  return async (dispatch) => {
    try {
      axiosInstance
        .post(`/admin/create-doctor`, data, {
          headers: {
            "Content-Type": "multi-part/form-data",
          },
        })
        .then((res) => {
          dispatch(getDoctorList());
          setOpen(false);
        })
        .catch();
    } catch (err) {
      console.log("error", err);
    }
  };
};

export const deleteDoctorAccount = (dataId) => {
  return async (dispatch) => {
    try {
      axiosInstance
        .delete(`/admin/delete-doctor/${dataId}`)
        .then((res) => {
          dispatch(success("Deleted Successfully"));
          dispatch(getDoctorList());
        })
        .catch((err) => {
          console.log(err)
          dispatch(error(err?.data?.message??''));
        });
    } catch (err) {
      console.log("error", err);
      dispatch(error(err?.data?.message??''));
    }
  };
};

export const updateDoctorAccount = (dataId, data, setOpen) => {
  return async (dispatch) => {
    try {
      axiosInstance
        .put(`/admin/update-doctor/${dataId}`, data)
        .then((res) => {
          dispatch(success("Doctor details updated Successfully"));
          setOpen(false)
          dispatch(getDoctorList());
        })
        .catch((err) => {
          console.log("err", err);
        });
    } catch (err) {
      console.log("error", err);
    }
  };
};
