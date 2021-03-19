import React, { useEffect, useState } from "react";
import { Box, Container, makeStyles } from "@material-ui/core";

import Page from "src/components/Page";
import Toolbar from "src/components/Toolbar";
import { useData } from "src/context/DataContext";

import ProvidersTable from "./ProvidersTable";
import ProviderModal from "./ProviderModal";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const ProvidersView = () => {
  const classes = useStyles();
  const { data } = useData();

  const [editingProvider, setEditingProvider] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [filter, setFilter] = useState("");

  const filteredProviders = data
    ? data.providers.filter((provider) => {
        const name = provider.name.toLowerCase();
        return name.includes(filter.toLowerCase());
      })
    : [];

  useEffect(() => {
    !!editingProvider && setIsModalOpen(true);
  }, [editingProvider]);

  const closeModal = () => {
    setEditingProvider(false);
    setIsModalOpen(false);
  };

  return (
    <Page className={classes.root} title="Prestadores">
      <Container maxWidth={false}>
        <Toolbar
          name="Prestador"
          filter={filter}
          setFilter={setFilter}
          openModal={setIsModalOpen}
        />
        <Box mt={3}>
          <ProvidersTable
            providers={filteredProviders}
            editProvider={setEditingProvider}
          />
        </Box>
      </Container>
      <ProviderModal
        open={isModalOpen}
        close={closeModal}
        editingProvider={editingProvider}
      />
    </Page>
  );
};

export default ProvidersView;
