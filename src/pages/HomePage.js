import React, { useEffect, useState } from "react";
import { Layout } from "../components/layout/Layout";
import axios from "axios";
import { Link } from "react-router-dom";
import { MoviesList } from "./MoviesList";
import "./Homepage.css";
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

    setfirst(data?.results);
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
      <section className="hero">
        <div className="container">
          <div className="hero__slider owl-carousel owl-loaded">
            <div className="owl-stage-outer">
              <div
                className="owl-stage"
                style={{
                  transform: "translate3d(-3420px, 0px, 0px)",
                  transition: "all 0s ease 0s",
                  width: 7980,
                }}
              >
                {first.splice(0, 4)?.map((ele) => (
                  <div className="owl-item cloned" style={{ width: 1140 }}>
                    <div
                      className="hero__items set-bg"
                      data-setbg="img/hero/hero-1.jpg"
                      style={{
                        backgroundImage: `url(${process.env.REACT_APP_IMG_URL}${ele?.backdrop_path})`,
                      }}
                    >
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="hero__text">
                            <div className="label">Adventure</div>
                            <h2>{ele?.original_name}</h2>
                            <p>{ele?.overview}</p>
                            <Link to={`/moviesdetails/${ele.id}`}>
                              <span>Watch Now</span>
                              <i className="fa fa-angle-right" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="product spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {CategoriesList?.map((ele) => (
                <>
                  <MoviesList catID={ele.id} catName={ele.name} />
                </>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
