import React from 'react'
import moment from 'moment'

import {
  Button,
  TableCell,
  TableRow,
  ListItemIcon,
  Menu,
  MenuItem,
} from '@material-ui/core'

import ReminderIcon from '@material-ui/icons/NotificationsActive'
import EditIcon from '@material-ui/icons/Create'
import DownloadIcon from '@material-ui/icons/GetApp'

import { useData } from 'src/context/DataContext'

import DownloadPDF from 'src/components/DownloadPDF'

export default function DebtRow({
  event,
  editDebt,
  reminder,
  anchorEl,
  openMenu,
  closeMenu,
}) {
  const { data } = useData()

  const residentData = (id, key) => {
    const resident = data.residents.find((r) => r.id === id)
    return resident[key]
  }

  return (
    <TableRow>
      <TableCell>{residentData(event.resident_id, 'name')}</TableCell>
      <TableCell>{event.title}</TableCell>
      <TableCell>
        {event.price.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>
      <TableCell>{moment(event.due_date).format('DD/MM/YYYY')}</TableCell>

      <TableCell>
        <DownloadPDF
          title={event.tile}
          resident={residentData(event.resident_id, 'name')}
          address={residentData(event.resident_id, 'address')}
          price={event.price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        >
          <Button color="primary" variant="contained" size="small">
            Gerar PDF
          </Button>
        </DownloadPDF>
      </TableCell>

      <TableCell>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={(e) => openMenu(event.id, e)}
          color="secondary"
          variant="contained"
          size="small"
        >
          Opções
        </Button>

        <Menu
          id={event.id}
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={(e) => closeMenu(event.id, e)}
        >
          <MenuItem onClick={() => reminder(event)}>
            <ListItemIcon style={{ minWidth: 0, marginRight: 8 }}>
              <ReminderIcon fontSize="small" />
            </ListItemIcon>
            Lembrar-me
          </MenuItem>

          <MenuItem onClick={() => editDebt(event)}>
            <ListItemIcon style={{ minWidth: 0, marginRight: 8 }}>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            Editar
          </MenuItem>
        </Menu>
      </TableCell>
    </TableRow>
  )
}
