import React from "react";
import moment from "moment";
import {
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";

import CalendarIcon from "@material-ui/icons/CalendarToday";
import DescriptionIcon from "@material-ui/icons/Subject";

const DialogItem = ({ icon, title, value }) => {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>{icon}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={title} secondary={value} />
    </ListItem>
  );
};

export default function EventDialog({ content, close }) {
  const isOpen = Boolean(content);

  const { title, description, start } = content;

  return (
    <Dialog onClose={close} open={isOpen}>
      <List>
        <DialogItem
          icon={<CalendarIcon />}
          title={"Data"}
          value={moment(start).format("LL")}
        />
        <DialogItem
          icon={<DescriptionIcon />}
          title={"Descrição"}
          value={description}
        />
      </List>
    </Dialog>
  );
}
