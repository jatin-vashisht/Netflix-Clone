import { Grid, useTheme } from "@mui/material";
import React from "react";
import styles from "./styles";
import {Movie} from "..";

const MovieList = ({ movies }) => {
  const theme = useTheme();
  const classes = styles(theme);
  console.log(classes.moviesContainer)
  return <Grid container style={classes.moviesContainer} spacing={2}>
    {movies.results.map((movie,i) => (
        <Movie key={i} movie={movie} i={i} />
    ))}
  </Grid>;
};

export default MovieList;
