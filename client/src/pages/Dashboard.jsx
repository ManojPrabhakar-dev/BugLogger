import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button, Typography, Paper, Box } from "@mui/material";
import Tasks from "../components/Tasks/Tasks";
import { getTaskList } from "../actions/taskAction";
import { getUserList } from "../actions/userAction";
import {
  red,
  green,
  orange,
  blue,
  purple,
  blueGrey,
} from "@mui/material/colors";
import CreateBug from "../components/Form/CreateBug";

const BugCard = ({ count, type, color, category, setCategory }) => {
  return (
    <Paper
      sx={{
        backgroundColor: color[200],
        borderRadius: 3,
        "&:hover": {
          cursor: "pointer",
          backgroundColor: color[400],
        },
      }}
      onClick={() => {
        setCategory(category);
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          gap: 1,
          px: 0.5,
          py: 1,
          height: "90px",
          width: "90px",
        }}
      >
        <Typography sx={{ fontWeight: "bold", color: color[900] }} variant="h5">
          {count}
        </Typography>
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "12px",
            fontWeight: "bold",
            color: color[900],
          }}
          variant="subtitle2"
        >
          {type}
        </Typography>
      </Box>
    </Paper>
  );
};

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("open");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTaskList());
    dispatch(getUserList());
  }, [dispatch]);

  const handleCreateBug = () => {
    setOpen(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 4,
      }}
    >
      <CreateBug open={open} setOpen={setOpen} />
      <Box
        sx={{
          display: "flex",
          flex: 3,
          justifyContent: "space-evenly",
          alignItems: "center",
          overflow: "hidden",
          ml: 5,
        }}
      >
        <BugCard
          color={orange}
          count={24}
          type={"Open Bugs"}
          category={"open"}
          setCategory={setCategory}
        />
        <BugCard
          color={green}
          count={13}
          type={"Closed Bugs"}
          category={"inprogress"}
          setCategory={setCategory}
        />
        <BugCard
          color={purple}
          category={"open"}
          count={2}
          type={"Due Today"}
          setCategory={setCategory}
        />
        <BugCard
          color={blue}
          category={"open"}
          count={24}
          type={"Due in 7 Days"}
          setCategory={setCategory}
        />
        <BugCard
          color={red}
          category={"open"}
          count={24}
          type={"Overdue"}
          setCategory={setCategory}
        />
        <BugCard color={blueGrey} count={10} type={"Unassigned"} setCategory />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 9,
          overflow: "auto",
        }}
      >
        <Box sx={{ display: "flex", ml: 2, mb: 1 }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: red[300] }}
            onClick={handleCreateBug}
          >
            Create Bug
          </Button>
        </Box>
        <Tasks category={category} />
      </Box>
    </Box>
  );
};

export default Dashboard;
