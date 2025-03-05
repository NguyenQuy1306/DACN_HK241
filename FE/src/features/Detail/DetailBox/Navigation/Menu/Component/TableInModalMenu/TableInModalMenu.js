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
import { useDispatch, useSelector } from "react-redux";
import { c } from "react-redux";
import {
  getDepositPolicy,
  saveAmount,
  saveDeposit,
  savePaymentAmount,
} from "../../../../../../../redux/features/paymentSlice";
const { formatCurrency } = require("../../../../../../../helper/helper");

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
  const dispatch = useDispatch();
  const comboType = useSelector((state) => state.combo.comboType);
  const totalPrice = React.useMemo(() => {
    let total = 0;
    let list = [];

    if (comboType === "newCombo") {
      list = combo[0];
      total = list.reduce((sum, item) => sum + item.gia * item.soLuong, 0);
    } else if (comboType === "availableCombo") {
      list = combo[0].foods;
      total = list.reduce((sum, item) => sum + item.gia, 0);
    } else {
      list = combo;
      total = list.reduce((sum, item) => sum + item.gia * item.soLuong, 0);
    }

    return { total, list };
  }, [combo, comboType]);

  const depositPolicy = useSelector((state) => state.payment.depositPolicy);

  React.useEffect(() => {
    if (totalPrice.total > 0 && depositPolicy) {
      const depositAmount =
        totalPrice.total > depositPolicy.nguongApDungDatCocTheoPhanTram
          ? Math.round(
              (totalPrice.total * depositPolicy.phanTramCoc) / 100 / 1000
            ) * 1000
          : depositPolicy.datCocToiThieu;
      console.log("depositAmountdepositAmount ,, ", depositAmount);
      dispatch(saveDeposit(depositAmount));
      dispatch(saveAmount(totalPrice.total));
      dispatch(savePaymentAmount(depositAmount));
    }
  }, [totalPrice.total, depositPolicy]);

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
          {totalPrice?.list?.map((row) => (
            <StyledTableRow key={row.ten}>
              <StyledTableCell align="left" className="StyledTableCell1">
                {row.ten}
              </StyledTableCell>

              <StyledTableCell align="left" className="StyledTableCell2">
                {formatCurrency(row.gia)}
              </StyledTableCell>
              <StyledTableCell align="left">
                {row.soLuong ? row.soLuong : 1}
              </StyledTableCell>
              <StyledTableCell align="left">
                {formatCurrency(row.gia)} đ
              </StyledTableCell>
            </StyledTableRow>
          ))}
          {/* {comboType !== "availableCombo" &&
            comboType !== "newCombo" &&
            listFood.map((row) => (
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
            ))} */}

          <StyledTableRow key="Tổng cộng">
            <StyledTableCell align="left" className="StyledTableCell1">
              Tổng
            </StyledTableCell>

            <StyledTableCell align="left" className="StyledTableCell2">
              {null}
            </StyledTableCell>
            <StyledTableCell align="left"> {null}</StyledTableCell>
            <StyledTableCell align="left">
              {formatCurrency(totalPrice.total)} đ
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
