import React, { useState, useEffect, useContext, createContext } from "react";
import api from "src/services/api";
import { useAlert } from "./AlertContext";
import { useAuth } from "./AuthContext";

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);

  return context;
};

export const DataProvider = ({ children }) => {
  const { user, loading } = useAuth();
  const { alert } = useAlert();

  const [data, setData] = useState(null);
  const [condo, setCondo] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get("condos");
        setData(data);
      } catch (err) {
        alert("Ocorreu um erro na sua requisição", "error");
      }
    };

    user && fetchData();
  }, [user]);

  const updateData = (method, payload) => {
    if (method === "addCondo") {
      const dataCopy = { ...data };
      dataCopy.condos?.push(payload);
      setData(dataCopy);
    }
  };

  return (
    <DataContext.Provider
      value={{
        condo,
        data,
        updateData,

        loading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
