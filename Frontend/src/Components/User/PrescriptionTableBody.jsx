import TableBody from '@mui/material/TableBody';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import { StyledTableCell } from '../Table/CustomizableTable';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));

const PrescriptionTableBody = ({data}) => {
  return (
        <TableBody>
        {data?.length > 0 && data.map((row) => (
          <StyledTableRow key={row.name}>
            {/* <StyledTableCell component="th" scope="row">
              {data.name}
            </StyledTableCell> */}
            <StyledTableCell style={{ maxWidth: '250px' }} align="left">{row?.description??""}</StyledTableCell>
            <StyledTableCell align="left">{`${row?.doctor_first_name??''} ${row?.doctor_last_name??''}`}</StyledTableCell>
            <StyledTableCell align="left">{row?.created_at.split('T')[0]}</StyledTableCell>
            </StyledTableRow>
        ))}
      </TableBody>
  )
}

export default PrescriptionTableBody