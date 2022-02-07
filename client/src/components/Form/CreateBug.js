import React, { useState, useEffect, useRef } from "react";
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
import "./createBug.css";
// import AdapterMoment from "@mui/lab/AdapterMoment";
import DateAdapter from "@mui/lab/AdapterMoment";
import { LocalizationProvider, DatePicker } from "@mui/lab";
import Dropzone from "react-dropzone";
import { createTask, updateTask } from "../../actions/taskAction";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
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
  file: null,
};

const types = ["Task", "Bug", "Story", "Epic", "Improvement"];
const priorityList = ["Critical", "High", "Medium", "Low"];
let userList = ["unassigned"];

const CreateBug = ({ open, setOpen }) => {
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);
  const [previewSrc, setPreviewSrc] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const dropRef = useRef(); // React ref for managing the hover state of droppable area

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

  const onDrop = (files) => {
    const [uploadedFile] = files;
    setFile(uploadedFile);

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewSrc(fileReader.result);
    };
    fileReader.readAsDataURL(uploadedFile);
    setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
  };

  const updateBorder = (dragState) => {
    if (dragState === "over") {
      dropRef.current.style.border = "2px solid #000";
    } else if (dragState === "leave") {
      dropRef.current.style.border = "2px dashed #e9ebeb";
    }
  };

  function postTaskInfoSubmit(e) {
    e.preventDefault();
    let updatedTask = { ...taskInfo };
    let formData = new FormData();
    for (let prop in taskInfo) {
      if (taskInfo[prop]) {
        formData.append(prop, taskInfo[prop]);
      }
    }
    if (file) {
      formData.append("file", file);
      console.log("File : " + file);
    }
    const user = JSON.parse(localStorage.getItem("profile"));
    if (user?.result) {
      updatedTask = { ...taskInfo, creator: user?.result.name };
      setTaskInfo(updatedTask);
      formData.append("creator", user?.result.name);
    }

    if (dueDate) {
      updatedTask = { ...updatedTask, dueDate: dueDate };
      formData.append("dueDate", dueDate);
    }

    // if (file) {
    //   updatedTask = { ...updatedTask, file: file };
    //   console.log("File : " + file);
    // }

    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    // dispatch(createTask(updatedTask));
    dispatch(createTask(formData));
    console.log("formData : " + JSON.stringify(formData));
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
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
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
          <Box
            sx={{
              display: "flex",
              alignSelf: "start",
              gap: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
              }}
            >
              <FormControl sx={{ width: 200, alignSelf: "start" }}>
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

              <FormControl sx={{ width: 200, alignSelf: "start" }}>
                <InputLabel id="demo-simple-select-label2">
                  priority{" "}
                </InputLabel>
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

              <FormControl sx={{ width: 200, alignSelf: "start" }}>
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

              <FormControl sx={{ width: 200, alignSelf: "start" }}>
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
            </Box>
            <Box sx={{ display: "flex", width: "100%" }}>
              <Dropzone
                onDrop={onDrop}
                onDragEnter={() => updateBorder("over")}
                onDragLeave={() => updateBorder("leave")}
              >
                {({ getRootProps, getInputProps }) => (
                  <div
                    {...getRootProps({ className: "drop-zone" })}
                    ref={dropRef}
                  >
                    <input {...getInputProps()} />
                    <p>Drag and drop a file OR click here to select a file</p>
                    {file && (
                      <div>
                        <strong>Selected file:</strong> {file.name}
                      </div>
                    )}
                  </div>
                )}
              </Dropzone>
              {previewSrc ? (
                isPreviewAvailable ? (
                  <div className="image-preview">
                    <img
                      className="preview-image"
                      src={previewSrc}
                      alt="Preview"
                    />
                  </div>
                ) : (
                  <div className="preview-message">
                    <p>No preview available for this file</p>
                  </div>
                )
              ) : (
                <div className="preview-message">
                  <p>Image preview will be shown here after selection</p>
                </div>
              )}
            </Box>
          </Box>
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
