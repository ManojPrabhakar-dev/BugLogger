import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Modal,
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/lab";
import { Task } from "@mui/icons-material";
import { blue, blueGrey } from "@mui/material/colors";
import { updateTask, downloadAttachedFile } from "../../../actions/taskAction";
import { stringToColor } from "../../../util/helperFunction";
import moment from "moment";
import Dropzone from "react-dropzone";
import "./taskInfo.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "99%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  //   height: 400,
  //   border: "2px solid #000",
};

const types = ["Task", "Bug", "Story", "Epic", "Improvement"];
const priorityList = ["Critical", "High", "Medium", "Low"];
const statusList = ["Open", "Inprogress", "To be tested", "Closed"];
let userList = ["unassigned"];

const TaskInfo = ({ open, setOpen, taskInfo }) => {
  const dispatch = useDispatch();
  const [task, setTask] = useState({});

  const [file, setFile] = useState(null);
  const [previewSrc, setPreviewSrc] = useState("");
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const dropRef = useRef(); // React ref for managing the hover state of droppable area

  const [createdAt, setCreatedAt] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const handleClose = () => setOpen(false);
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    if (users) {
      const userNames = users.map((user) => {
        return user.name;
      });
      userList = ["unassigned", ...userNames];
    }
    setTask({ ...taskInfo });
    if (taskInfo.dueDate) {
      setDueDate(taskInfo.dueDate);
    }

    if (taskInfo.createdAt) {
      console.log("created At " + taskInfo.createdAt);
      const dateObj = new Date(taskInfo.createdAt);
      const momentObj = moment(dateObj);
      // var momentString = momentObj.format("YYYY-MM-DD");
      // console.log("Moment String : " + momentObj.fromNow());
      setCreatedAt(momentObj.fromNow());
    }

    console.log("task : " + JSON.stringify(taskInfo));
  }, [taskInfo, users]);

  function handleOnChange(e) {
    setTask({ ...task, [e.target.name]: e.target.value });
    console.log(`name : ${e.target.name} , value : ${e.target.value}`);
  }
  function handleCancel() {
    // clearState();
    handleClose();
  }

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

  async function handleSubmit() {
    console.log(`Task : ${JSON.stringify(task)}`);
    let updatedTask = { ...task };
    if (dueDate) {
      updatedTask = { ...task, dueDate: dueDate };
      setTask(updatedTask);
    }
    dispatch(updateTask(updatedTask));
    //show success alert
  }

  const updateBorder = (dragState) => {
    if (dragState === "over") {
      dropRef.current.style.border = "2px solid #000";
    } else if (dragState === "leave") {
      dropRef.current.style.border = "2px dashed #e9ebeb";
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Task sx={{ fontSize: 32, color: blue[900] }} />
          <Typography variant="h4" sx={{ ml: "10px" }}>
            {task.title}
          </Typography>
        </Box>
        <Divider sx={{ mx: 1, mt: 2, mb: 1, backgroundColor: blueGrey[300] }} />

        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(12,1fr)" }}>
          <Box sx={{ gridColumn: "span 9" }}>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ display: "flex", flex: 1, flexDirection: "column" }}>
                <Typography
                  sx={{ ml: 1, mb: 2, color: "gray" }}
                  variant="subtitle1"
                >{`created by ${task.creator} - ${createdAt}`}</Typography>

                <Box
                  sx={{
                    display: "flex",
                    flex: 1,
                    flexDirection: "column",
                    gap: 3,
                  }}
                >
                  <TextField
                    name="title"
                    variant="outlined"
                    label="Summary"
                    fullWidth
                    size="small"
                    value={task.title}
                    onChange={handleOnChange}
                  />
                  <TextField
                    name="description"
                    variant="outlined"
                    label="Description"
                    fullWidth
                    size="small"
                    multiline
                    rows={4}
                    value={task.description}
                    onChange={handleOnChange}
                  />
                  {taskInfo.filePath ? (
                    <div className="fileDownloadContainer">
                      <button
                        className="attachedFile cardShawdow"
                        onClick={() => {
                          console.log(`${taskInfo.filePath.split(`\\`)[1]}`);
                          dispatch(downloadAttachedFile(taskInfo));
                        }}
                      >
                        {taskInfo.filePath.split(`\\`)[1]}
                      </button>
                    </div>
                  ) : (
                    <div className="upload-section">
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
                            <p>
                              Drag and drop a file OR click here to select a
                              file
                            </p>
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
                          <p>
                            Image preview will be shown here after selection
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </Box>
              </Box>
              <Box>
                <Divider
                  orientation="vertical"
                  sx={{
                    mx: 2,
                    width: "1px",
                    backgroundColor: blueGrey[200],
                  }}
                />
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              gridColumn: "span 3",
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  flex: 4,
                }}
              >
                <InputLabel id="status1">Status :</InputLabel>
              </Box>
              <Box
                sx={{
                  flex: 8,
                }}
              >
                <FormControl sx={{ width: 150 }}>
                  <Select
                    name="status"
                    labelId="demo-simple-select-label2"
                    id="demo-simple-select2"
                    onChange={handleOnChange}
                    defaultValue={task.status}
                    size="small"
                  >
                    {statusList.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  flex: 4,
                }}
              >
                <InputLabel id="demo-simple-select-label1">Type :</InputLabel>
              </Box>
              <Box sx={{ flex: 8, gridRow: "1", gridColumn: "span 8" }}>
                <FormControl sx={{ width: 150 }}>
                  <Select
                    name="type"
                    labelId="demo-simple-select-label1"
                    id="demo-simple-select1"
                    onChange={handleOnChange}
                    defaultValue={task.type}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    size="small"
                  >
                    {types.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  flex: 4,
                }}
              >
                <InputLabel id="priority1">priority :</InputLabel>
              </Box>
              <Box
                sx={{
                  flex: 8,
                }}
              >
                <FormControl sx={{ width: 150 }}>
                  <Select
                    name="priority"
                    labelId="demo-simple-select-label2"
                    id="demo-simple-select2"
                    onChange={handleOnChange}
                    defaultValue={task.priority}
                    size="small"
                  >
                    {priorityList.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  flex: 4,
                }}
              >
                <InputLabel id="demo-simple-select-label2">
                  Assignee :
                </InputLabel>
              </Box>
              <Box
                sx={{
                  flex: 8,
                }}
              >
                <FormControl sx={{ width: 150 }}>
                  <Select
                    name="assignee"
                    labelId="demo-simple-select-label2"
                    id="demo-simple-select2"
                    onChange={handleOnChange}
                    defaultValue={task.assignee}
                    size="small"
                  >
                    {userList.map((user) => (
                      <MenuItem key={user} value={user}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <Avatar
                            sx={{
                              bgcolor: stringToColor(user),
                              width: 24,
                              height: 24,
                            }}
                          >
                            {user.charAt(0).toUpperCase()}
                          </Avatar>
                          <Typography variant="body1">{user}</Typography>
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  flex: 4,
                }}
              >
                <InputLabel id="Due Date">Due Date :</InputLabel>
              </Box>
              <Box
                sx={{
                  flex: 8,
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    name="dueDate"
                    // label="Due Date"
                    value={dueDate}
                    onChange={setDueDate}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              gridColumn: "span 12",
              display: "flex",
              justifyContent: "space-between",
              mt: 2,
            }}
          >
            <Button
              sx={{ fontWeight: "bold" }}
              variant="outlined"
              color="error"
              size="large"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              //   sx={{ fontWeight: "bold" }}
              variant="contained"
              color="primary"
              size="large"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default TaskInfo;
