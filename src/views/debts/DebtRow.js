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

import { parseToReal } from 'src/utils/parsers'
import { useData } from 'src/context/DataContext'

import DownloadFirstPDF from 'src/components/DownloadPDF/first'

export default function DebtRow({
  event,
  editDebt,
  reminder,
  anchorEl,
  openMenu,
  closeMenu,
  openDealModal,
}) {
  const { data } = useData()

  const residentData = (id, key) => {
    const resident = data.residents.find((r) => r.id === id)
    return resident[key]
  }

  const getCondoName = (id) => {
    const { name: condoName } = data.condos.find((c) => c.id === id)
    return condoName
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
        <DownloadFirstPDF
          title={event.title}
          resident={residentData(event.resident_id, 'name')}
          address={residentData(event.resident_id, 'address')}
          price={event.price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        >
          <Button color="primary" variant="contained" size="small">
            Procedimento
          </Button>
        </DownloadFirstPDF>
      </TableCell>

      <TableCell>
        <Button
          color="primary"
          variant="contained"
          size="small"
          onClick={() =>
            openDealModal({
              title: event.title,
              condo: getCondoName(residentData(event.resident_id, 'condo_id')),
              resident: residentData(event.resident_id, 'name'),
              address: residentData(event.resident_id, 'address'),
              price: parseToReal(event.price),
              dueDate: moment(event.due_date).format('MMMM'),
            })
          }
        >
          Acordo
        </Button>
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
