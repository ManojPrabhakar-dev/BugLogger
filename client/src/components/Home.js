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
        <CreateTask />
        <Tasks />
      </Box>
    </Box>
  );
};

export default Home;
