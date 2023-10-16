import React, { useState } from "react";
import * as EmailValidator from "email-validator";
import { Layout } from "../components/layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../context/auth";
export const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [formData, setFormData] = useState({
    name: auth?.user?.name,
    email: auth?.user?.email,
    password: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSignUpSubmit = async () => {
    try {
      if (EmailValidator.validate(formData.email) && formData.name) {
        const { data } = await axios.put(
          `${process.env.REACT_APP_API_URL}api/v1/auth/profile`,
          {
            name: formData.name,
            password: formData.password,
          },
          {
            headers: {
              authentication1: auth?.token,
            },
          }
        );
        if (data.success) {
          setAuth({
            ...auth,
            user: data?.updatedUser,
          });

          toast.success(data.message);
        } else {
          toast.error(data.message);
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
      <section className="signup spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 d-flex align-items-center justify-content-center">
              <div className="login__form ">
                <h3>Profile </h3>

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
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
