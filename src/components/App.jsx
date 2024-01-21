import React from "react";
import { CssBaseline, useTheme } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { Actors, Movies, MovieInformation, NavBar, Profile } from "./index";
import styles from "./styles.js";

const App = () => {
  const theme = useTheme();
  const classes = styles(theme);
  return (
    <div style={classes.root}>
      <CssBaseline />
      <NavBar />
      <main style={classes.content}>
        <div style={classes.toolbar} />
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/movie/:id" element={<MovieInformation />} />
          <Route path="/actors/:id" element={<Actors />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
