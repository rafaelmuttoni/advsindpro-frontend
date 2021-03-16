import React, { useEffect, useState } from "react";
import { Box, Container, Grid, makeStyles } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

import Page from "src/components/Page";
import Toolbar from "./Toolbar";
import CondoCard from "./CondoCard";
import CondoModal from "./CondoModal";

import { useData } from "src/context/DataContext";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const HomeView = () => {
  const classes = useStyles();
  const { data } = useData();

  const [editingCondo, setEditingCondo] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);

  const filteredCondos = data
    ? data.condos.filter((condo) => {
        const name = condo.name.toLowerCase();
        return name.includes(filter.toLowerCase());
      })
    : [];

  useEffect(() => {
    !!editingCondo && setIsModalOpen(true);
  }, [editingCondo]);

  const closeModal = () => {
    setEditingCondo(false);
    setIsModalOpen(false);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Page className={classes.root} title="Products">
      <Container maxWidth={false}>
        <Toolbar
          filter={filter}
          setFilter={setFilter}
          openModal={setIsModalOpen}
        />
        <Box mt={3}>
          <Grid container spacing={3}>
            {filteredCondos
              .sort((a, b) => a.name.localeCompare(b.name))
              .slice(8 * (page - 1), 8 * page)
              .map((condo) => (
                <Grid item key={condo.id} lg={3} md={6} xs={12}>
                  <CondoCard condo={condo} editCondo={setEditingCondo} />
                </Grid>
              ))}
          </Grid>
        </Box>
        <Box mt={3} display="flex" justifyContent="center">
          <Pagination
            color="primary"
            count={Math.ceil(filteredCondos.length / 8)}
            page={page}
            onChange={handlePageChange}
            size="small"
          />
        </Box>
      </Container>
      <CondoModal
        open={isModalOpen}
        close={closeModal}
        editingCondo={editingCondo}
      />
    </Page>
  );
};

export default HomeView;
