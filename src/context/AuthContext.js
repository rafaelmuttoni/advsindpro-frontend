import React, { createContext, useContext, useEffect, useState } from "react";
import * as auth from "src/services/auth";
import api from "src/services/api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const signed = !!user;

  useEffect(() => {
    const loadStorageData = async (token) => {
      setLoading(true);
      try {
        const { data } = await auth.verifyToken(token);
        api.defaults.headers["Authorization"] = `Bearer ${data.token}`;
        localStorage.setItem("userToken", data.refreshToken);
        // set user in state
        const response = await api.get("/users");
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        localStorage.removeItem("userToken");
        return;
      }
    };

    const refreshToken = localStorage.getItem("userToken");
    if (refreshToken) {
      loadStorageData(refreshToken);
    }
  }, []);

  const later = (delay, value) =>
    new Promise((resolve) => setTimeout(resolve, delay, value));

  const login = async (identifier, password) => {
    setLoading(true);
    try {
      const { data } = await auth.login(identifier, password);
      // add token to api requests and to localstorage
      api.defaults.headers["Authorization"] = `Bearer ${data.token}`;
      localStorage.setItem("userToken", data.refreshToken);
      // set user in state
      const response = await api.get("/users");
      setUser(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err);
      return err;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userToken");
    delete api.defaults.headers["Authorization"];
  };

  const register = async (username, email, password) => {
    setLoading(true);
    try {
      await later(1000);
      const { data } = await auth.register(username, email, password);
      // set user in state and add to localstorage
      setUser(data.user);
      // add token to api requests and to localstorage
      api.defaults.headers["Authorization"] = `Bearer ${data.token}`;
      localStorage.setItem("userToken", data.refreshToken);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signed,
        login,
        logout,
        register,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
