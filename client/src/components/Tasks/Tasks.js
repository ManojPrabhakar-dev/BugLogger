import React from "react";
import { Paper, CircularProgress, Box } from "@mui/material";
import { useSelector } from "react-redux";

const Tasks = () => {
  const tasks = useSelector((state) => state.tasks);
  return !tasks.length ? (
    <CircularProgress />
  ) : (
    <Paper sx={{ padding: "12px", gridRow: "span 7", margin: "4px" }}>
      {tasks.map((task) => {
        return <Box>{task}</Box>;
      })}
    </Paper>
  );
};

export default Tasks;
