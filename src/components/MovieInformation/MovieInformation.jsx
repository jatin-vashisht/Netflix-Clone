import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useGetMovieQuery, useGetRecommendationsQuery } from "../../services/TMDB";
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Grid,
  Modal,
  Rating,
  Typography,
  useTheme,
} from "@mui/material";
import styles from "./styles";
import genreIcons from "../../assets/genres";
import { useDispatch } from "react-redux";
import { selectGenreOrCategory } from "../../features/genreOrCategory";
import { ArrowBack, Favorite, FavoriteBorderOutlined, Language, Movie, PlusOne, Remove, Theaters } from "@mui/icons-material";
import {MovieList} from '..'

const MovieInformation = () => {
  const [open, setOpen] = useState(false)
  const { id } = useParams();
  const { data, error, isFetching } = useGetMovieQuery(id);
  const { data: recommendations, isFetching: isRecommendationsFetching } = useGetRecommendationsQuery({list: '/recommendations', movie_id: id});
  const theme = useTheme();
  const classes = styles(theme);
  const dispatch = useDispatch();

  const isMovieFavorited = false
  const isMovieWatchlisted = false

  const addToFavorites = () => {}
  const addToWatchlist = () => {}

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center">
        <Link to="/">Something went wrong - Go Back</Link>
      </Box>
    );
  }

  return (
    <Grid container sx={classes.containerSpaceAround}>
      <Grid item sm={12} lg={4}>
        <Box sx={classes.posterContainer}>
          <img
            style={classes.poster}
            src={`http://image.tmdb.org/t/p/w500/${data?.poster_path}`}
            alt={data?.title}
          />
        </Box>
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography variant="h3" align="center" gutterBottom>
          {data?.title} ({data.release_date.split("-")[0]})
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {data?.tagline}
        </Typography>
        <Grid item container sx={classes.containerSpaceAround}>
          <Box display="flex" align="center">
            <Rating readOnly value={data.vote_average / 2} />
            <Typography
              variant="subtitle1"
              gutterBottom
              style={{ marginLeft: "10px" }}
            >
              {data?.vote_average} / 10
            </Typography>
          </Box>
          <Typography variant="h6" align="center" gutterBottom>
            {data?.runtime}min{" "}
            {data?.spoken_languages.length > 0
              ? `/ ${data?.spoken_languages[0].name}`
              : ""}
          </Typography>
        </Grid>
        <Grid item sx={classes.genresContainer}>
          {data?.genres?.map((genre, i) => (
            <Box key={i} sx={classes.linksContainer}>
              <Link
                key={genre.name}
                style={classes.links}
                to="/"
                onClick={() => dispatch(selectGenreOrCategory(genre.id))}
              >
                <img
                  src={genreIcons[genre.name.toLowerCase()]}
                  style={classes.genreImage}
                  height={30}
                />
                <Typography color="textPrimary" variant="subtitle1">
                  {genre?.name}
                </Typography>
              </Link>
            </Box>
          ))}
        </Grid>
        <Typography variant="h5" gutterBottom style={{marginBottom: '10px'}}>
          Overview
        </Typography>
        <Typography style={{marginBottom: '2rem'}}>
          {data?.overview}
        </Typography>
        <Typography variant="h5" gutterBottom>Top Cast</Typography>
        <Grid item container spacing={2}>
          {data && data.credits?.cast?.map((character, i) => (
            character.profile_path && <Grid item key={i} xs={4} md={2} component={Link} to={`/actors/${character.id}`} style={{textDecoration: 'none'}}>
              <img style={classes.castImage} src={`http://image.tmdb.org/t/p/w500/${character.profile_path}`} alt={character.name} />
              <Typography color="textPrimary">{character?.name}</Typography>
              <Typography color="textSecondary">{character?.character.split('/')[0]}</Typography>
            </Grid>
          )).slice(0,6)}
        </Grid>
        <Grid item container style={{marginTop: '2rem'}}>
          <Box sx={classes.buttonsContainer}>
            <Grid item xs={12} sm={6} sx={classes.buttonsContainer}>
              <ButtonGroup size='small' variant='outlined'>
                <Button target='_blank' rel='noopener noreferrer' href={data?.homepage} endIcon={<Language />}>Website</Button>
                <Button target='_blank' rel='noopener noreferrer' href={`http://www.imdb.com/title/${data?.imdb_id}`} endIcon={<Movie />}>IMDB</Button>
                <Button onClick={() => setOpen(true)} href="#" endIcon={<Theaters />}>Trailer</Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={12} sm={6} sx={classes.buttonsContainer}>
              <ButtonGroup size='medium' variant='outlined'>
                <Button onClick={addToFavorites} endIcon={isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />}>
                  {isMovieFavorited ? 'unfavorite' : 'favorite'}
                </Button>
                <Button onClick={addToWatchlist} endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}>
                  Watchlist
                </Button>
                <Button endIcon={<ArrowBack />} sx={{borderColor: 'primary.main'}}>
                  <Typography style={{textDecoration: 'none'}} component={Link} to='/' color='inherit' variant="subtitle2">
                    Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Box marginTop='5rem' width='100%'>
        <Typography variant='h3' align='center' gutterBottom>
          You might also like
        </Typography>
        {recommendations
        ? <MovieList movies={recommendations} numberOfMovies={12} />
        : <Box>Sorry, Nothing was found.</Box>}
      </Box>
      <Modal
        closeAfterTransition
        sx={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
      >
        {data?.videos?.results?.length > 0 && (
          <iframe
            autoPlay
            style={classes.video}
            title='Trailer'
            src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
            allow='autoplay'
          />
        )}
      </Modal>
    </Grid>
  );
};

export default MovieInformation;
