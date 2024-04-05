import TableBody from "@mui/material/TableBody";
import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import { StyledTableCell } from "../../Table/CustomizableTable";
import { useAppDispatch } from "../../../redux/hook";
import AddPresciption from "./AddPrescription";
import AddModal from "../../modal/AddModal";
import { useState } from "react";
import ViewPresciption from "./ViewPrescription";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const PatientTableBody = ({ data }) => {
  const [openModal, setOpenModal] = useState(false);
  const [view, setView] = useState(false);
  const [viewData, setViewData] = useState([])
  const dispatch = useAppDispatch();

  const [clickedId, setClickedId] = useState(null);

  const handleClick = (patient_id) => {
    setClickedId(patient_id);
    setOpenModal(true);
  };

  const handleView = (data) => {
    setViewData(data);
    setView(true);
  };

  return (
    <>
      <TableBody>
        {data &&
          data.map((row, index) => (
            <StyledTableRow key={index}>
              {/* <StyledTableCell component="th" scope="row">
              {data.name}
            </StyledTableCell> */}
              <StyledTableCell align="left">
                {row?.first_name + " " + row?.last_name}
              </StyledTableCell>
              <StyledTableCell align="left">
                <button
                  onClick={() => handleClick(row?.profile_id ?? "")}
                  className="py-2 px-4 bg-red-600 rounded-md text-white"
                >
                  Prescribe
                </button>
              </StyledTableCell>
              <StyledTableCell align="left">
                <button
                  onClick={() => handleView(row?.prescriptions)}
                  className="py-2 px-4 bg-green-600 rounded-md text-white"
                >
                 View Prescription
                </button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
      </TableBody>
      <AddModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        title="Add Prescription"
      >
        <AddPresciption setIsOpen={setOpenModal} patientId={clickedId} />
      </AddModal>
      <AddModal
        open={view}
        onClose={() => setView(false)}
        title="View Prescription"
      >
        <ViewPresciption setIsOpen={setView} data = {viewData} />
      </AddModal>
    </>
  );
};

export default PatientTableBody;
