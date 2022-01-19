import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Box } from "@mui/material";
import CreateTask from "./Form/CreateTask";
import Tasks from "./Tasks/Tasks";
import { getTaskList } from "../actions/taskAction";

const layoutTop = {
  height: "100%",
  display: "grid",
  gridTemplateRows: "repeat(12,1fr)",
  // backgroundColor: "blue",
};

const Home = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTaskList());
  }, [dispatch]);

  return (
    <Box sx={{ height: "100vh", width: "100%" }}>
      <Box sx={layoutTop}>
        <CreateTask currentIdx={currentIdx} setCurrentIdx={setCurrentIdx} />
        <Tasks setCurrentIdx={setCurrentIdx} />
      </Box>
    </Box>
  );
};

export default Home;
