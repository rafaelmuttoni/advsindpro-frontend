import React, { useEffect, useState } from "react";
import { Box, Container, makeStyles } from "@material-ui/core";

import Page from "src/components/Page";
import Toolbar from "src/components/Toolbar";
import { useData } from "src/context/DataContext";

import ResidentsTable from "./ResidentsTable";
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
  const { data, condo } = useData();

  const [editingResident, setEditingResident] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [filter, setFilter] = useState("");

  const filteredResidents = data
    ? data.residents
        .filter((r) => {
          if (condo) return r.condo_id === condo.id;
          return r;
        })
        .filter((resident) => {
          const name = resident.name.toLowerCase();
          return name.includes(filter.toLowerCase());
        })
    : [];

  useEffect(() => {
    !!editingResident && setIsModalOpen(true);
  }, [editingResident]);

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
          <ResidentsTable
            residents={filteredResidents}
            editResident={setEditingResident}
          />
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
