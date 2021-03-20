import React, { useEffect, useRef } from "react";
import moment from "moment";

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
  const { setCalendarApi, setDialogContent } = useCalendar();
  const { data, condo } = useData();

  useEffect(() => {
    setCalendarApi(calendarRef.current.getApi());
    // eslint-disable-next-line
  }, []);

  const handleEventClick = (info) => {
    const { title, start } = info.event;
    const { extendedProps } = info.event;
    setDialogContent({ title, start, ...extendedProps });
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
    const { condos, events, services, debts } = data;

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

    const parsedEvents = events.map((e) => ({
      id: `event - ${e.id}`,
      type: "events",
      title: e.name,
      start: moment(e.date).format("YYYY-MM-DD HH:mm"),
      description: e.description,
      condo_id: e.condo_id,
    }));

    const parsedServices = services.map((e) => ({
      id: `service - ${e.id}`,
      type: "services",
      title: e.name,
      start: moment(e.date).format("YYYY-MM-DD HH:mm"),
      description: e.description,
      price: e.price,
      condo_id: e.condo_id,
      provider_id: e.provider_id,
    }));

    const birthdays = calculateNextBirthdays(condos);

    return [...birthdays, ...parsedServices, ...parsedEvents].filter((e) => {
      if (condo) return e.condo_id === condo.id;
      return e;
    });
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
