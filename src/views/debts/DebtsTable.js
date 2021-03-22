import React, { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";

import {
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  topCard: {
    marginBottom: theme.spacing(3),
  },
  head: {
    background: theme.palette.secondary.main,
    color: "#fff",
  },
  paper: {
    height: 50,
    padding: 15,
    fontWeight: 400,
  },
  income: {
    fontWeight: 600,
    background: "#c8e6c9",
    padding: "10px 20px",
    borderRadius: "20px",
  },
  expense: {
    fontWeight: 600,
    background: "#ffcdd2",
    padding: "10px 20px",
    borderRadius: "20px",
  },
}));

const DebtsTable = ({ debts, togglePayment }) => {
  const classes = useStyles();

  const [topPagination, setTopPagination] = useState({
    limit: 10,
    page: 0,
  });

  const [bottomPagination, setBottomPagination] = useState({
    limit: 10,
    page: 0,
  });

  const handleLimitChange = (event, table) => {
    if (table === "top") {
      setTopPagination({
        ...topPagination,
        limit: event.target.value,
      });
    }

    if (table === "bottom") {
      setBottomPagination({
        ...bottomPagination,
        limit: event.target.value,
      });
    }
  };

  const handlePageChange = (event, newPage, table) => {
    if (table === "top") {
      setTopPagination({
        ...topPagination,
        page: newPage,
      });
    }

    if (table === "bottom") {
      setBottomPagination({
        ...bottomPagination,
        page: newPage,
      });
    }
  };

  const openPayments = debts.filter(({ payment_status }) => !payment_status);

  const confirmedPayments = debts.filter(
    ({ payment_status }) => payment_status
  );

  return (
    <>
      <Card className={classes.topCard}>
        <CardHeader title="Pagamentos em Aberto" className={classes.head} />
        <Divider />
        {openPayments.length === 0 ? (
          <Paper className={classes.paper}>Nenhum resultado encontrado.</Paper>
        ) : (
          <>
            <PerfectScrollbar>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Tipo</TableCell>
                    <TableCell>Data</TableCell>
                    <TableCell>Título</TableCell>
                    <TableCell>Valor</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Editar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {openPayments
                    .sort((a, b) => new Date(a.date) - new Date(b.date))
                    .slice(
                      topPagination.limit * topPagination.page,
                      topPagination.limit * (topPagination.page + 1)
                    )
                    .map((event, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <span
                            className={
                              event.client_id ? classes.income : classes.expense
                            }
                          >
                            {event.client_id ? "Receita" : "Despesa"}
                          </span>
                        </TableCell>
                        <TableCell>{event.date}</TableCell>
                        <TableCell>
                          {event.name ||
                            (event.client_id ? "Consulta" : "Despesa")}
                        </TableCell>
                        <TableCell>
                          {event.price.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label="Aguardando Pagamento"
                            onClick={() =>
                              togglePayment(event, event.client_id)
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Button color="secondary" variant="contained">
                            Editar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </PerfectScrollbar>
            <TablePagination
              component="div"
              count={openPayments.length}
              onChangeRowsPerPage={(e) => handleLimitChange(e, "top")}
              onChangePage={(e, newPage) => handlePageChange(e, newPage, "top")}
              page={topPagination.page}
              rowsPerPage={topPagination.limit}
              rowsPerPageOptions={[5, 10, 25]}
              labelRowsPerPage="Linhas"
              labelDisplayedRows={({ from, to, count }) =>
                `${from} a ${to} de ${count}`
              }
            />
          </>
        )}
      </Card>
      <Card>
        <CardHeader title="Pagamentos Confirmados" className={classes.head} />
        <Divider />
        {confirmedPayments.length === 0 ? (
          <Paper className={classes.paper}>Nenhum resultado encontrado.</Paper>
        ) : (
          <>
            <PerfectScrollbar>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Tipo</TableCell>
                    <TableCell>Data</TableCell>
                    <TableCell>Título</TableCell>
                    <TableCell>Valor</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Editar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {confirmedPayments
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .slice(
                      bottomPagination.limit * bottomPagination.page,
                      bottomPagination.limit * (bottomPagination.page + 1)
                    )
                    .map((event, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <span
                            className={
                              event.client_id ? classes.income : classes.expense
                            }
                          >
                            {event.client_id ? "Receita" : "Despesa"}
                          </span>
                        </TableCell>
                        <TableCell>{event.date}</TableCell>
                        <TableCell>
                          {event.name ||
                            (event.client_id ? "Consulta" : "Despesa")}
                        </TableCell>
                        <TableCell>
                          {event.price.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label="Pagamento confirmado"
                            color="secondary"
                            onClick={() =>
                              togglePayment(event, event.client_id)
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Button color="secondary" variant="contained">
                            Editar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </PerfectScrollbar>
            <TablePagination
              component="div"
              count={confirmedPayments.length}
              onChangeRowsPerPage={(e) => handleLimitChange(e, "bottom")}
              onChangePage={(e, newPage) =>
                handlePageChange(e, newPage, "bottom")
              }
              page={bottomPagination.page}
              rowsPerPage={bottomPagination.limit}
              rowsPerPageOptions={[5, 10, 25]}
              labelRowsPerPage="Linhas"
              labelDisplayedRows={({ from, to, count }) =>
                `${from} a ${to} de ${count}`
              }
            />
          </>
        )}
      </Card>
    </>
  );
};

export default DebtsTable;
