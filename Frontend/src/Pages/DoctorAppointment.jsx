import AppointmentList from "../Components/Doctor/AppointmentList";
import Layout from "../Components/layout/Layout";
import { doctorSideBar } from "../Data/sidebarData";

const DoctorAppointment = () => {
  return (
    <Layout sideMenu={doctorSideBar}>
      <AppointmentList />
    </Layout>
  );
};

export default DoctorAppointment;
