import axiosInstance from "../axios/axiosInstance";
import { setLabList } from "../redux-slices/labSlices";

export const getLabList = () => {
        return async (dispatch) => {
          try {
            axiosInstance
              .get(`/patient/fetch-lab-data`)
              .then((res) => {
                dispatch(setLabList(res.data))
              })
              .catch((err) => {
                console.log("err", err);
              });
          } catch (err) {
            console.log("error", err);
          }
        };
      };

export const getResourcesList = () => {
        return async (dispatch) => {
          try {
            axiosInstance
              .get(`/patient/fetch-test-data`)
              .then((res) => {
                // dispatch(setResourceList(res.data))
                console.log('res', res)
              })
              .catch((err) => {
                console.log("err", err);
              });
          } catch (err) {
            console.log("error", err);
          }
        };
      };
