import { Box, Card, CardContent, CardMedia, Link, Typography, useTheme } from '@mui/material'
import React from 'react'
import styles from './styles'

const FeaturedMovie = ({movie}) => {
    const theme = useTheme()
    const classes = styles(theme)
  return (
    <Box component={Link} to={`/movie/${movie.id}`} sx={classes.featuredCardContainer}>
        <Card sx={classes.card}>
            <CardMedia
                media='picture'
                alt={movie.title}
                sx={classes.cardMedia}
                image={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
                title={movie.title}
            />
            <Box padding='20px'>
                <CardContent sx={classes.cardContent}>
                    <Typography variant='h5' gutterBottom>{movie.title}</Typography>
                    <Typography variant='body2'>{movie.overview}</Typography>
                </CardContent>
            </Box>
        </Card> 
    </Box>
  )
}

export default FeaturedMovie