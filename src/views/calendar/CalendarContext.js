import React, { useState, useEffect, useContext, createContext } from "react";

import EventDialog from "./EventDialog";

const CalendarContext = createContext();

export const useCalendar = () => {
  const context = useContext(CalendarContext);

  return context;
};

export const CalendarProvider = ({ children }) => {
  const [calendarApi, setCalendarApi] = useState({});
  const [dialogContent, setDialogContent] = useState(false);

  return (
    <CalendarContext.Provider
      value={{
        calendarApi,
        setCalendarApi,
        setDialogContent,
      }}
    >
      {children}
      <EventDialog
        content={dialogContent}
        close={() => setDialogContent(false)}
      />
    </CalendarContext.Provider>
  );
};
