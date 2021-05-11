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

import DownloadSecondPDF from 'src/components/DownloadPDF/second'

export default function DealModal({ open, close, dealData }) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const [form, setForm] = useState({})

  console.log(form)

  const closeAndClear = () => {
    setForm(dealData)
    close()
  }

  useEffect(() => {
    setForm(dealData)
  }, [])

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
          label="Dia Vencimento Parcela"
          margin="normal"
          name="dueDay"
          type="number"
          onChange={({ target }) => handleChange(target)}
          value={form.dueDay || ''}
          variant="outlined"
          InputProps={{
            inputProps: {
              min: 1,
              max: 31,
            },
          }}
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
        {form.times && form.dueDay && form.month ? (
          <DownloadSecondPDF
            title={form.title || ''}
            condo={form.condo || ''}
            resident={form.resident || ''}
            address={form.address || ''}
            price={form.price || ''}
            dueDate={form.dueDate || ''}
            dueDay={form.dueDay || ''}
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
