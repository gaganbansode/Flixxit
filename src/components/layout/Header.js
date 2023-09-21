import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg  ">
      <div className="container-fluid">
        <Link className="navbar-brand" href="#">
          <img
            className="logo"
            src={`https://www.edigitalagency.com.au/wp-content/uploads/Netflix-logo-red-black-png.png`}
          />
        </Link>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
            <li className="nav-item">
              <Link
                className="nav-link active text-white"
                aria-current="page"
                href="#"
              >
                Home
              </Link>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>

        <div className="dropdown mx-4">
          <button
            className="btn text-white dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Login
          </button>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="#">
                Action
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Another action
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Something else here
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
