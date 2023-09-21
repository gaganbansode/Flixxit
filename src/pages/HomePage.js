import React, { useEffect, useState } from "react";
import { Layout } from "../components/layout/Layout";
import axios from "axios";
import "./Homepage.css";
import { MoviesList } from "./MoviesList";
axios.defaults.headers.common[
  "Authorization"
] = `${process.env.REACT_APP_TMDB}`;
export const HomePage = () => {
  const [first, setfirst] = useState([]);
  const [CategoriesList, SetCategoriesList] = useState([]);
  const herosection = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day`,
      {
        language: "en-US",
      }
    );

    setfirst(data?.results[Math.floor(Math.random() * data?.results.length)]);
  };

  const moviesCatgoriesList = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?language=en`,
      {
        include_adult: "false",
        include_video: "false",
        language: "en-US",
        page: "1",
        sort_by: "popularity.desc",
      }
    );
    SetCategoriesList(data?.genres);
  };
  useEffect(() => {
    herosection();
    moviesCatgoriesList();
  }, [0]);

  return (
    <Layout>
      <div className="row">
        <div
          className="herosection"
          style={{
            backgroundImage: `url(${
              process.env.REACT_APP_IMG_URL + first?.poster_path
            })`,
          }}
        >
          <div className="row">
            <div className="col-sm-6">
              <h1
                className="slider-text big-title title text-uppercase"
                data-iq-gsap="onStart"
                data-iq-position-x={-150}
                data-iq-position-y={0}
                data-iq-duration={1}
                data-iq-delay=".4"
                style={{ transform: "translate(0px, 0px)", opacity: 1 }}
              >
                Pirates of Sea
              </h1>
            </div>
            <div className="col-sm-6">123</div>
          </div>
        </div>
        {CategoriesList?.map((ele) => (
          <MoviesList catID={ele.id} catName={ele.name} />
        ))}
      </div>
    </Layout>
  );
};
