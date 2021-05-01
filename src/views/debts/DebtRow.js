import React from 'react'
import moment from 'moment'

import { Button, TableCell, TableRow } from '@material-ui/core'
import { useData } from 'src/context/DataContext'

import DownloadPDF from 'src/components/DownloadPDF'

export default function DebtRow({ event, editDebt }) {
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
          <Button color="secondary" variant="contained">
            Gerar PDF
          </Button>
        </DownloadPDF>
      </TableCell>
      <TableCell>
        <Button
          size="small"
          onClick={() => editDebt(event)}
          variant="contained"
        >
          Editar
        </Button>
      </TableCell>
    </TableRow>
  )
}
