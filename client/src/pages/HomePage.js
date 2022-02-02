import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Grid,
} from "@mui/material";
import NavBar from "../components/NavBar/NavBar";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Dashboard, ViewKanban, Chat } from "@mui/icons-material";
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

const BugCard = ({ count, type, color }) => {
  return (
    <Paper sx={{ backgroundColor: color[200], borderRadius: 3 }}>
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

const HomePage = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTaskList());
    dispatch(getUserList());
  }, [dispatch]);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handleCreateBug = () => {
    setOpen(true);
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(24,1fr)",
        gridTemplateRows: "repeat(12,1fr)",
        height: "100%",
      }}
    >
      <CreateBug open={open} setOpen={setOpen} />
      <Box sx={{ gridRow: "span 1", gridColumn: "span 24" }}>
        <NavBar />
      </Box>
      <Box
        sx={{
          gridRow: "span 11",
          gridColumn: "span 5",
          backgroundColor: "#F6EFE6",
        }}
      >
        <List component="nav" aria-label="main dashboard kanban chat">
          <ListItemButton
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
          >
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}
          >
            <ListItemIcon>
              <ViewKanban />
            </ListItemIcon>
            <ListItemText primary="Kanban" />
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2)}
          >
            <ListItemIcon>
              <Chat />
            </ListItemIcon>
            <ListItemText primary="Chat" />
          </ListItemButton>
        </List>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gridRow: "span 11",
          gridColumn: "span 19",
        }}
      >
        <Box
          sx={{
            flex: 3,
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            overflow: "hidden",
            ml: 5,
            gap: 8,
          }}
        >
          <BugCard color={orange} count={24} type={"Open Bugs"} />
          <BugCard color={green} count={13} type={"Closed Bugs"} />
          <BugCard color={purple} count={2} type={"Due Today"} />
          <BugCard color={blue} count={24} type={"Due in 7 Days"} />
          <BugCard color={red} count={24} type={"Overdue"} />
          <BugCard color={blueGrey} count={10} type={"Unassigned"} />
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
          <Tasks />
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
