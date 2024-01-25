import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetActorsDetailsQuery,
  useGetMoviesByActorIdQuery,
} from "../../services/TMDB";
import { ArrowBack } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import styles from "./styles";
import { MovieList, Pagination } from "..";
import { useSelector } from "react-redux";

const Actors = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const classes = styles(theme);
  const { id } = useParams();
  const { page } = useSelector((state) => state.genreOrCategoryReducer);
  const { data, isFetching, error } = useGetActorsDetailsQuery(id);
  const { data: movies, isFetching: isMoviesFetching } = useGetMoviesByActorIdQuery({ id, page });

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          color="primary"
        >
          Go Back
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={5} xl={4}>
          <img
            style={classes.image}
            src={`http://image.tmdb.org/t/p/w780/${data?.profile_path}`}
            alt={data?.name}
          />
        </Grid>
        <Grid
          item
          lg={7}
          xl={8}
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h2" gutterBottom>
            {data?.name}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Born: {new Date(data?.birthday).toDateString()}
          </Typography>
          <Typography variant="body1" align="justify" paragraph>
            {data?.biography || "Sorry, no biography yet..."}
          </Typography>
          <Box marginTop="2rem" display="flex" justifyContent="space-around">
            <Button
              variant="contained"
              color="primary"
              target="_blank"
              href={`https://www.imdb.com/name/${data?.imdb_id}`}
            >
              IMDB
            </Button>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate(-1)}
              color="primary"
            >
              Back
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box margin="2rem 0">
        <Typography variant="h2" gutterBottom align="center">
          Movies
        </Typography>
        {isMoviesFetching && (
          <Box display="flex" justifyContent="center">
            <CircularProgress size="4rem" />
          </Box>
        )}
        {!isMoviesFetching &&
          (movies && movies?.results?.length ? (
            <>
              <MovieList movies={movies} numberOfMovies={12} />
              <Pagination
                currentPage={page}
                totalPages={movies?.total_pages}
              />
            </>
          ) : (
            <Box>
              <Typography variant="h6" align="center">
                Sorry, nothing was found.
              </Typography>
            </Box>
          ))}
      </Box>
    </>
  );
};

export default Actors;
