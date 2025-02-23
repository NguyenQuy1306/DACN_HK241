import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import { saveCurrentPage } from "../../redux/features/restaurantSlice";
export default function PaginationOutlined({ count }) {
  const dispatch = useDispatch();
  const handlePageChange = (event, page) => {
    dispatch(saveCurrentPage(page - 1));
  };
  const currentPage = useSelector((state) => state.restaurant.currentPage);

  return (
    <Stack spacing={2}>
      <Pagination
        count={count}
        shape="rounded"
        onChange={handlePageChange}
        page={currentPage + 1}
        sx={{
          "& .MuiPaginationItem-root": {
            color: "black",
            backgroundColor: "white",
            boxShadow: "0 0 0 1px hsl(214, 9%, 85%) inset",
            "&.Mui-selected": {
              backgroundColor: "hsl(174, 100%, 20%)",
              color: "white",
            },
            "&:hover": {
              color: "hsl(174, 100%, 20%)",
              backgroundColor: "hsl(176, 57.40%, 90.80%)",
              border: " 1px solid hsl(174, 100.00%, 92.70%) ",
            },
          },
        }}
      />
    </Stack>
  );
}
