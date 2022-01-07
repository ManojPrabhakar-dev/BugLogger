import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.secondary,
    gridRow: "span 5",
    // height: "100%",
    margin: "4px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  item1: { display: "flex", margin: "0.6rem 1rem" },
  fileInput: {
    width: "97%",
    margin: "10px 0",
  },
  heading: {
    textAlign: "center",
  },
  buttonSubmit: {
    margin: "auto",
    width: "60%",
  },
  mr: {
    marginRight: "1rem",
  },
}));
