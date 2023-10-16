import React, { useEffect, useState } from "react";
import { MovieCard } from "./MovieCard";
import axios from "axios";
import { Link } from "react-router-dom";
axios.defaults.headers.common[
  "Authorization"
] = `${process.env.REACT_APP_TMDB}`;

export const MoviesList = ({ catID, catName, show = "true" }) => {
  const [movieList, setmovieList] = useState([]);
  const fetchMovieList = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/list/${catID}?language=en-US`
      );
      setmovieList(data?.items);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMovieList();
  }, [catID]);

  return (
    <>
      {movieList.length ? (
        <div className="trending__product">
          <div className="row">
            <div className="col-lg-8 col-md-8 col-sm-8">
              <div className="section-title">
                <h4>{catName}</h4>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4">
              {show ? (
                <>
                  <div className="btn__all">
                    <Link
                      to={`/category/${catID}/${catName}`}
                      className="primary-btn"
                    >
                      View All <span className="arrow_right" />
                    </Link>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="row">
            {movieList.slice(0, show ? "12" : movieList.length)?.map((ele) => (
              <>
                <MovieCard movieData={ele} />
              </>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
