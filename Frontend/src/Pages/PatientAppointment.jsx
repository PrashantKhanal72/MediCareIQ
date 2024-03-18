import AppointmentList from "../Components/User/AppointmentList"
import Layout from "../Components/layout/Layout"
import { userSideBar } from "../Data/sidebarData"

const PatientAppointment = () => {
  return (
        <Layout sideMenu={userSideBar}>
        <AppointmentList/>
      </Layout>
  )
}

export default PatientAppointment
