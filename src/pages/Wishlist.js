import React, { useEffect, useState } from "react";
import { Layout } from "../components/layout/Layout";
import axios from "axios";
import { useAuth } from "../context/auth";
import { WishlistCard } from "./WishlistCard";

export const Wishlist = () => {
  const [Auth] = useAuth();
  const [wishlist, setWishlist] = useState();
  const Wishlist = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}api/v1/activity/wishlist`,
      {
        headers: {
          authentication1: Auth?.token,
        },
      }
    );
    setWishlist(data);
  };

  useEffect(() => {
    Wishlist();
  }, [0]);
  return (
    <Layout>
      <div className="col-lg-12 col-md-12">
        <div className="anime__details__sidebar">
          <div className="section-title">
            <h5>Your Wishlist</h5>
          </div>
          <div className="row">
            {wishlist?.wishlist?.map((ele) => (
              <WishlistCard movieID={ele.movieID} wishID={ele._id} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};
