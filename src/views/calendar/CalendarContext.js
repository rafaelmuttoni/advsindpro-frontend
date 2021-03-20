import React, { useState, useContext, createContext } from "react";

import EventDialog from "./EventDialog";
import EventModal from "./EventModal";
import ServiceModal from "./ServiceModal";

const CalendarContext = createContext();

export const useCalendar = () => {
  const context = useContext(CalendarContext);

  return context;
};

export const CalendarProvider = ({ children }) => {
  const [calendarApi, setCalendarApi] = useState({});
  const [dialogContent, setDialogContent] = useState(false);

  const [creatingEvent, setCreatingEvent] = useState(false);

  return (
    <CalendarContext.Provider
      value={{
        calendarApi,
        setCalendarApi,
        setDialogContent,
        setCreatingEvent,
      }}
    >
      {children}
      <EventDialog
        content={dialogContent}
        close={() => setDialogContent(false)}
      />
      <EventModal
        creatingEvent={creatingEvent}
        close={() => setCreatingEvent(false)}
      />
      <ServiceModal
        creatingEvent={creatingEvent}
        close={() => setCreatingEvent(false)}
      />
    </CalendarContext.Provider>
  );
};
