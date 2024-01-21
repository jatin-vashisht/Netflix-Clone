import {
  useTheme,
  Typography,
  Grid,
  Grow,
  Tooltip,
  Rating,
  Box,
} from "@mui/material";
import React from "react";
import styles from "./styles";
import { Link } from "react-router-dom";

const Movie = ({ movie, i }) => {
  const theme = useTheme();
  const classes = styles(theme);
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} style={classes.movie}>
      <Grow in key={i} timeout={(i + 1) * 250}>
        <Link style={classes.links} to={`/movie/${movie.id}`}>
          <Box sx={classes.image}>
            <img
              alt={movie.title}
              style={classes.image}
              src={
                movie.poster_path
                  ? `http://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : "https://www.fillmurray.com/200/300"
              }
            />
          </Box>
          <Typography style={classes.title} variant="h6">
            {movie.title}
          </Typography>
          <Tooltip disableTouchListener title={`${movie.vote_average} / 10`}>
            <div>
              <Rating readOnly value={movie.vote_average / 2} precision={0.1} />
            </div>
          </Tooltip>
        </Link>
      </Grow>
    </Grid>
  );
};

export default Movie;
