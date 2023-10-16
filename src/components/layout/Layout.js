import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

export const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div className="container-fluid">
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh" }}>
        <Toaster position="top-center" reverseOrder={false} />
        {children}
      </main>{" "}
      <Footer />
    </div>
  );
};
Layout.defaultProps = {
  title: "NetFlix",
  description: "mern stack project",
  keywords: "mern,react,node,mongodb",
  author: "Gagan",
};
