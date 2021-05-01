import React from 'react'
import moment from 'moment'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import { useData } from 'src/context/DataContext'
import { useAlert } from 'src/context/AlertContext'
import { parseToReal } from 'src/utils/parsers'

export default function FormDialog({ isOpen, close, event }) {
  const { data, submit } = useData()
  const { alert } = useAlert()

  const [days, setDays] = React.useState('1')

  const getResidentData = (e, key) => {
    const resident = data.residents.find((r) => r.id === e.resident_id)
    return resident[key]
  }

  const handleReschedule = async () => {
    const err = await submit('events', {
      name: `Lembrete inadimplência - ${event.title}`,
      date: moment().add(days, 'days').format(),
      priority: 3,
      description: `Lembrete de inadimplência (${
        event.title
      }) do Condôminio ${getResidentData(
        event,
        'name'
      )} com vencimento na data ${moment(event.due_date).format(
        'DD/MM/YYYY'
      )} no valor de ${parseToReal(event.price)}.`,
      condo_id: getResidentData(event, 'condo_id'),
    })
    if (err) {
      alert('Ocorreu um erro na sua solicitação', 'error')
    } else {
      alert(
        `Evento criado no dia ${moment()
          .add(days, 'days')
          .format('DD/MM/YYYY')}.`
      )
    }
  }

  return (
    <Dialog open={isOpen} onClose={close} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        Em quantos dias você gostaria de ser avisado dessa inadimplência?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Definindo o dia abaixo e clicando "Lembrar-me" um evento será criado
          na Agenda.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Número de dias"
          type="number"
          InputProps={{
            inputProps: {
              min: 1,
            },
          }}
          value={days}
          onChange={(e) => setDays(e.target.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={close} color="primary">
          Cancel
        </Button>
        <Button onClick={handleReschedule} color="primary">
          Lembrar-me
        </Button>
      </DialogActions>
    </Dialog>
  )
}
