import React, { useEffect, useRef, useState } from "react";

import FullCalendar from "@fullcalendar/react";
import ptbrLocale from "@fullcalendar/core/locales/pt-br";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";

import { useData } from "src/context/DataContext";
import { useCalendar } from "./CalendarContext";
import { calculateNextBirthdays } from "src/utils/helpers";

const Calendar = () => {
  const calendarRef = useRef();
  const { setCalendarApi } = useCalendar();
  const { data } = useData();

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

  const views = {
    week: {
      eventLimit: 3,
    },
  };

  const eventTimeFormat = {
    hour: "numeric",
    minute: "2-digit",
    omitZeroMinute: true,
    meridiem: true,
  };

  const parseForCalendar = (data) => {
    const { condos, events, debts } = data;

    // const parsedAppointments = appointments.map(e => ({
    //   id: `appointments - ${e.id}`,
    //   title: e.name,
    //   start: moment(e.date).format('YYYY-MM-DD HH:mm'),
    //   end: moment(e.date)
    //     .add(e.duration, 'm')
    //     .format('YYYY-MM-DD HH:mm'),
    //   description: e.description,
    //   className: ['bg-soft-primary']
    // }));

    // const parsedExpenses = expenses.map(e => ({
    //   id: `expenses - ${e.id}`,
    //   title: e.name,
    //   start: moment(e.date).format('YYYY-MM-DD'),
    //   description: e.description,
    //   className: ['bg-soft-danger']
    // }));

    const birthdays = calculateNextBirthdays(condos);

    return [...birthdays];
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
      events={data ? parseForCalendar(data) : []}
      buttonText={buttonText}
      views={views}
      eventTimeFormat={eventTimeFormat}
      height={800}
    />
  );
};
export default Calendar;
