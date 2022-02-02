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
// import AdapterMoment from "@mui/lab/AdapterMoment";
import DateAdapter from "@mui/lab/AdapterMoment";
import { LocalizationProvider, DatePicker } from "@mui/lab";

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

const initialState = {
  title: "",
  description: "",
  type: "Bug",
  status: "Open",
  priority: "Medium",
  creator: "",
  assignee: "unassigned",
  dueDate: null,
};

const types = ["Task", "Bug", "Story", "Epic", "Improvement"];
const priorityList = ["Critical", "High", "Medium", "Low"];
let userList = ["unassigned"];

const CreateBug = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  // const handleOpen = () => setOpen(true);
  // const [assignee, setAssignee] = useState("unassigned");
  const [dueDate, setDueDate] = useState(null);
  const handleClose = () => setOpen(false);
  const [taskInfo, setTaskInfo] = useState(initialState);
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    if (users) {
      const userNames = users.map((user) => {
        return user.name;
      });
      userList = ["unassigned", ...userNames];
    }
  }, [users]);

  function postTaskInfoSubmit(e) {
    e.preventDefault();
    let updatedTask = { ...taskInfo };
    const user = JSON.parse(localStorage.getItem("profile"));
    if (user?.result) {
      updatedTask = { ...taskInfo, creator: user?.result.name };
      setTaskInfo(updatedTask);
    }

    if (dueDate) {
      updatedTask = { ...updatedTask, dueDate: dueDate };
    }

    dispatch(createTask(updatedTask));
    console.log("taskInfo1 : " + JSON.stringify(updatedTask));
    //clearState();

    setTimeout(() => {
      handleCancel();
    }, 3000);

    //Show success status and close
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
    setTaskInfo(initialState);
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
            gridTemplateRows: "repeat(9,1fr)",
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

          <FormControl sx={{ width: 150 }}>
            <InputLabel id="assignee">Assignee </InputLabel>
            <Select
              name="assignee"
              labelId="assignee1"
              id="assignee1"
              // value={taskInfo.priority}
              label="assignee"
              onChange={handleOnChange}
              defaultValue={"unassigned"}
              size="small"
            >
              {userList.map((user) => (
                <MenuItem key={user} value={user}>
                  {user}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ width: 200 }}>
            <LocalizationProvider dateAdapter={DateAdapter}>
              <DatePicker
                name="dueDate"
                label="Due Date"
                value={dueDate}
                onChange={setDueDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
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
