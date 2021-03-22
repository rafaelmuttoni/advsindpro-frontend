import React, { useEffect, useState } from "react";
import { Box, Container, makeStyles } from "@material-ui/core";

import Page from "src/components/Page";
import Toolbar from "src/components/Toolbar";
import { useData } from "src/context/DataContext";

import DebtsTable from "./DebtsTable";
import DebtModal from "./DebtModal";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const DebtsView = () => {
  const classes = useStyles();
  const { data } = useData();

  const [editingDebt, setEditingDebt] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [filter, setFilter] = useState("");

  const filteredDebts = data
    ? data.debts.filter((debt) => {
        const { name: residentName } = data.residents.find(
          (r) => r.id === debt.resident_id
        );
        const name = residentName.toLowerCase();
        return name.includes(filter.toLowerCase());
      })
    : [];

  useEffect(() => {
    !!editingDebt && setIsModalOpen(true);
  }, [editingDebt]);

  const closeModal = () => {
    setEditingDebt(false);
    setIsModalOpen(false);
  };

  return (
    <Page className={classes.root} title="Previdências">
      <Container maxWidth={false}>
        <Toolbar
          name="Previdência"
          filter={filter}
          setFilter={setFilter}
          openModal={setIsModalOpen}
        />
        <Box mt={3}>
          <DebtsTable debts={filteredDebts} editDebt={setEditingDebt} />
        </Box>
      </Container>
      <DebtModal
        open={isModalOpen}
        close={closeModal}
        editingDebt={editingDebt}
      />
    </Page>
  );
};

export default DebtsView;
