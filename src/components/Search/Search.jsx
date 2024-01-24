import { Box, InputAdornment, TextField, useTheme } from '@mui/material';
import React, { useState } from 'react'
import styles from './styles';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';
import {searchMovie} from '../../features/genreOrCategory'
import { useLocation } from 'react-router-dom';

const Search = () => {
  const [query, setQuery] = useState('')
  const theme = useTheme();
  const classes = styles(theme);
  const dispatch = useDispatch()
  const location = useLocation()

  const handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      dispatch(searchMovie(query))
    }
  }

  if(location.pathname !== '/') return null

  return (
    <Box sx={classes.searchContainer}>
      <TextField
        onKeyDown={handleKeyPress}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        variant='standard'
        sx={classes.input}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />
    </Box>
  )
}

export default Search