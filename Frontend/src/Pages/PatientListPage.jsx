import React from 'react'
import Layout from '../Components/layout/Layout'
import { doctorSideBar } from '../Data/sidebarData'
import PatientList from '../Components/Doctor/Patient/PatientList'

const PatientListPage = () => {
  return (
    <Layout sideMenu={doctorSideBar}>
      <PatientList />
    </Layout>
  )
}

export default PatientListPage