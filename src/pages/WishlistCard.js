import axios from "axios";
import React, { useEffect, useState } from "react";
import { MovieCard } from "./MovieCard";

export const WishlistCard = ({ movieID }) => {
  const [moviesDetails, setMoviesDetails] = useState([]);
  const fetchMoviesDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieID}?language=en-US`
      );
      setMoviesDetails(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMoviesDetails();
  }, [movieID]);
  return (
    <>
      <MovieCard movieData={moviesDetails} wishlist={1} />
    </>
  );
};
