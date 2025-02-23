import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PaginationOutlined({ count, setCurrentPage }) {
  const handlePageChange = (event, page) => {
    setCurrentPage(page - 1); // Convert to zero-based index if needed
  };
  return (
    <Stack spacing={2}>
      <Pagination
        count={count}
        shape="rounded"
        onChange={handlePageChange}
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
