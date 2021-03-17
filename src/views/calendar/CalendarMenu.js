import React, { useState } from "react";
import { Button, makeStyles, Menu, MenuItem } from "@material-ui/core";
import { useCalendar } from "./CalendarContext";

const useStyles = makeStyles((theme) => ({
  button: {
    marginLeft: "auto",
  },
}));

const CalendarMenu = ({ setTitle }) => {
  const classes = useStyles();
  const { calendarApi } = useCalendar();

  const [currentFilter, setCurrentFilter] = useState("Mês");
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilter = (filter) => {
    setCurrentFilter(filter);
    switch (filter) {
      case "Mês":
        calendarApi.changeView("dayGridMonth");
        setTitle(calendarApi.getCurrentData().viewTitle);
        console.log(calendarApi.getCurrentData().viewTitle);
        break;
      case "Semana":
        calendarApi.changeView("timeGridWeek");
        setTitle(calendarApi.getCurrentData().viewTitle);
        break;
      case "Dia":
        calendarApi.changeView("timeGridDay");
        setTitle(calendarApi.getCurrentData().viewTitle);
        break;
      case "Lista":
        calendarApi.changeView("listWeek");
        setTitle(calendarApi.getCurrentData().viewTitle);
        break;
      default:
        calendarApi.changeView("listYear");
        setTitle(calendarApi.getCurrentData().viewTitle);
    }
    handleClose();
  };

  const filters = ["Mês", "Semana", "Dia", "Lista", "Ano"];

  return (
    <>
      <Button
        onClick={handleMenu}
        className={classes.button}
        variant="contained"
        color="primary"
      >
        {currentFilter}
      </Button>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
      >
        {filters.map((filter) => {
          return (
            <MenuItem
              onClick={() => {
                handleFilter(filter);
              }}
            >
              {filter}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default CalendarMenu;
