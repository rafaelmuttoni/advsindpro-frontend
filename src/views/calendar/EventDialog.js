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
  makeStyles,
} from "@material-ui/core";

import CalendarIcon from "@material-ui/icons/CalendarToday";
import DescriptionIcon from "@material-ui/icons/Subject";
import ProviderIcon from "@material-ui/icons/Build";
import CondoIcon from "@material-ui/icons/HomeWork";
import PriceIcon from "@material-ui/icons/AttachMoney";

import { useData } from "src/context/DataContext";
import { parseToReal } from "src/utils/parsers";

const useStyles = makeStyles((theme) => ({
  title: {
    minWidth: "25vw",
    "& h2": {
      fontSize: "1rem",
    },
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    "& svg": {
      width: theme.spacing(2),
      height: theme.spacing(2),
    },
  },
}));

const DialogItem = ({ icon, title, value }) => {
  const classes = useStyles();
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar className={classes.avatar}>{icon}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={title} secondary={value} />
    </ListItem>
  );
};

export default function EventDialog({ content, close }) {
  const classes = useStyles();
  const { data } = useData();
  const isOpen = Boolean(content);

  const {
    type,
    title,
    description,
    start,
    price,
    condo_id,
    provider_id,
  } = content;

  const provider = data && data.providers.find((p) => p.id === provider_id);
  const condo = data && data.condos.find((p) => p.id === condo_id);

  console.log();

  return (
    <Dialog onClose={close} open={isOpen}>
      <DialogTitle className={classes.title}>{title}</DialogTitle>
      <DialogContent dividers>
        <List>
          {condo && (
            <DialogItem
              icon={<CondoIcon />}
              title={"Condomínio"}
              value={condo.name}
            />
          )}
          <DialogItem
            icon={<CalendarIcon />}
            title={"Data"}
            value={moment(start).format(
              type === "services" || type === "events" ? "LLL" : "LL"
            )}
          />
          {type === "services" && (
            <>
              <DialogItem
                icon={<ProviderIcon />}
                title={"Provedor"}
                value={provider.name}
              />

              <DialogItem
                icon={<PriceIcon />}
                title={"Preço"}
                value={parseToReal(price)}
              />
            </>
          )}
          <DialogItem
            icon={<DescriptionIcon />}
            title={"Descrição"}
            value={description || <i>Sem descrição</i>}
          />
        </List>
      </DialogContent>
    </Dialog>
  );
}
