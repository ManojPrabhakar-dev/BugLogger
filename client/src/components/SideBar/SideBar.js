import React, { useState } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Dashboard, ViewKanban, Chat } from "@mui/icons-material";

const SideBar = ({ setScreen }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (event, index, route) => {
    setSelectedIndex(index);
    console.log(route);
    setScreen(route);
  };
  return (
    <Box
      sx={{
        flex: 1,
        position: "sticky",
        top: "60px",
        backgroundColor: "#F6EFE6",
      }}
    >
      <List component="nav" aria-label="main dashboard kanban chat">
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0, "dashboard")}
        >
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1, "kanban")}
        >
          <ListItemIcon>
            <ViewKanban />
          </ListItemIcon>
          <ListItemText primary="Kanban" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2, "chat")}
        >
          <ListItemIcon>
            <Chat />
          </ListItemIcon>
          <ListItemText primary="Chat" />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default SideBar;
