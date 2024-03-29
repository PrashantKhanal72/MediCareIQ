import { useEffect } from "react"
import AppointmentList from "../Components/User/AppointmentList"
import Layout from "../Components/layout/Layout"
import { userSideBar } from "../Data/sidebarData"
import { useAppDispatch } from "../redux/hook"
import { paymentList } from "../Api/payment"

const PatientAppointment = () => {

  const dispatch = useAppDispatch();
  
  useEffect(()=> {
     dispatch(paymentList())
  },[])

  return (
        <Layout sideMenu={userSideBar}>
        <AppointmentList/>
      </Layout>
  )
}

export default PatientAppointment
