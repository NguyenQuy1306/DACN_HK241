import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./TableInModalMenu.css";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "hsl(174, 100%, 20%)",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  width: "0px",
}));
const StyledFirstColumnCell = styled(StyledTableCell)({});
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables({ combo }) {
  let totalPrice = 0;

  for (let i = 0; i < combo.length; i++) {
    totalPrice += combo[i].item.gia * combo[i].quantity;
  }
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 400, overflow: "auto" }}>
      <Table sx={{ minWidth: 500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell className="StyledTableCell1">
              Tên món ăn
            </StyledTableCell>
            <StyledTableCell align="left" className="StyledTableCell2">
              Giá
            </StyledTableCell>
            <StyledTableCell align="left">Số lượng</StyledTableCell>
            <StyledTableCell align="left">Tổng</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {combo.map((row) => (
            <StyledTableRow key={row.item.ten}>
              <StyledTableCell align="left" className="StyledTableCell1">
                {row.item.ten}
              </StyledTableCell>

              <StyledTableCell align="left" className="StyledTableCell2">
                {row.item.gia}
              </StyledTableCell>
              <StyledTableCell align="left">{row.quantity}</StyledTableCell>
              <StyledTableCell align="left">
                {row.quantity * row.item.gia} đ
              </StyledTableCell>
            </StyledTableRow>
          ))}

          <StyledTableRow key="Tổng cộng">
            <StyledTableCell align="left" className="StyledTableCell1">
              Tổng
            </StyledTableCell>

            <StyledTableCell align="left" className="StyledTableCell2">
              {null}
            </StyledTableCell>
            <StyledTableCell align="left"> {null}</StyledTableCell>
            <StyledTableCell align="left">{totalPrice} đ</StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
