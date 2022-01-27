import React from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Grid,
} from "@mui/material";
import NavBar from "../NavBar/NavBar";

const DashboardFlex = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box>
        <NavBar />
      </Box>
      <Box sx={{ flex: "1", display: "flex", overflow: "hidden" }}>
        <Box sx={{ flex: "2" }}>Left</Box>
        <Box
          sx={{
            flex: "8",
            display: "flex",
            flexDirection: "column",
            // overflowY: "scroll",
            overflow: "auto",
            rowGap: 3,
            height: "100%",
          }}
        >
          <Paper sx={{ p: 3 }}>Item</Paper>
          <Paper sx={{ p: 3 }}>Item</Paper>
          <Paper sx={{ p: 3 }}>Item</Paper>
          <Paper sx={{ p: 3 }}>Item</Paper>
          <Paper sx={{ p: 3 }}>Item</Paper>
          <Paper sx={{ p: 3 }}>Item</Paper>
          <Paper sx={{ p: 3 }}>Item</Paper>
          <Paper sx={{ p: 3 }}>Item</Paper>
          <Paper sx={{ p: 3 }}>Item</Paper>
        </Box>
        <Box sx={{ flex: "2" }}>right</Box>
      </Box>
    </Box>
  );
};

export default DashboardFlex;
