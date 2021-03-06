import React, { useState } from "react";
import {
  AppBar,
  Card,
  CardContent,
  Container,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import PreviousIcon from "@material-ui/icons/NavigateBefore";
import NextIcon from "@material-ui/icons/NavigateNext";

import Page from "src/components/Page";
import Calendar from "./Calendar";
import { useCalendar } from "./CalendarContext";
import CalendarMenu from "./CalendarMenu";
import EventMenu from "./EventMenu";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  card: {
    padding: theme.spacing(2),
  },
}));

const CalendarView = () => {
  const classes = useStyles();
  const { calendarApi } = useCalendar();

  const [title, setTitle] = useState("");

  return (
    <Page className={classes.root} title="Agenda">
      <Container maxWidth={false}>
        <AppBar position="static" color="transparent">
          <Toolbar>
            <EventMenu />
            <IconButton
              color="primary"
              onClick={() => {
                calendarApi.prev();
                setTitle(calendarApi.getCurrentData().viewTitle);
              }}
            >
              <PreviousIcon />
            </IconButton>
            <IconButton
              color="primary"
              onClick={() => {
                calendarApi.next();
                setTitle(calendarApi.getCurrentData().viewTitle);
              }}
              c
            >
              <NextIcon />
            </IconButton>

            <Typography color="primary" variant="h5">
              {title || `${calendarApi.currentDataManager?.data?.viewTitle}`}
            </Typography>

            <CalendarMenu setTitle={setTitle} />
          </Toolbar>
        </AppBar>
        <Card className={classes.card}>
          <CardContent>
            <Calendar />
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
};

export default CalendarView;
