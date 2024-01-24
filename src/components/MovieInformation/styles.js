const styles = (theme) => ({
  containerSpaceAround: {
    display: "flex",
    justifyContent: "space-around",
    margin: "10px 0 !important",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      flexWrap: "wrap",
    },
  },
  posterContainer: {
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
      margin: "0 auto",
      width: "50%",
    },
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto",
      width: "100%",
      height: "350px",
    },
  },
  poster: {
    borderRadius: "20px",
    boxShadow: "0.5em 1em 1em rgb(64, 64, 70)",
    width: "80%",
  },
  genresContainer: {
    margin: "10px 0 !important",
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  genreImage: {
    filter: theme.palette.mode === "dark" && "invert(1)",
    marginRight: "10px",
  },
  linksContainer: {
    [theme.breakpoints.down("sm")]: {
      padding: "0.5rem 1rem",
    },
  },
  links: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textDecoration: "none",
  },
  castImage: {
    width: '100%',
    maxWidth: '7em',
    height: '8em',
    borderRadius: '10px',
    objectFit: 'cover',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    }
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  video: {
    width: '50%',
    height: '50%',
    // [theme.breakpoints.down('sm')]: {
    //   width: '90%',
    //   height: '90%',
    // }
  }
});

export default styles;
