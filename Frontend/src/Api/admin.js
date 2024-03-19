import axiosInstance from "../axios/axiosInstance"
import { setDoctorList } from "../redux-slices/doctorSlices"

export const getDoctorList = () => {
        return async (dispatch) => {
          axiosInstance
            .get(`/patient/get-doctors`)
            .then((res) => {
              dispatch(setDoctorList(res.data.doctors))
            })
            .catch(() => {
        //       setLoading && setLoading(false)
              // catch error
            })
        }
      }

      export const createDoctorAccount = (data, setOpen) => {
        return async (dispatch) => {
          try{
          axiosInstance.post(`/admin/create-doctor`, data)
            .then((res) => {
              dispatch(getDoctorList())
              setOpen(false)
            }).catch()
          }catch(err){
            console.log('error', err)
          }
        };
      };

      export const deleteDoctorAccount = ( dataId) => {
        return async (dispatch) => {
          try{
          axiosInstance.delete(`/admin/delete-doctor/${dataId}`)
            .then((res) => {
              dispatch(getDoctorList())
            }).catch()
          }catch(err){
            console.log('error', err)
          }
        };
      };
