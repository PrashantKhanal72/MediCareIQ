import React from 'react'
import Layout from '../Components/layout/Layout'
import { userSideBar } from '../Data/sidebarData'
import DoctorList from '../Components/User/DoctorList'

const UserPage = () => {
  return (
        <Layout sideMenu={userSideBar}>
        <DoctorList/>
      </Layout>
  )
}

export default UserPage