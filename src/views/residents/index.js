import React, { useState } from "react";
import { Box, Container, makeStyles } from "@material-ui/core";

import Page from "src/components/Page";
import Results from "./Results";
import Toolbar from "src/components/Toolbar";

import { useData } from "src/context/DataContext";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const ResidentsView = () => {
  const classes = useStyles();
  const { data } = useData();

  const [filter, setFilter] = useState("");

  const filteredResidents = data
    ? data.residents.filter((resident) => {
        const name = resident.name.toLowerCase();
        return name.includes(filter.toLowerCase());
      })
    : [];

  return (
    <Page className={classes.root} title="Condôminos">
      <Container maxWidth={false}>
        <Toolbar
          name="Condômino"
          filter={filter}
          setFilter={setFilter}
          openModal={() => window.alert("ok")}
        />
        <Box mt={3}>
          <Results residents={filteredResidents} />
        </Box>
      </Container>
    </Page>
  );
};

export default ResidentsView;
