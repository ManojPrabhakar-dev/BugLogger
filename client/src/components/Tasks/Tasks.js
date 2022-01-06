import React from "react";
import { Container, Button, Typography, Paper } from "@material-ui/core";
import useStyles from "./styles";

const Tasks = () => {
  const classes = useStyles();
  return <Paper className={classes.paper}>Task List</Paper>;
};

export default Tasks;
