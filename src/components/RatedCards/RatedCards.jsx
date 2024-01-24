import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import styles from "./styles";
import {Movie} from "..";

const RatedCards = ({ title, data }) => {
  const theme = useTheme();
  const classes = styles(theme);
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Box display="flex" flexWrap="wrap" sx={classes.container}>
        {data?.results.map((movie, i) => (
          <Movie key={movie.id} movie={movie} i={i} />
        ))}
      </Box>
    </Box>
  );
};

export default RatedCards;
