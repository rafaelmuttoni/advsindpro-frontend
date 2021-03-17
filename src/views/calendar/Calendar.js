import React, { useEffect, useRef, useState } from "react";

import FullCalendar from "@fullcalendar/react";
import ptbrLocale from "@fullcalendar/core/locales/pt-br";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { useCalendar } from "./CalendarContext";

const Calendar = () => {
  const calendarRef = useRef();
  const { setCalendarApi } = useCalendar();

  const [events, setEvents] = useState([]);

  useEffect(() => {
    setCalendarApi(calendarRef.current.getApi());
  }, []);

  const handleEventClick = (clickInfo) => {
    console.log(clickInfo.event.title);
  };

  const buttonText = {
    today: "Hoje",
    month: "Mês",
    week: "Semana",
    day: "Dia",
    listWeek: "Lista",
    listYear: "Ano",
  };

  return (
    <FullCalendar
      ref={calendarRef}
      locale={ptbrLocale}
      code="pt-br"
      plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
      themeSystem="bootstrap"
      headerToolbar={false}
      initialView="dayGridMonth"
      selectable
      selectMirror
      dayMaxEvents={true}
      eventClick={handleEventClick}
      events={events}
      buttonText={buttonText}
    />
  );
};
export default Calendar;
