import React from "react";
import { useParams } from "react-router-dom";
import { Layout } from "../components/layout/Layout";

export const MoviesDetails = () => {
  const { id } = useParams();
  return <Layout>{id}</Layout>;
};
