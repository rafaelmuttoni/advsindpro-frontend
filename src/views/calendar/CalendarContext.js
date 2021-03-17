import React, { useState, useEffect, useContext, createContext } from "react";

import { useData } from "src/context/DataContext";

const CalendarContext = createContext();

export const useCalendar = () => {
  const context = useContext(CalendarContext);

  return context;
};

export const CalendarProvider = ({ children }) => {
  // const { data } = useData();

  const [events, setEvents] = useState([]);

  // useEffect(() => {
  //   setEvents({ events: [] });
  // }, [data]);

  return (
    <CalendarContext.Provider
      value={{
        events,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
