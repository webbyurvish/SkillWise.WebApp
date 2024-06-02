import React from "react";
import Pagination from "@mui/material/Pagination";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#222555",
    },
  },
});

//////////////////// ---- Pagination component ---- ////////////////////

const CustomPagination = ({ totalPages, currentPage, handlePageChange }) => {
  return (
    <div
      style={{ display: "flex", marginTop: "3rem", justifyContent: "center" }}
    >
      <ThemeProvider theme={theme}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(_, page) => handlePageChange(page)}
          color="primary"
          sx={{
            "& .MuiPaginationItem-root": {
              color: "black", // Set the default color for pagination numbers
            },
            "& .MuiPaginationItem-root.Mui-selected": {
              color: "white", // Set the color for the focused pagination number
              fontWeight: "bold", // Optionally, apply other styles
            },
          }}
        />
      </ThemeProvider>
    </div>
  );
};

export default CustomPagination;
