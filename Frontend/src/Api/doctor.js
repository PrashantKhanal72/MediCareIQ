import axiosInstance from "../axios/axiosInstance";
import { setScheduleList } from "../redux-slices/doctorSlices";

export const createSchedule = (data, setOpen) => {
  return async (dispatch) => {
    try {
      axiosInstance
        .post(`/doctor/create-schedule`, data)
        .then((res) => {
          dispatch(getScheduleList());
          setOpen(false);
        })
        .catch();
    } catch (err) {
      console.log("error", err);
    }
  };
};

export const getScheduleList = () => {
  return async (dispatch) => {
    axiosInstance
      .get(`/doctor/get-all-schedules`)
      .then((res) => {
        dispatch(setScheduleList(res.data.schedules));
      })
      .catch(() => {
        //       setLoading && setLoading(false)
        // catch error
      });
  };
};
