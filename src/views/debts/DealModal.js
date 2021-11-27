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
  InputAdornment,
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

        <TextField
          fullWidth
          label="Primeira parcela"
          margin="normal"
          name="firstQuota"
          type="number"
          onChange={({ target }) => handleChange(target)}
          value={form.firstQuota || ''}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">R$</InputAdornment>
            ),
          }}
          required
        />

        <TextField
          fullWidth
          label="Parcelas seguintes"
          margin="normal"
          name="restQuota"
          type="number"
          onChange={({ target }) => handleChange(target)}
          value={form.restQuota || ''}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">R$</InputAdornment>
            ),
          }}
          required
        />

        <DatePicker
          fullWidth
          label="Dia Vencimento Primeira Parcela"
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
          variant="outlined"
          label="Mês final de quitação"
          margin="normal"
          name="dischargeMonth"
          fullWidth
          value={form.dischargeMonth || ''}
          onChange={({ target }) => handleChange(target)}
          required
        />

        <TextField
          variant="outlined"
          label="Mês vincendo"
          margin="normal"
          name="maturingMonth"
          fullWidth
          value={form.maturingMonth || ''}
          onChange={({ target }) => handleChange(target)}
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeAndClear} color="primary">
          Cancelar
        </Button>
        {form.times &&
        form.firstQuota &&
        form.restQuota &&
        form.quotaDate &&
        form.dischargeMonth &&
        form.maturingMonth ? (
          <DownloadSecondPDF
            user={user}
            title={form.title || ''}
            condo={form.condo || ''}
            resident={form.resident || ''}
            address={form.address || ''}
            price={form.price || ''}
            priceInFull={form.priceInFull || ''}
            dueDate={form.dueDate || ''}
            times={form.times || ''}
            firstQuota={
              form.firstQuota
                ? Number(form.firstQuota).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })
                : ''
            }
            restQuota={
              form.restQuota
                ? Number(form.restQuota).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })
                : ''
            }
            quotaDate={form.quotaDate || ''}
            dischargeMonth={form.dischargeMonth || ''}
            maturingMonth={form.maturingMonth || ''}
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
