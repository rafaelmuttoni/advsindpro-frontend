import React, { useState } from "react";
import { Box, Container, Grid, makeStyles } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

import Page from "src/components/Page";
import Toolbar from "./Toolbar";
import CondoCard from "./CondoCard";
import { useData } from "src/context/DataContext";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  condoCard: {
    height: "100%",
  },
}));

const HomeView = () => {
  const classes = useStyles();
  const { data, condo } = useData();

  const [filter, setFilter] = useState("");

  return (
    <Page className={classes.root} title="Products">
      <Container maxWidth={false}>
        <Toolbar filter={filter} setFilter={setFilter} />
        <Box mt={3}>
          <Grid container spacing={3}>
            {data &&
              data.condos
                .filter((condo) => {
                  const name = condo.name.toLowerCase();
                  return name.includes(filter.toLowerCase());
                })
                .map((condo) => (
                  <Grid item key={condo.id} lg={3} md={6} xs={12}>
                    <CondoCard className={classes.condoCard} condo={condo} />
                  </Grid>
                ))}
          </Grid>
        </Box>
        <Box mt={3} display="flex" justifyContent="center">
          <Pagination color="primary" count={3} size="small" />
        </Box>
      </Container>
    </Page>
  );
};

export default HomeView;
