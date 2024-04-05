import TableBody from "@mui/material/TableBody";
import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import { StyledTableCell } from "../Table/CustomizableTable";
import { useState } from "react";
import { useAppDispatch } from "../../redux/hook";
import { deleteDoctorAccount } from "../../Api/admin";
import AddModal from "../modal/AddModal";
import UpdateDoctor from "./UpdateDoctor";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const DoctorTableBody = ({ data }) => {
  const dispatch = useAppDispatch();
  const [updateDoctor, setUpdateDoctor] = useState(false);
  const [updateData, setUpdateData] = useState(null);

  const handleDelete = (row) => {
    dispatch(deleteDoctorAccount(row.auth_id));
  };

  const handleEdit = (row) => {
    setUpdateData(row);
    setUpdateDoctor(row);
  };

  return (
    <>
      <TableBody>
        {data.length > 0 &&
          data.map((row, index) => (
            <StyledTableRow key={index}>
              {/* <StyledTableCell component="th" scope="row">
              {data.name}
            </StyledTableCell> */}
              <StyledTableCell align="left">
                {row?.first_name + " " + row?.last_name}
              </StyledTableCell>
              <StyledTableCell align="left">
                {row?.speciality ?? ""}
              </StyledTableCell>
              <StyledTableCell align="left">
                {row?.gender ?? ""}
              </StyledTableCell>
              <StyledTableCell align="left">
                <button
                  onClick={() => handleEdit(row)}
                  className="py-2 px-4 bg-green-600 rounded-md text-white"
                >
                  Edit
                </button>
              </StyledTableCell>
              <StyledTableCell align="left">
                <button
                  onClick={() => handleDelete(row)}
                  className="py-2 px-4 bg-red-600 rounded-md text-white"
                >
                  Delete
                </button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
      </TableBody>
      {/* The form to update doctor */}
      <AddModal
        open={updateDoctor}
        onClose={() => setUpdateDoctor(false)}
        title="Update Doctor"
      >
        <UpdateDoctor updateData={updateData} setIsOpen={setUpdateDoctor} />
      </AddModal>
    </>
  );
};

export default DoctorTableBody;
