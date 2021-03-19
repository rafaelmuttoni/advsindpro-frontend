import React from "react";
import {
  Avatar,
  Box,
  Button,
  makeStyles,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";

import getInitials from "src/utils/getInitials";
import { useData } from "src/context/DataContext";

const useStyles = makeStyles((theme) => ({
  avatar: {
    marginRight: theme.spacing(2),
  },
}));

const ProviderRow = ({ provider, editProvider }) => {
  const classes = useStyles();
  const { data } = useData();

  const { name: condoName } = data.condos.find(
    (condo) => condo.id === provider.condo_id
  );

  return (
    <TableRow hover key={provider.id}>
      <TableCell>
        <Box alignItems="center" display="flex">
          <Avatar className={classes.avatar}>
            {getInitials(provider.name)}
          </Avatar>
          <Typography color="textPrimary" variant="body1">
            {provider.name}
          </Typography>
        </Box>
      </TableCell>
      <TableCell>
        {provider.document ? provider.document : <i>Não informado</i>}
      </TableCell>
      <TableCell>{condoName}</TableCell>
      <TableCell>
        {provider.address ? provider.address : <i>Não informado</i>}
      </TableCell>
      <TableCell>
        {provider.phone ? provider.phone : <i>Não informado</i>}
      </TableCell>
      <TableCell>
        {provider.email ? provider.email : <i>Não informado</i>}
      </TableCell>
      <TableCell>
        <Button
          size="small"
          onClick={() => editProvider(provider)}
          variant="contained"
        >
          Editar
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default ProviderRow;
