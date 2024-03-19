import Layout from "../Components/layout/Layout";
import { doctorSideBar } from "../Data/sidebarData";
import ScheduleList from "../Components/Doctor/Schedule/ScheduleList";
import { useAppDispatch } from "../redux/hook";
import { useEffect } from "react";
import { getScheduleList } from "../Api/doctor";

const DoctorSchedule = () => {
     const dispatch = useAppDispatch()

    useEffect(() => {
      dispatch(getScheduleList());
    }, []);



  return (
    <Layout sideMenu={doctorSideBar}>
      <ScheduleList />
    </Layout>
  );
};

export default DoctorSchedule;
