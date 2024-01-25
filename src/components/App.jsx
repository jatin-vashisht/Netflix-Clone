import React, { useRef } from "react";
import { Box, CssBaseline, useTheme } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { Actors, Movies, MovieInformation, NavBar, Profile } from "./index";
import styles from "./styles.js";
import useAlan from "./Alan";

const App = () => {
  const theme = useTheme();
  const classes = styles(theme);
  const alanBtnContainer = useRef()

  useAlan()

  return (
    <div style={classes.root}>
      <CssBaseline />
      <NavBar />
      <Box sx={classes.content}>
        <div style={classes.toolbar} />
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/movie/:id" element={<MovieInformation />} />
          <Route path="/actors/:id" element={<Actors />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </Box>
      <div ref={alanBtnContainer} />
    </div>
  );
};

export default App;
