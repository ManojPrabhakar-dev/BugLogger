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
  Divider,
} from "@mui/material";
import { Task } from "@mui/icons-material";
import { blue, blueGrey } from "@mui/material/colors";
import { updateTask } from "../../../actions/taskAction";

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

const TaskInfo = ({ open, setOpen, taskInfo }) => {
  const dispatch = useDispatch();
  const [task, setTask] = useState({});
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setTask({ ...taskInfo });
    console.log("task : " + JSON.stringify(taskInfo));
  }, [taskInfo]);

  function handleOnChange(e) {
    setTask({ ...task, [e.target.name]: e.target.value });
    console.log(`name : ${e.target.name} , value : ${e.target.value}`);
  }
  function handleCancel() {
    // clearState();
    handleClose();
  }

  function handleSubmit() {
    console.log(`Task : ${JSON.stringify(task)}`);
    dispatch(updateTask(task));
    //show success alert
  }

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
        <Divider sx={{ mx: 1, my: 2, backgroundColor: blueGrey[300] }} />
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(12,1fr)" }}>
          <Box sx={{ gridColumn: "span 9" }}>
            <Box sx={{ display: "flex" }}>
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
                <InputLabel id="demo-simple-select-label1">Type :</InputLabel>
              </Box>
              <Box sx={{ flex: 8, gridRow: "1", gridColumn: "span 8" }}>
                <FormControl sx={{ width: 150 }}>
                  <Select
                    name="type"
                    labelId="demo-simple-select-label1"
                    id="demo-simple-select1"
                    onChange={handleOnChange}
                    defaultValue={"Bug"}
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
                <InputLabel id="demo-simple-select-label2">
                  priority :{" "}
                </InputLabel>
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
