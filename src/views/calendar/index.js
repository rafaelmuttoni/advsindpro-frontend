import React from "react";
import { Card, Container, makeStyles } from "@material-ui/core";

import Page from "src/components/Page";
import Calendar from "./Calendar";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const CalendarView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Agenda">
      <Container maxWidth={false}>
        <Card>
          <Calendar />
        </Card>
      </Container>
    </Page>
  );
};

export default CalendarView;
