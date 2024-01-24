import React, {useState} from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import {useGetMoviesQuery} from '../../services/TMDB'
import {MovieList, Pagination} from '..'

const Movies = () => {
  // const [page, setPage] = useState(1)
  const {genreIdOrCategoryName, page, searchQuery} = useSelector((state) => state.genreOrCategoryReducer)
  const {data, error, isFetching} = useGetMoviesQuery({genreIdOrCategoryName, page, searchQuery})
  if(isFetching){
    return (
      <Box display='flex' justifyContent='center'>
        <CircularProgress size='4rem' />
      </Box>
    )
  }

  if(!data.results.length){
    return (
      <Box display='flex' alignItems='center' mt='20px'>
        <Typography variant='h4'>
          No movies that match that name.
          <br />
          Please search for something else.
        </Typography>
      </Box>
    )
  }

  if(error) return 'An error has occured.'

  return (
    <div>
      <MovieList movies={data} />
      <Pagination currentPage={page} totalPages={data.total_pages} />
    </div>
  )
}

export default Movies