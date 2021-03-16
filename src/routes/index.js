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

import HomeView from "src/views/home";
import ResidentsView from "src/views/residents";
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
          <HomeView />
        </ProtectedRoute>
        <ProtectedRoute path="/calendar">
          <ResidentsView />
        </ProtectedRoute>
        <ProtectedRoute path="/residents">
          <ResidentsView />
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
