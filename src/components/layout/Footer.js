import React from "react";
import { Link } from "react-router-dom";
export const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="page-up">
          <Link href="#" id="scrollToTopButton">
            <span className="arrow_carrot-up" />
          </Link>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="footer__logo">
                <Link href="index-2.html">
                  <img src={window.location.origin + "/img/logo.png"} alt />
                </Link>
              </div>
            </div>
            <div className="col-lg-6"></div>
            <div className="col-lg-3">
              <p>
                Copyright © Gagan Bansode&nbsp;
                <i className="fa fa-heart" aria-hidden="true" /> Developed And
                Designed By &nbsp;
                <Link to="https://github.com/gaganbansode" target="_blank">
                  Gagan
                </Link>
              </p>
            </div>
          </div>
        </div>
      </footer>
      <div className="search-model">
        <div className="h-100 d-flex align-items-center justify-content-center">
          <div className="search-close-switch">
            <i className="icon_close" />
          </div>
          <form className="search-model-form">
            <input
              type="text"
              id="search-input"
              placeholder="Search here....."
            />
          </form>
        </div>
      </div>
    </>
  );
};
