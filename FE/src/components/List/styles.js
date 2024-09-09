import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginBottom: "30px",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  loading: {
    height: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    // height: "200px",
    borderRight: "0px solid #fff",
    padding: "10px",
    marginTop: "5px",
  },
  marginBottom: {
    marginBottom: "30px",
  },
  list: {
    // borderBottom: "1px solid #eaeaea",
    // position: "relative",
    // height: '75vh', overflow: 'auto',
  },
}));
