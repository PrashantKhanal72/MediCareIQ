import axios from "axios";
import axiosInstance, { base } from "../axios/axiosInstance";
import { setPaymentList } from "../redux-slices/userSlices";

export const payKhalti = (data) => {
  return async (dispatch) => {
    try {
      axiosInstance
        .post(`/patient/pay`, data)
        .then((res) => {
          window.location.href = `${res?.data?.message?.payment_url}`;
          console.log("response", res);
        })
        .catch();
    } catch (err) {
      console.log("error", err);
    }
  };
};

export const clearToken = (data) => {
  return async (dispatch) => {
    try {
      axiosInstance
        .post(`/doctor/clear-token`, data)
        .then((res) => {
          console.log("response", res);
        })
        .catch((err) => {
          console.log("err", err);
        });
    } catch (err) {
      console.log("error", err);
    }
  };
};

export const paymentList = (data) => {
  return async (dispatch) => {
    try {
      axiosInstance
        .get(`/patient/get-payment-list`)
        .then((res) => {
          dispatch(setPaymentList(res.data));
        })
        .catch((err) => {
          console.log("err", err);
        });
    } catch (err) {
      console.log("error", err);
    }
  };
};
