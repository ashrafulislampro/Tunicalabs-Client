import React from "react";
import { Redirect, Route } from "react-router";
import { RingLoader } from "react-spinners";
import useAuth from "../../Pages/Hooks/useAuth";

const PrivateRoute = ({ children, ...rest }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="spinner-box" style={{ minHeight: "100vh" }}>
        <RingLoader color="#fc5b62" />
      </div>
    );
  } //initial loading before getting user information

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user?.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/form/signin",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
