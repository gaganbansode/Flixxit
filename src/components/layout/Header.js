import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
// import { Button, Dropdown } from "antd";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Fade from "@mui/material/Fade";
axios.defaults.headers.common[
  "Authorization"
] = `${process.env.REACT_APP_TMDB}`;
// const pages = ["Products", "Pricing", "Blog"];
// const settings = ["Profile", "Account", "Dashboard", "Logout"];
export const Header = () => {
  const [auth, setAuth] = useAuth();
  const [CategoriesList, SetCategoriesList] = useState([]);
  const moviesCatgoriesList = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?language=en`
    );
    SetCategoriesList(data?.genres);
  };

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: null,
    });
    localStorage.removeItem("auth");
  };
  useEffect(() => {
    moviesCatgoriesList();
  }, [0]);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#1976d2",
      },
      backgroundColor: "red",
    },
  });

  const styles = {
    color: "white",
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              to="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "white",
                textDecoration: "none",
              }}
            >
              <img src={window.location.origin + "/img/logo.png"} alt="" />
            </Typography>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                color: "white",
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                color="white"
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <NavLink to="/">
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    Homepage
                  </Button>
                </NavLink>

                <Button
                  id="fade-button"
                  aria-controls={open ? "fade-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Categories
                </Button>
                <Menu
                  id="fade-menu"
                  MenuListProps={{
                    "aria-labelledby": "fade-button",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  TransitionComponent={Fade}
                  sx={{ styles, display: "block" }}
                >
                  {CategoriesList?.map((ele, index) => (
                    <NavLink to={`/category/${ele.id}/${ele.name}`}>
                      <MenuItem onClick={handleClose}>{ele.name}</MenuItem>
                    </NavLink>
                  ))}
                </Menu>

                {auth?.token ? (
                  <NavLink to="/subscription">
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      Subscription Plan's
                    </Button>
                  </NavLink>
                ) : (
                  ""
                )}

                <NavLink to="/about">
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    About Us
                  </Button>
                </NavLink>

                {/* <NavLink to="/contact">
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    Contacts
                  </Button>
                </NavLink> */}

                {auth?.token ? (
                  <></>
                ) : (
                  <>
                    <NavLink to="/signup">
                      <Button
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: "white", display: "block" }}
                      >
                        Sign Up
                      </Button>
                    </NavLink>
                    <NavLink to="/login">
                      <Button
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: "white", display: "block" }}
                      >
                        Login
                      </Button>
                    </NavLink>
                  </>
                )}
              </Menu>
            </Box>

            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "white",
                textDecoration: "none",
              }}
            >
              <img src={window.location.origin + "/img/logo.png"} alt="" />
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
              }}
            >
              <NavLink to="/">
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Homepage
                </Button>
              </NavLink>

              <Button
                id="fade-button"
                aria-controls={open ? "fade-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Categories
              </Button>
              <Menu
                id="fade-menu"
                MenuListProps={{
                  "aria-labelledby": "fade-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
                sx={{ styles, display: "block" }}
              >
                {CategoriesList?.map((ele, index) => (
                  <NavLink to={`/category/${ele.id}/${ele.name}`}>
                    <MenuItem onClick={handleClose}>{ele.name}</MenuItem>
                  </NavLink>
                ))}
              </Menu>

              {auth?.token ? (
                <NavLink to="/subscription">
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    Subscription Plan's
                  </Button>
                </NavLink>
              ) : (
                ""
              )}

              <NavLink to="/about">
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  About Us
                </Button>
              </NavLink>

              {/* <NavLink to="/contact">
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Contacts
                </Button>
              </NavLink> */}

              {auth?.token ? (
                <></>
              ) : (
                <>
                  <NavLink to="/signup">
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      Sign Up
                    </Button>
                  </NavLink>
                  <NavLink to="/login">
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      Login
                    </Button>
                  </NavLink>
                </>
              )}
            </Box>

            {auth?.token ? (
              <>
                <Box sx={{ flexGrow: 0, color: "white" }} color="white">
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt={`${auth?.user?.name}`}
                        src="/static/images/avatar/2.jpg"
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <Link to="/profile">
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center" color="white">
                          Profile
                        </Typography>
                      </MenuItem>
                    </Link>

                    <Link to="/wishlist">
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center" color="white">
                          Wishlist
                        </Typography>
                      </MenuItem>
                    </Link>

                    {/* <Link to="/profile">
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center" color="white">
                          Profile
                        </Typography>
                      </MenuItem>
                    </Link> */}

                    <Link to="/" onClick={handleLogout}>
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center" color="white">
                          Logout
                        </Typography>
                      </MenuItem>
                    </Link>
                  </Menu>
                </Box>
              </>
            ) : (
              <></>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};
