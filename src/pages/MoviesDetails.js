import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import axios from "axios";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";
import { format } from "timeago.js";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Modal } from "antd";
import Avatar from "@mui/material/Avatar";
export const MoviesDetails = () => {
  const navigate = useNavigate();
  const [Auth] = useAuth();
  const { id } = useParams();
  const [moviesDetails, setMoviesDetails] = useState([]);
  const [movieList, setmovieList] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const [comment, setComment] = useState([]);
  const [commentID, setcommentID] = useState();
  const [checkwishlist, setcheckWishlist] = useState();

  const [subscription, setsubscription] = useState();
  const [video, setVideo] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
    movieVideo();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchMoviesDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}`,
        {
          headers: {
            Authorization: process.env.REACT_APP_TMDB,
          },
        }
      );
      setMoviesDetails(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMovieList = async (arg) => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${arg}/similar`,
        {
          headers: {
            Authorization: process.env.REACT_APP_TMDB,
          },
        }
      );
      setmovieList(data?.results);
    } catch (error) {
      console.log(error);
    }
  };

  const checkWishlist = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}api/v1/activity/wishlist/${id}`,
        {
          //example with bearer token
          headers: {
            authentication1: Auth?.token,
          },
        }
      );
      setcheckWishlist(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCommentList = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}api/v1/activity/comment/${id}`
      );
      setCommentList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTextArea = (e) => {
    setComment(e.target.value);
  };
  const handleReview = async () => {
    if (!comment) {
      toast.success("Please Enter Something");
      return;
    }
    try {
      if (commentID) {
        const { data } = await axios.put(
          `${process.env.REACT_APP_API_URL}api/v1/activity/comment/${commentID}`,
          {
            movieID: id,
            comment: comment,
          },
          {
            //example with bearer token
            headers: {
              authentication1: Auth?.token,
            },
          }
        );
        toast.success(data?.message);
      } else {
        const { data } = await axios.post(
          `${process.env.REACT_APP_API_URL}api/v1/activity/comment`,
          {
            movieID: id,
            comment: comment,
          },
          {
            //example with bearer token
            headers: {
              authentication1: Auth?.token,
            },
          }
        );
        toast.success(data?.message);
      }

      fetchCommentList();
      setComment("");
      setcommentID("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = () => {
    navigate("/login", {
      state: `/moviesdetails/${id}`,
    });
  };
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API_URL}api/v1/activity/comment/${id}`,
        {
          headers: {
            authentication1: Auth?.token,
          },
        }
      );
      fetchCommentList();
      toast.success(data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id, comment) => {
    setcommentID(id);
    setComment(comment);
  };

  const handleWishlist = async () => {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}api/v1/activity/wishlist`,
      {
        movieID: id,
      },
      {
        //example with bearer token
        headers: {
          authentication1: Auth?.token,
        },
      }
    );
    toast.success(data?.message);
    checkWishlist();
  };

  const handleRemoveWishlist = async (arg) => {
    const { data } = await axios.delete(
      `${process.env.REACT_APP_API_URL}api/v1/activity/wishlist/${arg}`,
      {
        //example with bearer token
        headers: {
          authentication1: Auth?.token,
        },
      }
    );
    toast.success(data?.message);
    checkWishlist();
  };

  const checkSubscription = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}api/v1/activity/checkSubscription`,
        {
          //example with bearer token
          headers: {
            authentication1: Auth?.token,
          },
        }
      );

      setsubscription(data);
    } catch (error) {
      console.log(error);
    }
  };

  const movieVideo = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
        {
          headers: {
            Authorization: process.env.REACT_APP_TMDB,
          },
        }
      );
      setVideo(data?.results[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMoviesDetails();
    fetchCommentList();
    fetchMovieList(id);
    checkWishlist();
    checkSubscription();
  }, [0]);
  return (
    <Layout>
      <section className="anime-details spad">
        <div className="container">
          <div className="anime__details__content">
            <div className="row">
              <div className="col-lg-3">
                <div
                  className="anime__details__pic set-bg"
                  style={{
                    backgroundImage: `url(${process.env.REACT_APP_IMG_URL}${moviesDetails?.poster_path})`,
                  }}
                ></div>
              </div>
              <div className="col-lg-9">
                <div className="anime__details__text">
                  <div className="anime__details__title">
                    <h3>{moviesDetails?.original_title}</h3>
                    <span></span>
                  </div>

                  <p>{moviesDetails?.overview}</p>
                  <div className="anime__details__widget">
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <ul>
                          <li>
                            <span>Type:</span> Movie
                          </li>
                          <li>
                            <span>Studios:</span> Lerche
                          </li>
                          <li>
                            <span>Date aired:</span>
                            {moviesDetails?.release_date}
                          </li>
                          <li>
                            <span>Status:</span> {moviesDetails?.status}
                          </li>
                          <li>
                            <span>Genre:</span>
                            {moviesDetails?.genres?.map((ele) => (
                              <Link
                                to={`/category/${ele.id}/${ele.name}`}
                                style={{ color: "white" }}
                              >
                                {ele.name} &nbsp;
                              </Link>
                            ))}
                          </li>
                        </ul>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <ul>
                          <li>
                            <span>Popularity:</span> {moviesDetails?.popularity}
                            / 100
                          </li>
                          <li>
                            <span>IMDB Rating:</span>
                            {moviesDetails?.vote_average} / 10
                          </li>
                          <li>
                            <span>Duration:</span> {moviesDetails?.runtime}
                            min
                          </li>
                          <li>
                            <span>Quality:</span> HD
                          </li>
                          <li>
                            <span>Collection:</span>$ {moviesDetails?.revenue}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="anime__details__btn">
                    {Auth?.token ? (
                      <>
                        {checkwishlist?.success ? (
                          <button
                            type="button"
                            className="follow-btn"
                            onClick={() => {
                              if (window.confirm("Are you sure?")) {
                                handleRemoveWishlist(
                                  checkwishlist?.wishlist?._id
                                );
                              }
                            }}
                          >
                            <i className="fa fa-heart" />
                            Remove From Wishlist
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="follow-btn"
                            onClick={handleWishlist}
                          >
                            <i className="fa fa-heart-o" /> Wishlist
                          </button>
                        )}
                        {subscription?.success ? (
                          <Link className="watch-btn" onClick={showModal}>
                            <span>Watch Now</span>
                            <i className="fa fa-angle-right" />
                          </Link>
                        ) : (
                          <Link className="watch-btn" to="/subscription">
                            <span>Subscribe</span>
                          </Link>
                        )}
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          className="follow-btn"
                          onClick={handleLogin}
                        >
                          <i className="fa fa-heart-o" /> Wishlist
                        </button>
                        <button
                          type="button"
                          className="watch-btn"
                          onClick={handleLogin}
                        >
                          <span>Watch Now</span>
                          <i className="fa fa-angle-right" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 col-md-8">
              <div className="anime__details__review">
                <div className="section-title">
                  <h5>Reviews</h5>
                </div>

                {commentList?.comments?.map((ele, index) => (
                  <div className="anime__review__item" key={index}>
                    <div className="anime__review__item__pic">
                      <Avatar
                        alt={`${ele?.userID?.name}`}
                        src="/static/images/avatar/2.jpg"
                      />
                    </div>
                    <div className="anime__review__item__text">
                      <div
                        className="d-flex"
                        style={{ justifyContent: "space-between" }}
                      >
                        <h6>
                          {ele?.userID?.name} -
                          <span>{format(ele?.createdAt)}</span>
                        </h6>
                        &nbsp;&nbsp;&nbsp;
                        {ele?.userID?.email == Auth?.user?.email ? (
                          <div>
                            <FaEdit
                              onClick={() => {
                                handleEdit(ele?._id, ele?.comment);
                              }}
                              style={{
                                color: "green",
                                fontSize: "24px",
                                cursor: "pointer",
                              }}
                            />
                            <RiDeleteBin5Line
                              style={{
                                color: "red",
                                fontSize: "24px",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Are you sure your want to delete?"
                                  )
                                ) {
                                  handleDelete(ele?._id);
                                }
                              }}
                            />
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <p>{ele?.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="anime__details__form">
                <div className="section-title">
                  <h5>Your Comment</h5>
                </div>
                <form action="#">
                  <textarea
                    placeholder="Your Comment"
                    value={comment}
                    onChange={handleTextArea}
                  />
                  {Auth?.token ? (
                    <>
                      <button type="button" onClick={handleReview}>
                        <i className="fa fa-location-arrow" /> Review
                      </button>
                    </>
                  ) : (
                    <>
                      <button type="button" onClick={handleLogin}>
                        <i className="fa fa-location-arrow" /> Review
                      </button>
                    </>
                  )}
                </form>
              </div>
            </div>

            <div className="col-lg-4 col-md-4">
              <div className="anime__details__sidebar">
                <div className="section-title">
                  <h5>you might like...</h5>
                </div>

                {movieList?.splice(0, 10).map((element) => (
                  <div
                    className="product__sidebar__view__item set-bg"
                    style={{
                      backgroundImage: `url(${process.env.REACT_APP_IMG_URL}${element?.backdrop_path})`,
                    }}
                  >
                    <div className="ep">{element.vote_average}/10</div>

                    <h5>
                      <Link to={`/moviesdetails/${element.id}`}>
                        {element.original_title}
                      </Link>
                    </h5>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Modal
          title={moviesDetails?.original_title}
          open={isModalOpen}
          onCancel={handleCancel}
          confirmLoading={false}
          style={{ height: "50vh" }}
        >
          {/* <Iframe
            url='https://www.themoviedb.org/video/play?key="++"'
            position="relative"
            height="100%"
            width="100%"
          /> */}

          <iframe
            width="100%"
            height="315"
            src={`https://www.youtube.com/embed/${video}`}
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </Modal>
      </section>
    </Layout>
  );
};
