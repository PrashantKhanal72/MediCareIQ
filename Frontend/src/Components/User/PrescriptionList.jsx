import CustomizedTables from "../Table/CustomizableTable"
import { useAppSelector } from "../../redux/hook";
import PrescriptionTableBody from "./PrescriptionTableBody";

const heading = [
  {
    title: "Prescription",
  },
  {
    title: "Prescribed By",
  },
  {
    title: "Prescribed Date",
  },
];

const PrescriptionList = () => {

  const { prescriptionList } = useAppSelector(state => state.user);

  return (
    <div className="mt-10 pr-10">
      <div className="w-full">
        <CustomizedTables heading={heading}>
          <PrescriptionTableBody data={prescriptionList?.prescriptions} />
        </CustomizedTables>
      </div>
    </div>
  )
}

export default PrescriptionList