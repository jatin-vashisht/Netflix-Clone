import { Grid, useTheme } from "@mui/material";
import React from "react";
import styles from "./styles";
import {Movie} from "..";

const MovieList = ({ movies, numberOfMovies, excludeFirst }) => {
  const theme = useTheme();
  const classes = styles(theme);
  const startFrom = excludeFirst ? 1 : 0
  return <Grid container sx={classes.moviesContainer} spacing={2}>
    {movies.results.slice(startFrom, numberOfMovies).map((movie,i) => (
        <Movie key={i} movie={movie} i={i} />
    ))}
  </Grid>;
};

export default MovieList;
