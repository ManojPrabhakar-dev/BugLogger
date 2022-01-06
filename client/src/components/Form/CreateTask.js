import React from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
} from "@material-ui/core";
import useStyles from "./styles";

const CreateTask = () => {
  const classes = useStyles();
  return (
    <Paper className={`${classes.paper}`}>
      Form Element Container
      {/* <form autoComplete="off" noValidate>
        <Typography variant="h6">{"Creating Task"}</Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={"Title"}
        />
        <TextField
          name="description"
          variant="outlined"
          label="description"
          fullWidth
          multiline
          rows={4}
          value={"Description"}
        />
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
      </form> */}
    </Paper>
  );
};

export default CreateTask;
