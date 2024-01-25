import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  Box,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./styles";
import { useGetGenresQuery } from "../../services/TMDB";
import genreIcons from "../../assets/genres";
import { useDispatch } from "react-redux";

import {selectGenreOrCategory} from '../../features/genreOrCategory'

const categories = [
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
  { label: "Upcoming", value: "upcoming" },
];

const logo = 'https://firebasestorage.googleapis.com/v0/b/disney-plus-hotstar-clon-13914.appspot.com/o/images%2Flogo.png?alt=media&token=f2483cb9-28a2-4f73-9492-acf37dba5576'

const Sidebar = ({ setMobileOpen }) => {
  const theme = useTheme();
  const classes = styles(theme);
  const { data, isFetching } = useGetGenresQuery();

  const dispatch = useDispatch()
  return (
    <>
      <Link to="/" style={classes.imageLink}>
        <img
          style={classes.image}
          src={logo}
          alt="Netflix Logo"
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link key={value} style={classes.link} to="/">
            <ListItem onClick={() => {dispatch(selectGenreOrCategory(value)); setMobileOpen(false)}} button>
            <ListItemIcon>
                  <img src={genreIcons[label.toLowerCase()]} style={classes.genreImage} height={30} alt="Genre Icon" />
                </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          data.genres.map(({ id, name }) => (
            <Link key={name} style={classes.link} to="/">
            <ListItem onClick={() => {dispatch(selectGenreOrCategory(id)); setMobileOpen(false)}} button>
                <ListItemIcon>
                  <img src={genreIcons[name.toLowerCase()]} style={classes.genreImage} height={30} alt="Genre Icon" />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>
            </Link>
          ))
        )}
      </List>
    </>
  );
};

export default Sidebar;
