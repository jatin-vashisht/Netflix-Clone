import React, { useEffect, useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Link,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "./styles";
import { AccountCircle, Brightness4, Brightness7 } from "@mui/icons-material";
import { Search, Sidebar } from "..";
import { createSessionId, fetchToken, moviesApi } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import {setUser} from '../../features/auth'

const NavBar = () => {
  const {isAuthenticated, user} = useSelector((state) => state.userReducer)
  const theme = useTheme();
  const classes = styles(theme);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [mobileOpen, setMobileOpen] = useState(true);
  const dispatch = useDispatch()
  const token = localStorage.getItem('request_token');
  const sessionIdFromLocalStorage = localStorage.getItem('session_id');

  useEffect(() => {
    const logInUser = async () => {
      if(token){
        if(sessionIdFromLocalStorage){
          const {data: userData} = await moviesApi.get(`/account?session_id=${sessionIdFromLocalStorage}`);
          dispatch(setUser(userData))
        }
        else{
          const sessionId = await createSessionId();
          const {data: userData} = await moviesApi.get(`/account?session_id=${sessionId}`);
          dispatch(setUser(userData))
        }
      }
    }
    logInUser()
  }, [token])

  return (
    <>
      <AppBar position="fixed">
        <Toolbar sx={classes.toolbar}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              sx={{ ...classes.menuButton, outline: "none" }}
              onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
            >
              <MenuIcon />
            </IconButton>
          )}
          <IconButton color="inherit" sx={{ ml: 1 }} onClick={() => {}}>
            {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search />}
          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                component={Link}
                href={`/profile/${user.id}`}
                style={classes.linkButton}
                onClick={() => {}}
              >
                {!isMobile && <>My Movies &nbsp;</>}
                <Avatar
                  style={{ width: 30, height: 30 }}
                  alt="Profile"
                  src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                />
              </Button>
            )}
          </div>
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>
      <div>
        <Box sx={classes.drawer}>
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true }}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer
              classes={{ paper: classes.drawerPaper }}
              variant="permanent"
              open
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </Box>
      </div>
    </>
  );
};

export default NavBar;
