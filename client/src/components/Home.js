import React from "react";
import { Box } from "@mui/material";
import CreateTask from "./Form/CreateTask";
import Tasks from "./Tasks/Tasks";

const layoutTop = {
  height: "100%",
  display: "grid",
  gridTemplateRows: "repeat(12,1fr)",
  // backgroundColor: "blue",
};

const Home = () => {
  return (
    <Box sx={{ height: "100vh", width: "100%" }}>
      <Box sx={layoutTop}>
        <CreateTask />
        <Tasks />
      </Box>
    </Box>
  );
};

export default Home;
