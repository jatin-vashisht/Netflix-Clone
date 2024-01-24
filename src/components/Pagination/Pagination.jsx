import { Box, Button, Typography, useTheme } from "@mui/material";
import styles from "./styles";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {setPage} from '../../features/genreOrCategory'
const Pagination = ({currentPage, totalPages}) => {
  const theme = useTheme();
  const classes = styles(theme);
  const dispatch = useDispatch()

  const handlePrev = () => {
    if(currentPage !== 1){
      dispatch(setPage(-1))
    }
  }
  
  const handleNext = () => {
    if(currentPage !== totalPages){
      dispatch(setPage(1))
    }
  }

  if(totalPages === 0)  return null

  return (
    <Box sx={classes.container}>
        <Button disabled={currentPage === 1} onClick={handlePrev} sx={classes.button} variant="contained" color="primary" type="button">Prev</Button>
        <Typography variant="h4" sx={classes.pageNumber}>{currentPage}</Typography>
        <Button disabled={currentPage === totalPages} onClick={handleNext} sx={classes.button} variant="contained" color="primary" type="button">Next</Button>
    </Box>
  )
};

export default Pagination;
