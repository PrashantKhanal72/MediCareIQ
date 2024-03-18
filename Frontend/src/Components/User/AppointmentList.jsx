import CustomizedTables from "../Table/CustomizableTable"
import AppointmentTableBody from "./AppointmentTableBody"

const heading = [
  {
    title: "Name",
  },
  {
    title: "Time",
  },
];

const data = [
  {
    name: "Sailesh bajgain",
    time: "9:30 am"
  },
  {
    name: "Ram Pokhrel",
    time: "13:00 pm"
  },
]

const AppointmentList = () => {
  return (
    <div className="mt-10 pr-10">
      <div className="w-full">
        <CustomizedTables heading={heading}>
          <AppointmentTableBody data={data} />
        </CustomizedTables>
      </div>
    </div>
  )
}

export default AppointmentList