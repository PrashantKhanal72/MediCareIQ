import TableBody from "@mui/material/TableBody";
import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import { StyledTableCell } from "../../Table/CustomizableTable";
import { useAppDispatch } from "../../../redux/hook";
import moment from "moment";
import { timeFormatinAMPM } from "../../../utils/timeFormatter";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ScheduleTableBody = ({ data }) => {
  const dispatch = useAppDispatch();

  const dummyDate = new Date();

  const handleDelete = (row) => {
    //     dispatch(deleteDoctorAccount(row.profile_id));
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
                {row?.available_date.split("T")[0]}
              </StyledTableCell>
              <StyledTableCell align="left">
                {timeFormatinAMPM(row?.start_time??'')}
              </StyledTableCell>
              <StyledTableCell align="left">
                {timeFormatinAMPM(row?.end_time??'')}
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

export default ScheduleTableBody;
