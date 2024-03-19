import React, { useEffect } from "react";
import UserProfileHeader from "../Components/User/UserProfileHeader";
import Layout from "../Components/layout/Layout";
import { userSideBar } from "../Data/sidebarData";
import { useAppDispatch } from "../redux/hook";
import { getUserProfile } from "../Api/user";

const UserDetailPage = () => {
        const dispatch = useAppDispatch()
  useEffect(() => {
      dispatch(getUserProfile())
  }, []);

  return (
    <Layout sideMenu={userSideBar}>
      <UserProfileHeader />
    </Layout>
  );
};

export default UserDetailPage;
