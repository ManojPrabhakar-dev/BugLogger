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

const Dashboard = () => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(12,1fr)",
        gridTemplateRows: "repeat(12,1fr)",
        height: "100%",
      }}
    >
      <Box sx={{ gridRow: "span 1", gridColumn: "span 12" }}>
        <NavBar />
      </Box>
      <Box
        sx={{
          gridColumn: "span 2",
          gridRow: "span 11",
        }}
      >
        Left Column
      </Box>
      <Box
        sx={{
          gridColumn: "span 8",
          gridRow: "span 11",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          rowGap: 3,
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
      <Box sx={{ gridColumn: "span 2", gridRow: "span 11" }}>right Column</Box>
    </Box>
  );
};

export default Dashboard;
