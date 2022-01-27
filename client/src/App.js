import React from "react";
import { Container, Box } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Auth from "./components/Auth/Auth";
import Dashboard from "./components/UI_Template/Dashboard_grid";
import DashboardFlex from "./components/UI_Template/Dashboard_flex";
import NavBar from "./components/NavBar/NavBar";

const App = () => (
  <BrowserRouter>
    <Box sx={{ height: "100vh" }}>
      {/* <Container maxWidth="lg"> */}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Auth />} />
        {/* <Route path="/dash_grid" element={<Dashboard />} />
        <Route path="/" element={<DashboardFlex />} /> */}
      </Routes>
      {/* </Container> */}
    </Box>
  </BrowserRouter>
);

export default App;
