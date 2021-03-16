import React from "react";
import moment from "moment";
import {
  Avatar,
  Box,
  makeStyles,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";

import getInitials from "src/utils/getInitials";

const useStyles = makeStyles((theme) => ({
  avatar: {
    marginRight: theme.spacing(2),
  },
}));

const ResidentRow = ({ customer }) => {
  const classes = useStyles();
  return (
    <TableRow hover key={customer.id}>
      <TableCell>
        <Box alignItems="center" display="flex">
          <Avatar className={classes.avatar} src={customer.avatarUrl}>
            {getInitials(customer.name)}
          </Avatar>
          <Typography color="textPrimary" variant="body1">
            {customer.name}
          </Typography>
        </Box>
      </TableCell>
      <TableCell>{customer.email}</TableCell>
      <TableCell>
        {`${customer.address.city}, ${customer.address.state}, ${customer.address.country}`}
      </TableCell>
      <TableCell>{customer.phone}</TableCell>
      <TableCell>{moment(customer.createdAt).format("DD/MM/YYYY")}</TableCell>
    </TableRow>
  );
};

export default ResidentRow;
