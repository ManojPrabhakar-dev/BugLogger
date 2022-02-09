import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import { Avatar, Menu } from "@mui/material";
import { MenuIcon, BugReport, AccountCircle } from "@mui/icons-material";
import { red, deepPurple } from "@mui/material/colors";
import { signUp } from "../../actions/authAction";
import { LOGOUT } from "../../constants/actionTypes";
import decode from "jwt-decode";

export default function NavBar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    console.log("use effect triggered with dependency");
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
    // setUser(JSON.parse(localStorage.getItem("profile")));
  }, []);

  const handleChange = (event) => {
    // setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    logout();
  };

  const logout = () => {
    dispatch({ type: LOGOUT });
    navigate("/");
    // setUser(null);
  };

  return (
    <Box sx={{ display: "flex", flex: 1, width: "100%", height: "60px" }}>
      <AppBar
        position="static"
        sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 1,
            ml: 2,
          }}
        >
          <BugReport sx={{ fontSize: 36, color: red[500] }} />
          <Typography variant="h6" component="div">
            Bug Logger
          </Typography>
        </Box>
        <Toolbar sx={{ display: "flex" }}>
          <Typography variant="h6" component="div">
            {user?.result ? `${user.result?.name}` : "user"}
          </Typography>
          <IconButton
            size="small"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <Avatar
              sx={{
                height: 32,
                width: 32,
                backgroundColor: deepPurple[500],
                color: (theme) =>
                  theme.palette.getContrastText(deepPurple[500]),
              }}
              alt={user?.result.name}
              src={user?.result.imageUrl}
            >
              {user?.result.name.charAt(0).toUpperCase()}
            </Avatar>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
