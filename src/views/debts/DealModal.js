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
} from '@material-ui/core'

import { useAuth } from 'src/context/AuthContext'

import DownloadSecondPDF from 'src/components/DownloadPDF/second'
import moment from 'moment'
import { DatePicker } from '@material-ui/pickers'

export default function DealModal({ open, close, dealData }) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const { user } = useAuth()

  const [date, setDate] = useState(moment().format())
  const [form, setForm] = useState({})

  const closeAndClear = () => {
    setForm({ ...dealData, quotaDate: moment().format('DD/MM/YYYY') })
    close()
  }

  useEffect(() => {
    setForm({ ...dealData, quotaDate: moment().format('DD/MM/YYYY') })
  }, [dealData])

  const handleChange = (target) => {
    const { name, value } = target
    setForm({ ...form, [name]: value })
  }

  return (
    <Dialog open={open} onClose={closeAndClear} fullScreen={fullScreen}>
      <DialogTitle>Gerando Acordo</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Número parcelas"
          margin="normal"
          name="times"
          type="number"
          onChange={({ target }) => handleChange(target)}
          value={form.times || ''}
          variant="outlined"
          InputProps={{
            inputProps: {
              min: 1,
            },
          }}
          required
        />

        <DatePicker
          fullWidth
          label="Dia Vencimento Parcela"
          format="DD/MM/YYYY"
          margin="normal"
          name="quotaDate"
          onChange={(dateTime) => {
            setDate(dateTime)
            let date = {}
            date.value = dateTime.format('DD/MM/YYYY')
            date.name = 'quotaDate'
            handleChange(date)
          }}
          value={date}
          inputVariant="outlined"
          required
        />

        <TextField
          select
          variant="outlined"
          label="Mês de quitação"
          margin="normal"
          name="month"
          type="text"
          fullWidth
          value={form.month || ''}
          onChange={({ target }) => handleChange(target)}
          required
        >
          <MenuItem value="Janeiro">Janeiro</MenuItem>
          <MenuItem value="Fevereiro">Fevereiro</MenuItem>
          <MenuItem value="Março">Março</MenuItem>
          <MenuItem value="Abril">Abril</MenuItem>
          <MenuItem value="Maio">Maio</MenuItem>
          <MenuItem value="Junho">Junho</MenuItem>
          <MenuItem value="Julho">Julho</MenuItem>
          <MenuItem value="Agosto">Agosto</MenuItem>
          <MenuItem value="Setembro">Setembro</MenuItem>
          <MenuItem value="Outubro">Outubro</MenuItem>
          <MenuItem value="Novembro">Novembro</MenuItem>
          <MenuItem value="Dezembro">Dezembro</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeAndClear} color="primary">
          Cancelar
        </Button>
        {form.times && form.quotaDate && form.month ? (
          <DownloadSecondPDF
            user={user}
            title={form.title || ''}
            condo={form.condo || ''}
            resident={form.resident || ''}
            address={form.address || ''}
            price={form.price || ''}
            priceInFull={form.priceInFull || ''}
            dueDate={form.dueDate || ''}
            quotaDate={form.quotaDate || ''}
            times={form.times || ''}
            month={form.month || ''}
          >
            <Button type="submit" color="primary" variant="contained">
              Salvar
            </Button>
          </DownloadSecondPDF>
        ) : (
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={true}
          >
            Salvar
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}
