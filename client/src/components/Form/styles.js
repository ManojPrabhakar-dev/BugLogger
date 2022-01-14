import { makeStyles } from "@mui/material/styles";

export default makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    gridRow: "span 5",
    margin: "4px",
    // backgroundColor: "#fd3",
  },
  form: {
    // backgroundColor: "yellow",
    display: "grid",
    gridTemplateRows: "repeat(4,1fr)",
    height: "100%",
  },
  heading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  buttonSubmit: {
    margin: "auto",
    width: "60%",
  },
}));
