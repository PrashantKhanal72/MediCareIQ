import React from 'react'
import CustomizedTables from '../Table/CustomizableTable'
import AppointmentTableBody from './AppointmentTableBody'

const heading = [
  {
    title: "Name",
  },
  {
    title: "Time",
  },
  {
    title: "Confirmation Number",
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

const DoctorList = () => {
  return (
    <div>
      <div className="w-full">
        <CustomizedTables heading={heading}>
          <AppointmentTableBody data={data} />
        </CustomizedTables>
      </div>
    </div>
  )
}

export default DoctorList