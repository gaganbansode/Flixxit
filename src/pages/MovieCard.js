import React from "react";
import { Link } from "react-router-dom";

export const MovieCard = ({ movieData }) => {
  return (
    <div className="col-lg-3 col-md-6 col-sm-6">
      <div className="product__item">
        <div
          style={{
            backgroundImage: `url(${process.env.REACT_APP_IMG_URL}${movieData?.poster_path})`,
          }}
          className="product__item__pic set-bg"
        >
          <div className="ep">{movieData.vote_average} / 10</div>
          {/* <div className="comment">
            <i className="fa fa-comments" /> 11
          </div>
          <div className="view">
            <i className="fa fa-eye" /> 9141
          </div> */}
        </div>
        <div className="product__item__text">
          {/* <ul>
            <li>Active</li>
            <li>Movie</li>
          </ul> */}
          <div classname="d-flex">
            <h5>
              <Link to={`/moviesdetails/${movieData.id}`}>
                {movieData.original_title}
              </Link>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};
