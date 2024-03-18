import React, { useEffect } from "react";
import Layout from "../Components/layout/Layout";
import { adminSideBar } from "../Data/sidebarData";
import DoctorList from "../Components/Admin/DoctorList";
import { useAppDispatch } from "../redux/hook";
import { getDoctorList } from "../Api/admin";

const DoctorListPage = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getDoctorList());
  }, []);

  return (
    <Layout sideMenu={adminSideBar}>
      <DoctorList />
    </Layout>
  );
};

export default DoctorListPage;
