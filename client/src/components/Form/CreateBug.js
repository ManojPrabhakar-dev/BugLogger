import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Modal,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
import { createTask, updateTask } from "../../actions/taskAction";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 680,
  //   height: 400,
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

const types = ["Task", "Bug", "Story", "Epic", "Improvement"];
const priorityList = ["Critical", "High", "Medium", "Low"];

const CreateBug = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [taskInfo, setTaskInfo] = useState({
    type: "",
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

  function handleOnChange(e) {
    setTaskInfo({ ...taskInfo, [e.target.name]: e.target.value });
    console.log(`name : ${e.target.name} , value : ${e.target.value}`);
  }

  function handleCancel() {
    clearState();
    handleClose();
  }

  function clearState() {
    setTaskInfo({
      type: "",
      title: "",
      description: "",
      creator: "",
      priority: "",
    });
  }

  return (
    <Modal
      open={open}
      //   onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          component="form"
          sx={{
            display: "grid",
            gridTemplateRows: "repeat(7,1fr)",
            gap: 1,
            height: "100%",
            alignItems: "center",
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
            Creating Task
          </Typography>

          <TextField
            name="title"
            variant="outlined"
            label="Title"
            fullWidth
            size="small"
            value={taskInfo.title}
            onChange={handleOnChange}
          />
          <Box sx={{ gridRow: "span 2" }}>
            <TextField
              name="description"
              variant="outlined"
              label="description"
              size="small"
              fullWidth
              multiline
              rows={4}
              value={taskInfo.description}
              onChange={handleOnChange}
            />
          </Box>

          <FormControl sx={{ width: 150 }}>
            <InputLabel id="demo-simple-select-label1">Type </InputLabel>
            <Select
              name="type"
              labelId="demo-simple-select-label1"
              id="demo-simple-select1"
              // value={taskInfo.type}
              label="type"
              onChange={handleOnChange}
              defaultValue={"Bug"}
              size="small"
            >
              {types.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ width: 150 }}>
            <InputLabel id="demo-simple-select-label2">priority </InputLabel>
            <Select
              name="priority"
              labelId="demo-simple-select-label2"
              id="demo-simple-select2"
              // value={taskInfo.priority}
              label="priority"
              onChange={handleOnChange}
              defaultValue={"Medium"}
              size="small"
            >
              {priorityList.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
            }}
          >
            <Button
              sx={{ fontWeight: "bold" }}
              variant="outlined"
              color="error"
              size="large"
              type="submit"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              //   sx={{ fontWeight: "bold" }}
              variant="contained"
              color="primary"
              size="large"
              type="submit"
            >
              Create Bug
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateBug;
