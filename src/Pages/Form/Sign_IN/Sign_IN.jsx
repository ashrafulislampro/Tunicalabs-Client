import React from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router";
import { Link, useHistory } from "react-router-dom";
import logo from "../../../images/images (2).png";
import useAuth from "../../Hooks/useAuth";
import popupError from "../../Popup/popupError";
import popupSuccess from "../../Popup/popupSuccess";


const Sign_IN = () => {
  const {
      signInWithEmail,
      signInWithSocial,
       googleProvider,
    } = useAuth();

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

    const history = useHistory();
    const location = useLocation();
    const redirectUrl = location.state?.from || "/home";

  const onSubmit = (data) => {
    const userEmail = data.email;
    const userPassword = data.password;
    console.log(userEmail, userPassword);
    signInWithEmail(userEmail, userPassword)
      .then((result) => {
        console.log(result)
        const isAdmin = "admin123@gmail.com";
        if (result._tokenResponse.email === isAdmin) {
          popupSuccess("admin");
        } else {
          popupSuccess("login");
        }
        reset();
        history.push(redirectUrl);
      })
      .catch((err) => {
        console.log(err)
        popupError(err.message);
      });
  };

    const handleSignInWithSocial = (provider) => {
  signInWithSocial(provider)
    .then((res) => {
      popupSuccess("login");
      history.push(redirectUrl);
    })
    .catch((err) => popupError(err.message));
    };


    

  return (
    <div className="signin-container">
      <div className="form-signin" data-aos="fade-down">
        <h2 className="text-center mb-5">Sign In Now</h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Control
              type="email"
              placeholder="Enter email"
              className="form-input"
              {...register("email", { required: true })}
            />
            {errors.email?.type === "required" && (
              <small className="required-text">Email is required</small>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              className="form-input"
              {...register("password", { required: true })}
            />
            {errors.password?.type === "required" && (
              <small className="required-text">Password is required</small>
            )}
          </Form.Group>
          <div className="mb-3 d-flex justify-content-between align-items-center">
            <Form.Check className="form-label" label="Remember me?" />
          </div>
          <Form.Group className="mb-3" controlId="formHorizontalCheck">
            <button className="w-100 btn-custom" type="submit">
              Sign In
            </button>
          </Form.Group>
        </Form>
        <small className="text-center d-block text-more-option">
          Or with Social Profile
        </small>
        <div onClick={() => handleSignInWithSocial(googleProvider)} className="social-btn-box my-3 d-flex justify-content-center align-items-center">
          <button
          className="btn-social"
          
        >
          <img className="google_logo" src={logo} alt="" />
        </button>
        </div>

        <small className="text-center d-block">
          Dont have an account?
          <Link to="/form/signup" className="switch-link ms-1">
            Sign Up
          </Link>
        </small>
      </div>
    </div>
  );
};

export default Sign_IN;
