import { fastInstance } from "../axios/axiosInstance";
import {
  setDiabetesPredict,
  setFracturePredict,
  setHeartPredict,
  setKidneyPredict,
  setLiverPredict,
  setMalariaPredict,
} from "../redux-slices/reportSlices";

// to send the file such as image or file we need to add Content-type = multipart/form-data
export const fractureAnalysis = (data, callBack) => {
  return async (dispatch) => {
    try {
      fastInstance
        .post("/fracture/predict", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          dispatch(setFracturePredict(res?.data?.prediction["0"] ?? ""));
          callBack && callBack();
        })
        .catch((err) => {
          console.log("err", err);
        });
    } catch (err) {
      console.log("err", err);
    }
  };
};

// to send the file such as image or file we need to add Content-type = multipart/form-data
export const malariaAnalysis = (data, callBack) => {
  return async (dispatch) => {
    try {
      fastInstance
        .post("/malaria/predict", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          dispatch(setMalariaPredict(res?.data?.prediction["0"]["0"] ?? ""));
          callBack && callBack();
        })
        .catch((err) => {
          console.log("err", err);
        });
    } catch (err) {
      console.log("err", err);
    }
  };
};

export const kidneyAnalysis = (data, callBack) => {
  return async (dispatch) => {
    try {
      fastInstance
        .post("/kidney/predict", data)
        .then((res) => {
          dispatch(setKidneyPredict(res?.data?.prediction["0"] ?? ""));
          callBack && callBack();
        })
        .catch((err) => {
          console.log("err", err);
        });
    } catch (err) {
      console.log("err", err);
    }
  };
};

export const diabiatesAnalysis = (data, callBack) => {
  return async (dispatch) => {
    try {
      fastInstance
        .post("/dibetes/predict", data)
        .then((res) => {
          dispatch(setDiabetesPredict(res?.data?.prediction["0"] ?? ""));
          callBack && callBack();
        })
        .catch((err) => {
          console.log("err", err);
        });
    } catch (err) {
      console.log("err", err);
    }
  };
};

export const liverAnalysis = (data, callBack) => {
  return async (dispatch) => {
    try {
      fastInstance
        .post("/liver/predict", data)
        .then((res) => {
          dispatch(setLiverPredict(res?.data?.prediction["0"] ?? ""));
          callBack && callBack();
        })
        .catch((err) => {
          console.log("err", err);
        });
    } catch (err) {
      console.log("err", err);
    }
  };
};

export const heartAnalysis = (data, callBack) => {
  return async (dispatch) => {
    try {
      fastInstance
        .post("/heart/predict", data)
        .then((res) => {
          dispatch(setHeartPredict(res?.data?.prediction["0"] ?? ""));
          callBack && callBack();
        })
        .catch((err) => {
          console.log("err", err);
        });
    } catch (err) {
      console.log("err", err);
    }
  };
};

