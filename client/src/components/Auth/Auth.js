import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Grid,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { signIn, signUp } from "../../actions/authAction";
import { Visibility, VisibilityOff, Lock } from "@mui/icons-material/";

const Auth = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleInputChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (isSignup) {
      dispatch(signUp(navigate, user));
    } else {
      dispatch(signIn(navigate, user));
    }
  }

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100vh",
      }}
      maxWidth="xs"
    >
      <Paper>
        <Box sx={{ textAlign: "center" }}>
          <Lock sx={{ fontSize: 42, marginTop: 2, color: "#db0f75" }} />
        </Box>
        <Box
          sx={{
            display: "grid",
            flexDirection: "column",
            gridGap: "10px",
            px: 3,
            paddingBottom: 1,
          }}
          component="form"
          onSubmit={handleSubmit}
        >
          <Typography sx={{ textAlign: "center" }} variant="h5">
            {isSignup ? "SignUp" : "SignIn"}
          </Typography>
          {isSignup && (
            <>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="firstName"
                    label="first name"
                    fullWidth
                    required
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="lastName"
                    fullWidth
                    label="last name"
                    required
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
            </>
          )}

          <TextField
            name="email"
            label="Email"
            fullWidth
            required
            onChange={handleInputChange}
          />
          <TextField
            name="password"
            label="password"
            type={showPassword ? "text" : "password"}
            fullWidth
            required
            onChange={handleInputChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      setShowPassword((prev) => !prev);
                    }}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {isSignup && (
            <TextField
              name="confirm_password"
              label="confirm password"
              type="password"
              fullWidth
              required
              onChange={handleInputChange}
            />
          )}
          <Button type="submit" variant="contained">
            {isSignup ? "SignUp" : "SignIn"}
          </Button>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="subtitle1">
              {isSignup ? "Already have an account?" : "Don't have an account?"}
            </Typography>
            <Button
              onClick={() => {
                setIsSignup((preState) => !preState);
              }}
            >
              {isSignup ? "SignIn" : "SignUp"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Auth;
