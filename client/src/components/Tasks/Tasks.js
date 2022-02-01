import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask } from "../../actions/taskAction";
import { Paper, CircularProgress, IconButton, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TaskInfo from "./Task/TaskInfo";

const tbRowStyle = {
  "&:last-child td, &:last-child th": { border: 0 },
};

const tbcellStyle = {
  "&:hover": {
    cursor: "pointer",
  },
};

const cardStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  // flexDirection: "column",
  // flex: 1,
  height: "100%",
  m: 1,
};

const Tasks = () => {
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});
  const dispatch = useDispatch();
  const taskState = useSelector((state) => state.tasks);
  const { loading, error, tasks } = taskState;
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <>
      {loading ? (
        <Paper sx={cardStyle}>
          <CircularProgress />
        </Paper>
      ) : error ? (
        <Paper sx={cardStyle}>
          <Typography>{error}</Typography>
        </Paper>
      ) : tasks.length === 0 ? (
        <Paper sx={cardStyle}>
          <Typography variant="h6">No Items Found</Typography>
        </Paper>
      ) : (
        <TableContainer
          sx={{ padding: "12px", margin: "4px" }}
          component={Paper}
        >
          <Table sx={{ minWidth: 650 }} aria-label="Bug List">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Creator</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TaskInfo open={open} setOpen={setOpen} taskInfo={selectedTask} />
              {tasks.map((task) => (
                <TableRow hover sx={tbRowStyle} key={task._id}>
                  <TableCell
                    sx={tbcellStyle}
                    onClick={() => {
                      setSelectedTask(task);
                      setOpen(true);
                      console.log("clicked : " + task.title);
                    }}
                    component="th"
                    scope="row"
                  >
                    {task.title}
                  </TableCell>
                  <TableCell
                    sx={tbcellStyle}
                    onClick={() => {
                      setSelectedTask(task);
                      setOpen(true);
                      console.log("clicked : " + task.title);
                    }}
                  >
                    {task.description}
                  </TableCell>
                  <TableCell>{task.creator}</TableCell>
                  <TableCell>{task.priority}</TableCell>
                  <TableCell>
                    <IconButton
                      sx={{
                        "&:hover": {
                          background: "orange",
                          color: "black",
                        },
                      }}
                      onClick={() => {
                        dispatch(deleteTask(task._id));
                        console.log(task.title);
                      }}
                      disabled={user?.result?._id !== task.creatorID}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default Tasks;
