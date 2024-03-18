import TableBody from "@mui/material/TableBody";
import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import { StyledTableCell } from "../Table/CustomizableTable";
import AddModal from "../modal/AddModal";
import { useState } from "react";
import { useAppDispatch } from "../../redux/hook";
import { deleteDoctorAccount } from "../../Api/admin";

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
  const [deleteDoctor, setDeleteDoctor] = useState(false);

  const handleDelete = (row) => {
    dispatch(deleteDoctorAccount(row.profile_id));
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
              <StyledTableCell align="left">{row.speacilist}</StyledTableCell>
              <StyledTableCell align="left">
                <button className="py-2 px-4 bg-green-600 rounded-md text-white">
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
      {/* <AddModal
        open={addDoctor}
        onClose={() => setAddDoctor(false)}
        title="Add Doctor"
      >
        <AddDoctor />
      </AddModal> */}
    </>
  );
};

export default DoctorTableBody;
