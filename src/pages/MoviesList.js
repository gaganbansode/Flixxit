import React, { useEffect, useState } from "react";
import { MovieCard } from "./MovieCard";
import axios from "axios";
axios.defaults.headers.common[
  "Authorization"
] = `${process.env.REACT_APP_TMDB}`;

export const MoviesList = ({ catID,catName }) => {
  const [movieList, setmovieList] = useState([]);
  const fetchMovieList = async () => {
    try {
      const { data } = await axios.get(
      `https://api.themoviedb.org/3/list/${catID}?language=en-US`
    );
    setmovieList(data?.items);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchMovieList();
  }, [0])
  
  return <>
    {movieList.length>0 ? (
    <div className="row mt-3 ">
            <h4 class="lead text-white">{catName}</h4>
            <div className="movies-row">
    {movieList.slice(0, 10)?.map((ele) => (
        <MovieCard movieData={ele} />
    ))}
        
        </div>
          </div>
    ):''}
     
    
  
  </>;
};
