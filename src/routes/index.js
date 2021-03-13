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

import DashboardView from "src/views/reports/DashboardView";
import ProductListView from "src/views/product/ProductListView";
import CustomerListView from "src/views/customer/CustomerListView";
import AccountView from "src/views/account/AccountView";
import SettingsView from "src/views/settings/SettingsView";

import NotFoundView from "src/views/errors/NotFoundView";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>

        <OpenRoute path="/login">
          <LoginView />
        </OpenRoute>

        <ProtectedRoute path="/dashboard">
          <DashboardView />
        </ProtectedRoute>
        <ProtectedRoute path="/products">
          <ProductListView />
        </ProtectedRoute>
        <ProtectedRoute path="/customers">
          <CustomerListView />
        </ProtectedRoute>

        <ProtectedRoute path="/account">
          <AccountView />
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
