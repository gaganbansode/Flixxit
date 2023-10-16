import React, { useState } from "react";
import * as EmailValidator from "email-validator";
import { Layout } from "../components/layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/auth";

export const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [formDataLogin, setFormDataLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleChange2 = (event) => {
    const { name, value } = event.target;
    setFormDataLogin((setFormDataLogin) => ({
      ...setFormDataLogin,
      [name]: value,
    }));
  };
  const handleSignUpSubmit = async () => {
    try {
      if (
        EmailValidator.validate(formData.email) &&
        formData.name &&
        formData.password
      ) {
        const { data } = await axios.post(
          `${process.env.REACT_APP_API_URL}api/v1/auth/register`,
          {
            email: formData.email,
            name: formData.name,
            password: formData.password,
          }
        );
        if (data.success) {
          toast.success(data.message);
          setFormData({
            name: "",
            email: "",
            password: "",
          });
        } else {
          toast.error(data.message);
          setFormData({
            name: "",
            email: "",
            password: "",
          });
        }
      } else {
        toast.error("Please check all inputs");
      }
    } catch (error) {
      toast.error(`Something went wrong`);
    }
  };

  const handleLogin = async () => {
    try {
      console.log(formDataLogin);
      if (
        EmailValidator.validate(formDataLogin.email) &&
        formDataLogin.password
      ) {
        const { data } = await axios.post(
          `${process.env.REACT_APP_API_URL}api/v1/auth/login`,
          {
            email: formDataLogin.email,
            password: formDataLogin.password,
          }
        );
        if (data.success) {
          toast.success(data.message);
          setFormDataLogin({
            email: "",
            password: "",
          });

          setAuth({
            ...auth,
            user: data.user,
            token: data.token,
          });
          localStorage.setItem("auth", JSON.stringify(data));
          navigate(location.state || "/");
        } else {
          toast.error(data.message);
          setFormDataLogin({
            email: "",
            password: "",
          });
        }
      } else {
        toast.error("Please check all inputs");
      }
    } catch (error) {
      toast.error(`Something went wrong`);
    }
  };
  return (
    <Layout>
      <div>
        <section className="signup spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="login__form">
                  <h3>Sign Up</h3>
                  <form action="#">
                    <div className="input__item">
                      <input
                        type="email"
                        placeholder="Email address"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      <span className="icon_mail" />
                    </div>
                    <div className="input__item">
                      <input
                        type="text"
                        placeholder="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                      <span className="icon_profile" />
                    </div>
                    <div className="input__item">
                      <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      <span className="icon_lock" />
                    </div>
                    <button
                      type="button"
                      className="site-btn"
                      onClick={handleSignUpSubmit}
                    >
                      Sign Up
                    </button>
                  </form>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="login__form" style={{ border: "0px" }}>
                  <h3>Login</h3>
                  <form action="#">
                    <div className="input__item">
                      <input
                        type="email"
                        placeholder="Email address"
                        name="email"
                        onChange={handleChange2}
                      />
                      <span className="icon_mail" />
                    </div>
                    <div className="input__item">
                      <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={handleChange2}
                      />
                      <span className="icon_lock" />
                    </div>
                    <button
                      type="button"
                      className="site-btn"
                      onClick={handleLogin}
                    >
                      Login Now
                    </button>
                  </form>
                  <Link to="" className="forget_pass">
                    Forgot Your Password?
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};
