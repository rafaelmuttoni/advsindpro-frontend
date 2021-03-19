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
import CalendarView from "src/views/calendar";
import { CalendarProvider } from "src/views/calendar/CalendarContext";
import ResidentsView from "src/views/residents";
import ProvidersView from "src/views/providers";
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
          <CalendarProvider>
            <CalendarView />
          </CalendarProvider>
        </ProtectedRoute>
        <ProtectedRoute path="/residents">
          <ResidentsView />
        </ProtectedRoute>
        <ProtectedRoute path="/providers">
          <ProvidersView />
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
