import React from "react";
import { TextField, Button, Typography, Paper, Box, Grid } from "@mui/material";

const CreateTask = () => {
  return (
    <Paper
      sx={{
        padding: "12px",
        gridRow: "span 5",
        margin: "4px",
        // backgroundColor: "#fd3",
      }}
    >
      <Box
        component="form"
        sx={{
          display: "grid",
          gridTemplateRows: "repeat(4,1fr)",
          height: "100%",
          // backgroundColor: "yellow",
        }}
        autoComplete="off"
        noValidate
      >
        <Typography
          variant="h6"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {"Creating Task"}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <TextField
              name="title"
              variant="outlined"
              label="Title"
              fullWidth
              size="small"
              value={"Title"}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              name="author"
              variant="outlined"
              label="author"
              size="small"
              fullWidth
              value={"author"}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <TextField
              name="description"
              variant="outlined"
              label="description"
              size="small"
              fullWidth
              value={"Description"}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              name="priority"
              variant="outlined"
              label="priority"
              size="small"
              fullWidth
              value={"priority"}
            />
          </Grid>
        </Grid>
        <Button
          sx={{ margin: "auto", width: "60%" }}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
        >
          Submit
        </Button>
      </Box>
    </Paper>
  );
};

export default CreateTask;
