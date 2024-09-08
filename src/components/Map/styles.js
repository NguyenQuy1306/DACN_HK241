import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  paper: {
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100px",
  },
  mapContainer: {
    width: "445px",
    height: "585px",
    position: "sticky", // Use sticky positioning
    top: "50px", // Ensure it sticks to the top of the container
    overflow: "hidden",
    paddingTop: "15px",
  },
  markerContainer: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    zIndex: 1,
    "&:hover": { zIndex: 2 },
  },
  pointer: {
    cursor: "pointer",
  },
  divfilterButton: {
    listStyleType: "none",
    display: "flex",
    WebkitBoxAlign: "center", // vendor prefix for align-items
    alignItems: "center",
    flexDirection: "column",
    position: "absolute",
    top: "1.8rem",
    zIndex: 0,
    height: "0px",
    width: "100%",
    overflow: "visible",
    gap: "1rem",
  },
}));
