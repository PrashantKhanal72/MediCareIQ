import { useEffect } from "react"
import Layout from "../Components/layout/Layout"
import { userSideBar } from "../Data/sidebarData"
import { useAppDispatch } from "../redux/hook"
import PrescriptionList from "../Components/User/PrescriptionList"
import { getPrescriptionList } from "../Api/user"

const Prescription = () => {

  const dispatch = useAppDispatch();
  
  useEffect(()=> {
     dispatch(getPrescriptionList())
  },[])

  return (
        <Layout sideMenu={userSideBar}>
        <PrescriptionList/>
      </Layout>
  )
}

export default Prescription
