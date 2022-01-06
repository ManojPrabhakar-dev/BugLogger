import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  // paper: {
  //   padding: theme.spacing(2),
  //   backgroundColor: "#333",
  // },
  layoutTop: {
    height: "100%",
    backgroundColor: "blue",
    display: "grid",
    gridTemplateRows: "repeat(12,1fr)",
    // gridGap: 1,
  },
  // layout1: {
  //   gridRow: "span 4",
  // },
  // layout2: {
  //   gridRow: "span 8",
  // },
}));
