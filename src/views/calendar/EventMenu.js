import React, { useState } from "react";
import { Button, makeStyles, Menu, MenuItem } from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { useCalendar } from "./CalendarContext";

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(2),
  },
}));

const EventMenu = ({ setTitle }) => {
  const classes = useStyles();
  const { setCreatingEvent } = useCalendar();

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        onClick={handleMenu}
        className={classes.button}
        variant="contained"
        color="primary"
        endIcon={<KeyboardArrowDownIcon />}
      >
        Adicionar
      </Button>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            setCreatingEvent("event");
          }}
        >
          Novo Evento
        </MenuItem>

        <MenuItem
          onClick={() => {
            setCreatingEvent("service");
          }}
        >
          Novo Serviço
        </MenuItem>
      </Menu>
    </>
  );
};

export default EventMenu;
