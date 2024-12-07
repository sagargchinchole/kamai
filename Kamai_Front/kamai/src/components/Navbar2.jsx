import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Box
} from '@mui/material';
import React, { useState } from "react";
import AddBusinessRoundedIcon from "@mui/icons-material/AddBusinessRounded";
import UserDrawerComp from "./UserDrawer";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {

  const [value, setValue] = useState();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  
  return (
    <AppBar>
      <Toolbar variant="dense">
        <AddBusinessRoundedIcon sx={{ transform: "scale(1.2)" }} />
        <Typography sx={{ fontSize: "1.5rem", paddingLeft: "0.5%" }}>
          Kamai
        </Typography>
        {isMatch ? (
          <>
            <UserDrawerComp />
          </>
        ) : (
          <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                sx={{ margin: "5px" }}
                TabIndicatorProps={{
                  style: {
                    backgroundColor: "#000B58"
                  }
                }}
                textColor="inherit"
                value={value}
                onChange={(e, value) => setValue(value)}
              >
                <Tab label="Active Deals" />
                <Tab label="My Orders" />
                <Tab label="My Earnings" />
              </Tabs>
            </Box>
            {isLoggedIn ? (
              <Button sx={{ marginLeft: "auto" }} variant="contained">
                Login
              </Button>
            ) : (
              <AccountCircleIcon sx={{ marginLeft: "auto" }} />
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar