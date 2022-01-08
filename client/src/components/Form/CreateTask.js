import React from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Grid,
} from "@material-ui/core";
import useStyles from "./styles";

const CreateTask = () => {
  const classes = useStyles();
  return (
    <Paper className={`${classes.paper}`}>
      <form autoComplete="off" noValidate className={`${classes.form}`}>
        {/* <Box className={`${classes.form}`}> */}
        <Typography variant="h6" className={`${classes.heading}`}>
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
          className={`${classes.buttonSubmit}`}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
        >
          Submit
        </Button>
        {/* </Box> */}
      </form>
    </Paper>
  );
};

export default CreateTask;
