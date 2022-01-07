import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    backgroundColor: "#fd3",
    gridRow: "span 5",
    // height: "100%",
    display: "flex",
    flexDirection: "column",
    margin: "4px",
  },
  span2: {
    gridRow: "span 2",
  },
  span4: {
    gridRow: "span 4",
  },
  form: {
    backgroundColor: "yellow",
    display: "grid",
    gridTemplateRows: "repeat(12,1fr)",
    height: "100%",
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
