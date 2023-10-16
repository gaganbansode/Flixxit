import React from "react";
import { Layout } from "../components/layout/Layout";
import { useParams } from "react-router-dom";
import { MoviesList } from "./MoviesList";

export const CategoryWiseList = () => {
  const { id, catname } = useParams();
  return (
    <Layout>
      <section className="product spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <MoviesList catID={id} catName={catname} show={false} />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
