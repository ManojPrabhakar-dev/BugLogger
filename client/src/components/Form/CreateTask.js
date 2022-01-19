import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button, Typography, Paper, Box, Grid } from "@mui/material";
import { createTask, updateTask } from "../../actions/taskAction";

const CreateTask = ({ currentIdx, setCurrentIdx }) => {
  const dispatch = useDispatch();
  const task = useSelector((state) =>
    currentIdx ? state.tasks.find((task) => task._id === currentIdx) : null
  );
  const [taskInfo, setTaskInfo] = useState({
    title: "",
    description: "",
    creator: "",
    priority: "",
  });

  useEffect(() => {
    if (task) {
      setTaskInfo({
        title: task.title,
        description: task.description,
        creator: task.creator,
        priority: task.priority,
      });
    }
  }, [task]);

  function postTaskInfoSubmit(e) {
    e.preventDefault();
    if (!currentIdx) {
      dispatch(createTask(taskInfo));
    } else {
      dispatch(updateTask(currentIdx, taskInfo));
    }
    clearState();
  }

  function clearState() {
    setTaskInfo({
      title: "",
      description: "",
      creator: "",
      priority: "",
    });
    setCurrentIdx(0);
  }

  return (
    <Paper
      sx={{
        padding: "12px",
        gridRow: "span 5",
        margin: "4px",
        // backgroundColor: "#fd3",
      }}
    >
      <Box
        component="form"
        sx={{
          display: "grid",
          gridTemplateRows: "repeat(4,1fr)",
          height: "100%",
          // backgroundColor: "yellow",
        }}
        autoComplete="off"
        noValidate
        onSubmit={postTaskInfoSubmit}
      >
        <Typography
          variant="h6"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!currentIdx ? "Creating Task" : "Update Task"}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <TextField
              name="title"
              variant="outlined"
              label="Title"
              fullWidth
              size="small"
              value={taskInfo.title}
              onChange={(e) => {
                setTaskInfo({ ...taskInfo, title: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              name="creator"
              variant="outlined"
              label="creator"
              size="small"
              fullWidth
              value={taskInfo.creator}
              onChange={(e) => {
                setTaskInfo({ ...taskInfo, creator: e.target.value });
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <TextField
              name="description"
              variant="outlined"
              label="description"
              size="small"
              fullWidth
              value={taskInfo.description}
              onChange={(e) => {
                setTaskInfo({ ...taskInfo, description: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              name="priority"
              variant="outlined"
              label="priority"
              size="small"
              fullWidth
              value={taskInfo.priority}
              onChange={(e) => {
                setTaskInfo({ ...taskInfo, priority: e.target.value });
              }}
            />
          </Grid>
        </Grid>
        <Button
          sx={{ margin: "auto", width: "60%" }}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
        >
          {currentIdx ? "Update" : "Create"}
        </Button>
      </Box>
    </Paper>
  );
};

export default CreateTask;
