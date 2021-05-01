import React from 'react'
import {
  Avatar,
  Box,
  Button,
  makeStyles,
  TableCell,
  TableRow,
  Typography,
} from '@material-ui/core'

import getInitials from 'src/utils/getInitials'
import { useData } from 'src/context/DataContext'

const useStyles = makeStyles((theme) => ({
  avatar: {
    marginRight: theme.spacing(2),
  },
}))

const ResidentRow = ({ resident, editResident }) => {
  const classes = useStyles()
  const { data } = useData()

  const { name: condoName } = data.condos.find(
    (condo) => condo.id === resident.condo_id
  )

  return (
    <TableRow hover key={resident.id}>
      <TableCell>
        <Box alignItems="center" display="flex">
          <Avatar className={classes.avatar}>
            {getInitials(resident.name)}
          </Avatar>
          <Typography color="textPrimary" variant="body1">
            {resident.name}
          </Typography>
        </Box>
      </TableCell>
      <TableCell>
        {resident.document ? resident.document : <i>Não informado</i>}
      </TableCell>
      <TableCell>{condoName}</TableCell>
      <TableCell>
        {resident.apartment ? resident.apartment : <i>Não informado</i>}
      </TableCell>
      <TableCell>
        {resident.phone ? resident.phone : <i>Não informado</i>}
      </TableCell>
      <TableCell>
        {resident.email ? resident.email : <i>Não informado</i>}
      </TableCell>
      <TableCell>
        <Button
          size="small"
          onClick={() => editResident(resident)}
          variant="contained"
        >
          Editar
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default ResidentRow
