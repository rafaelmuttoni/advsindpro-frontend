import React, { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";

import ProviderRow from "./ProviderRow";

const ProvidersTable = ({ providers, editProvider }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome | Razão Social</TableCell>
                <TableCell>CPF | CNPJ</TableCell>
                <TableCell>Endereço</TableCell>
                <TableCell>Telefone</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Editar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {providers
                .sort((a, b) => a.name.localeCompare(b.name))
                .slice(limit * page, limit * (page + 1))
                .map((provider) => (
                  <ProviderRow
                    key={provider.id}
                    provider={provider}
                    editProvider={editProvider}
                  />
                ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={providers.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage="Linhas"
        labelDisplayedRows={({ from, to, count }) =>
          `${from} a ${to} de ${count}`
        }
      />
    </Card>
  );
};

export default ProvidersTable;
