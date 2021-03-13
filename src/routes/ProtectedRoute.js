import React from "react";
import { Route, Redirect } from "react-router-dom";

import DashboardLayout from "src/layouts/DashboardLayout";
// import { useAuth } from 'src/context/AuthContext';

const ProtectedRoute = ({ children, ...rest }) => {
  // const { signed } = useAuth();

  const signed = true;

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return signed ? (
          <DashboardLayout>{children}</DashboardLayout>
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default ProtectedRoute;
