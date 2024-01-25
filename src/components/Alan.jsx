import alanBtn from "@alan-ai/alan-sdk-web";
import { useContext, useEffect } from "react";
import { ColorModeContext } from "../utils/ToggleColorMode";
import { fetchToken } from "../utils";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {selectGenreOrCategory, searchMovie} from '../features/genreOrCategory'

const useAlan = () => {
  const { setMode } = useContext(ColorModeContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    alanBtn({
      key: process.env.REACT_APP_ALAN_KEY,
      onCommand: ({ command, mode, genres, genreOrCategory, query }) => {
        if (command === "changeMode") {
          if (mode === "light") {
            setMode("light");
          } else {
            setMode("dark");
          }
        } else if (command === "login") {
          fetchToken();
        } else if (command === "logout") {
          localStorage.clear();
          navigate('/')
        } else if (command === "chooseGenre") {
          const foundGenre = genres.find((g) => g.name.toLowerCase() === genreOrCategory.toLowerCase())
          if(foundGenre){
            navigate("/");
            dispatch(selectGenreOrCategory(foundGenre.id))
          } else { // top rated | upcoming | popular
            const category = genreOrCategory.startsWith('top') ? 'top_rated' : genreOrCategory
            console.log(category)
            navigate("/")
            dispatch(selectGenreOrCategory(category))
          }
        } else if(command === 'search'){
          dispatch(searchMovie(query))
        } else if(command === 'go_back'){
          navigate(-1)
        }
      },
    });
  }, [dispatch, navigate, setMode]);
};

export default useAlan;
