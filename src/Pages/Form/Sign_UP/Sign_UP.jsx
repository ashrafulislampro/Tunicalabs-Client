import React from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";


const Sign_UP = () => {
  console.log(useAuth())
  const {createNewAccount} = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const userEmail = data.email;
    const userPassword = data.password;
    const userName = data.name;
    console.log(data);
    createNewAccount(userEmail, userPassword, userName)
    reset();
  };

  return (
    <div className="signup-container">
      <div className="form-signin" data-aos="fade-up">
      <h2 className="text-center mb-5">Sign Up Now</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formGroupName">
         
          <Form.Control
            type="text"
            placeholder="Enter name"
            className="form-input"
            {...register("name", { required: true })}
          />
          {errors.name?.type === "required" && (
            <small className="required-text">Name is required</small>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupEmail">
         
          <Form.Control
            type="email"
            placeholder="Enter email"
            className="form-input my-2"
            {...register("email", {
              required: true,
              pattern:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
          />
          {errors.email?.type === "required" && (
            <small className="required-text">Email is required</small>
          )}
          {errors.email?.type === "pattern" && (
            <small className="required-text">Invalid Email</small>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupPassword">
          
          <Form.Control
            type="password"
            placeholder="Password"
            className="form-input"
            {...register("password", {
              required: true,
              pattern:
                /^(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/,
            })}
          />
          {errors.password?.type === "required" && (
            <small className="required-text">Password is required</small>
          )}
          {errors.password?.type === "pattern" && (
            <small className="required-text">
              Your password must contain 8 characters including at least 1
              special character,1 uppercase & 1 digit..
            </small>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formHorizontalCheck">
          <Form.Check
            className="form-label"
            label="I agree to the Terms and Privacy Policy."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formHorizontalCheck">
          <button type="submit" className="w-100 btn-custom">
            Sign Up
          </button>
        </Form.Group>
      </Form>

      <small className="text-center d-block">
        Already have an account?{" "}
        <Link to="/form/signIn" className="switch-link">
          Sign In
        </Link>
      </small>
      </div>
    </div>
  );
};

export default Sign_UP;
