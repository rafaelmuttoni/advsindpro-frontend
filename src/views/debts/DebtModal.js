import React, { useEffect, useState } from 'react'
import {
  Button,
  TextField,
  Dialog,
  useMediaQuery,
  useTheme,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  FormControlLabel,
  Checkbox,
  InputAdornment,
} from '@material-ui/core'
import moment from 'moment'
import { DatePicker } from '@material-ui/pickers'

import { useAlert } from 'src/context/AlertContext'
import { useData } from 'src/context/DataContext'

const DebtModal = ({ open, close, editingDebt }) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const { alert } = useAlert()
  const { data, submit } = useData()

  const [form, setForm] = useState({ date: moment().format() })
  const [date, setDate] = useState(moment().format())

  const closeAndClear = () => {
    setForm({ date: moment().format() })
    close()
  }

  useEffect(() => {
    !!editingDebt && setForm(editingDebt)
  }, [editingDebt])

  const handleChange = (target) => {
    const { name, value } = target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const err = await submit('debts', form, Boolean(editingDebt))

    if (err) {
      alert('Ocorreu um erro na sua solicitação', 'error')
    } else {
      alert()
      closeAndClear()
    }
  }

  return (
    <Dialog open={open} onClose={closeAndClear} fullScreen={fullScreen}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {!!editingDebt ? 'Editando' : 'Nova'} Inadimplência
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Cobrança (ex.: Mar/2021)"
            margin="normal"
            name="title"
            onChange={({ target }) => handleChange(target)}
            value={form.title || ''}
            variant="outlined"
            required
          />
          <TextField
            select
            variant="outlined"
            margin="normal"
            name="resident_id"
            label="Condômino"
            type="text"
            fullWidth
            value={form.resident_id || ''}
            onChange={({ target }) => handleChange(target)}
            required
          >
            {data &&
              data.residents.map((resident) => (
                <MenuItem key={resident.id} value={resident.id}>
                  {resident.name}
                </MenuItem>
              ))}
          </TextField>

          <DatePicker
            fullWidth
            label="Data de vencimento"
            format="LL"
            margin="normal"
            name="date"
            onChange={(dateTime) => {
              setDate(dateTime)
              let date = {}
              date.value = dateTime.format()
              date.name = 'date'
              handleChange(date)
            }}
            value={date}
            inputVariant="outlined"
            required
          />
          <TextField
            fullWidth
            label="Preço"
            margin="normal"
            name="price"
            type="number"
            onChange={({ target }) => handleChange(target)}
            value={form.price || ''}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">R$</InputAdornment>
              ),
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={form.payment_status || false}
                onChange={() =>
                  setForm({
                    ...form,
                    payment_status: !form.payment_status,
                  })
                }
                name="payment_status"
                color="primary"
              />
            }
            label="Pagamento confirmado"
          />
          <TextField
            fullWidth
            label="Informações adicionais"
            margin="normal"
            name="description"
            onChange={({ target }) => handleChange(target)}
            value={form.description || ''}
            variant="outlined"
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAndClear} color="primary">
            Cancelar
          </Button>
          <Button type="submit" color="primary" variant="contained">
            Salvar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default DebtModal
