import React from "react";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SwipeableDrawer,
} from "@material-ui/core";
import { useAlert } from "src/context/AlertContext";
import getInitials from "src/utils/getInitials";

const Drawer = ({ isOpen, setIsOpen, condo, condos, setCondo }) => {
  const { alert } = useAlert();

  const open = () => setIsOpen(false);
  const close = () => setIsOpen(false);

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={isOpen}
      onOpen={open}
      onClose={close}
    >
      <List>
        <ListItem
          selected={condo === ""}
          button
          onClick={() => {
            setCondo("");
            alert(`Visualizando todos condomínios`, "info");
            close();
          }}
        >
          <ListItemText primary="Todos os condomínios" />
        </ListItem>
        {condos.map((c) => (
          <ListItem
            selected={condo === c.name}
            button
            onClick={() => {
              setCondo(c.name);
              alert(`Visualizando condomínio: ${c.name}`, "info");
              close();
            }}
          >
            <ListItemAvatar>
              <Avatar>{getInitials(c.name)}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={c.name} />
          </ListItem>
        ))}
      </List>
    </SwipeableDrawer>
  );
};

export default Drawer;
