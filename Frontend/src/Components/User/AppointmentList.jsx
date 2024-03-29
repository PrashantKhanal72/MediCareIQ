import { useEffect } from "react";
import CustomizedTables from "../Table/CustomizableTable"
import AppointmentTableBody from "./AppointmentTableBody"
import { useAppSelector } from "../../redux/hook";

const heading = [
  {
    title: "Confirmation Number",
  },
  {
    title: "Payment Date",
  },
  {
    title: "Specialist",
  },
  {
    title: "Physician",
  },
];

const AppointmentList = () => {

  const { paymentList } = useAppSelector(state => state.user);

  return (
    <div className="mt-10 pr-10">
      <div className="w-full">
        <CustomizedTables heading={heading}>
          <AppointmentTableBody data={paymentList} />
        </CustomizedTables>
      </div>
    </div>
  )
}

export default AppointmentList