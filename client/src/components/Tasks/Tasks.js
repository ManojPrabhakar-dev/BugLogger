import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask } from "../../actions/taskAction";
import { Paper, CircularProgress, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const tbRowStyle = {
  "&:last-child td, &:last-child th": { border: 0 },
};

const tbcellStyle = {
  "&:hover": {
    cursor: "pointer",
  },
};

const Tasks = ({ setCurrentIdx }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  return !tasks.length ? (
    <CircularProgress />
  ) : (
    <TableContainer
      sx={{ padding: "12px", gridRow: "span 7", margin: "4px" }}
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
          {tasks.map((task) => (
            <TableRow hover sx={tbRowStyle} key={task._id}>
              <TableCell
                sx={tbcellStyle}
                onClick={() => {
                  setCurrentIdx(task._id);
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
                  setCurrentIdx(task._id);
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
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Tasks;
