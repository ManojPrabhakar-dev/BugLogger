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
      <form autoComplete="off" noValidate>
        <Box className={`${classes.form}`}>
          <Typography variant="h6" className={`${classes.heading}`}>
            {"Creating Task"}
          </Typography>
          <Box className={`${classes.item1}`}>
            <Box className={`${classes.mr}`} sx={{ flex: 5 }}>
              <TextField
                name="title"
                variant="outlined"
                label="Title"
                fullWidth
                size="small"
                value={"Title"}
              />
            </Box>
            <Box sx={{ flex: 2 }}>
              <TextField
                name="author"
                variant="outlined"
                label="author"
                size="small"
                fullWidth
                value={"author"}
              />
            </Box>
          </Box>
          <Box className={`${classes.item1}`}>
            <Box className={`${classes.mr}`} sx={{ flex: 5 }}>
              <TextField
                name="description"
                variant="outlined"
                label="description"
                size="small"
                fullWidth
                value={"Description"}
              />
            </Box>
            <Box sx={{ flex: 2 }}>
              <TextField
                name="priority"
                variant="outlined"
                label="priority"
                size="small"
                fullWidth
                value={"priority"}
              />
            </Box>
          </Box>
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default CreateTask;
