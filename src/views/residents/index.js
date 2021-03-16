import React, { useState } from "react";
import { Box, Container, makeStyles } from "@material-ui/core";

import Page from "src/components/Page";
import Toolbar from "src/components/Toolbar";
import { useData } from "src/context/DataContext";

import Results from "./Results";
import ResidentModal from "./ResidentModal";

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

  const [editingResident, setEditingResident] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [filter, setFilter] = useState("");

  const filteredResidents = data
    ? data.residents.filter((resident) => {
        const name = resident.name.toLowerCase();
        return name.includes(filter.toLowerCase());
      })
    : [];

  const closeModal = () => {
    setEditingResident(false);
    setIsModalOpen(false);
  };

  return (
    <Page className={classes.root} title="Condôminos">
      <Container maxWidth={false}>
        <Toolbar
          name="Condômino"
          filter={filter}
          setFilter={setFilter}
          openModal={setIsModalOpen}
        />
        <Box mt={3}>
          <Results residents={filteredResidents} />
        </Box>
      </Container>
      <ResidentModal
        open={isModalOpen}
        close={closeModal}
        editingResident={editingResident}
      />
    </Page>
  );
};

export default ResidentsView;
