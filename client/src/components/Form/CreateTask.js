import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TextField, Button, Typography, Paper, Box, Grid } from "@mui/material";
import { createTask } from "../../actions/taskAction";

const CreateTask = () => {
  const dispatch = useDispatch();
  const [taskInfo, setTaskInfo] = useState({
    title: "",
    description: "",
    creator: "",
    priority: "",
  });

  function postTaskInfoSubmit(e) {
    e.preventDefault();
    dispatch(createTask(taskInfo));
    clearState();
  }

  function clearState() {
    setTaskInfo({
      title: "",
      description: "",
      creator: "",
      priority: "",
    });
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
          {"Creating Task"}
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
          Submit
        </Button>
      </Box>
    </Paper>
  );
};

export default CreateTask;
