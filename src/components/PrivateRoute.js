import React from "react";
import { Redirect, Route } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => {
        if (window.localStorage.getItem("token")) {
          return <Component  />;
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );
}

export default PrivateRoute;









//Task List:
//1. Build a PrivateRoute component that redirects if user is not logged in