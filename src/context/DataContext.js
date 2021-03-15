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
    if (method === "addClient") {
      const dataCopy = { ...data };
      dataCopy.clients.push(payload);
      setData(dataCopy);
    }

    if (method === "updateClient") {
      const dataCopy = { ...data };
      const clientIndex = data.clients.findIndex((c) => c.id === payload.id);
      dataCopy.clients.splice(clientIndex, 1, payload);
      setData(dataCopy);
    }

    if (method === "addService") {
      const dataCopy = { ...data };
      dataCopy.services.push(payload);
      setData(dataCopy);
    }

    if (method === "updateService") {
      const dataCopy = { ...data };
      const serviceIndex = data.services.findIndex((s) => s.id === payload.id);
      dataCopy.services.splice(serviceIndex, 1, payload);
      setData(dataCopy);
    }

    if (method === "addAppointment") {
      const dataCopy = { ...data };
      dataCopy.appointments.push(payload);
      setData(dataCopy);
    }

    if (method === "updateAppointment") {
      const dataCopy = { ...data };
      const appointmentIndex = data.appointments.findIndex(
        (a) => a.id === payload.id
      );
      dataCopy.appointments.splice(appointmentIndex, 1, payload);
      setData(dataCopy);
    }

    if (method === "addExpense") {
      const dataCopy = { ...data };
      dataCopy.expenses.push(payload);
      setData(dataCopy);
    }

    if (method === "updateExpense") {
      const dataCopy = { ...data };
      const expenseIndex = data.expenses.findIndex((a) => a.id === payload.id);
      dataCopy.expenses.splice(expenseIndex, 1, payload);
      setData(dataCopy);
    }
    if (method === "addEvent") {
      const dataCopy = { ...data };
      dataCopy.events.push(payload);
      setData(dataCopy);
    }
    if (method === "updateEvent") {
      const dataCopy = { ...data };
      const eventIndex = data.events.findIndex((a) => a.id === payload.id);
      dataCopy.events.splice(eventIndex, 1, payload);
      setData(dataCopy);
    }
    if (method === "deleteData") {
      console.log("deleting data");
      console.log(payload);
      const dataCopy = { ...data };
      const dataIndex = data[payload.type].findIndex(
        (d) => d.id === payload.id
      );
      dataCopy[payload.type].splice(dataIndex, 1);
      setData(dataCopy);
    }
  };

  return (
    <DataContext.Provider
      value={{
        data,
        updateData,
        loading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
