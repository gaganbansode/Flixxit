import React from "react";
import { Typography, Box, Stack } from "@mui/material";
import { Layout } from "../components/layout/Layout";

export const About = () => {
  return (
    <Layout>
      <Stack
        alignItems="center"
        justifyContent="center" // Center horizontally and vertically
        direction={{ xs: "column", md: "row " }}
        sx={{ height: "max-content" }}
      >
        <img src={window.location.origin + "/img/logo.png"} alt="" />
      </Stack>
      <Box sx={{ textAlign: "justify", lineHeight: 1.6, color: "white" }}>
        Flixxit is an OTT platform for watching movies and TV shows. It provides
        a wide range of content for users to browse, search, and enjoy their
        favorite movies and TV series.
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" color="#c52524">
          Features
        </Typography>
        <ul>
          <li>
            <Typography color="#ffffff">
              A home page with a carousel of featured movies and TV shows
            </Typography>
          </li>
          <li>
            <Typography color="#ffffff">
              A search bar for finding content
            </Typography>
          </li>
          <li>
            <Typography color="#ffffff">
              A grid of genres for browsing content
            </Typography>
          </li>
          <li>
            <Typography color="#ffffff">
              Detail pages for individual movies and TV shows
            </Typography>
          </li>
          <li>
            <Typography color="#ffffff">
              The ability to watch trailers
            </Typography>
          </li>
          <li>
            <Typography color="#ffffff">
              The ability to add movies and TV shows to reviews and favorites
            </Typography>
          </li>
        </ul>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" color="#c52524">
          Contributing
        </Typography>
        <Typography color="#ffffff">
          The Flixxit project is open to contributions. If you would like to
          contribute, please fork the project on GitHub and submit a pull
          request.
        </Typography>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" color="#c52524">
          Thank you for visiting!
        </Typography>
        <Typography color="#ffffff">
          We hope you enjoy using Flixxit for your movie and TV show
          entertainment. If you have any questions or suggestions, please feel
          free to contact us.
        </Typography>
      </Box>
    </Layout>
  );
};
