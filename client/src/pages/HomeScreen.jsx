import React, { useState } from "react";
import { Box } from "@mui/material";
import NavBar from "../components/NavBar/NavBar";
import SideBar from "../components/SideBar/SideBar";
import DashBoard from "./Dashboard";
import KanbanBoard from "./KanbanBoard";
import ChatView from "./Chat";

const HomeScreen = () => {
  const [screen, setScreen] = useState("dashboard");
  const getScreen = (_screen) => {
    if (_screen === "dashboard") {
      return <DashBoard />;
    } else if (_screen === "kanban") {
      return <KanbanBoard />;
    } else if (_screen === "chat") {
      return <ChatView />;
    }
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <NavBar />
      <Box
        sx={{
          display: "flex",
          height: "calc(100vh - 60px)",
          width: "100%",
        }}
      >
        <SideBar setScreen={setScreen} />
        {getScreen(screen)}
      </Box>
    </Box>
  );
};

export default HomeScreen;
