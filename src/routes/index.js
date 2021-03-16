import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import OpenRoute from "./OpenRoute";

import LoginView from "src/views/auth/LoginView";

import ProductListView from "src/views/product/ProductListView";
import CustomerListView from "src/views/customer/CustomerListView";
import SettingsView from "src/views/settings/SettingsView";

import NotFoundView from "src/views/errors/NotFoundView";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <OpenRoute path="/login">
          <LoginView />
        </OpenRoute>

        <ProtectedRoute exact path="/">
          <ProductListView />
        </ProtectedRoute>
        <ProtectedRoute path="/calendar">
          <CustomerListView />
        </ProtectedRoute>
        <ProtectedRoute path="/residents">
          <CustomerListView />
        </ProtectedRoute>
        <ProtectedRoute path="/settings">
          <SettingsView />
        </ProtectedRoute>

        <Route path="*">
          <NotFoundView />
        </Route>
      </Switch>
    </Router>
  );
}
