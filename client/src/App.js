import React, { useState } from "react";
import { Box } from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard, ViewKanban, Chat } from "@mui/icons-material";
import NavBar from "./components/NavBar/NavBar";
import Auth from "./components/Auth/Auth";
import SideBar from "./components/SideBar/SideBar";
import HomePage from "./pages/HomePage";
import KanbanBoard from "./pages/KanbanBoard";
import ChatView from "./pages/Chat";

const App = () => (
  <BrowserRouter>
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <NavBar />
      <Box
        sx={{
          display: "flex",
          height: "calc(100vh - 60px)",
          width: "100%",
        }}
      >
        <SideBar />
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/kanban" element={<KanbanBoard />} />
          <Route path="/chat" element={<ChatView />} />
        </Routes>
      </Box>
    </Box>
  </BrowserRouter>
);

export default App;
