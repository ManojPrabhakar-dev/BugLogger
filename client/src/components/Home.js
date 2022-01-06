import React from "react";
import {
  Container,
  Box,
  Grid,
  Button,
  Typography,
  Paper,
} from "@material-ui/core";
import useStyles from "./styles";
import CreateTask from "./Form/CreateTask";
import Tasks from "./Tasks/Tasks";

const Home = () => {
  const classes = useStyles();
  return (
    <Box sx={{ height: "100vh", width: "100%" }}>
      <Box className={classes.layoutTop}>
        {/* <Box sx={{ gridRow: "span 6" }}>box 1</Box> */}
        {/* <Box className={classes.layout1}> */}
        <CreateTask />
        {/* </Box> */}
        {/* <Box className={classes.layout2}> */}
        <Tasks />
        {/* </Box> */}
      </Box>
    </Box>
  );
};

// const Home = () => {
//   return (
//     <Grid container direction="column" justifyContent="center" align="center">
//       <Grid item>
//         <CreateTask />
//       </Grid>
//       <Grid item>
//         <Tasks />
//       </Grid>
//     </Grid>
//   );
// };

export default Home;
