import React from "react";
import { Link } from "react-router-dom";
import "./MovieCard.css";

export const MovieCard = ({ movieData }) => {
  return (
    <div className="m-3">
      <div className="card" style={{ width: "18rem" }}>
        <img
          src={`${process.env.REACT_APP_IMG_URL}${
            movieData?.poster_path
              ? movieData.poster_path
              : "/zUqyn3aQXTzeP1n8yd8Udt1twYA.jpg"
          }`}
          className="card-img-top "
          alt="..."
          width={"287"}
          height={"429"}
        />
        <div className="card-body">
          <h5 className="card-title">{`${movieData.title}`}</h5>
          <p
            className="card-text"
            height={"100"}
          >{`${movieData.overview.substring(0, 20)}`}</p>
          <Link to={`/moviesdetails/${movieData.id}`} className="btn more-btn">
            See More
          </Link>
        </div>
      </div>
    </div>
  );
};
