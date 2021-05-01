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
} from '@material-ui/core'
import InputMask from 'react-input-mask'
import moment from 'moment'
import { DatePicker } from '@material-ui/pickers'
import axios from 'axios'

import { useAlert } from 'src/context/AlertContext'
import { useData } from 'src/context/DataContext'

const CondoModal = ({ open, close, editingCondo }) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const { alert } = useAlert()
  const { submit } = useData()

  const [form, setForm] = useState({ initial_date: moment().format() })
  const [loading, setLoading] = useState(false)
  const [date, setDate] = useState(moment().format())

  const closeAndClear = () => {
    setForm({ initial_date: moment().format() })
    close()
  }

  useEffect(() => {
    !!editingCondo && setForm(editingCondo)
  }, [editingCondo])

  const handleChange = async (target) => {
    const { name, value } = target

    if (name === 'zipcode') {
      const withoutUnderline = value.split('_').join('')
      if (withoutUnderline.length === 9) {
        setLoading(true)
        const withoutDash = value.split('-').join('')
        const { data } = await axios.get(
          `https://viacep.com.br/ws/${withoutDash}/json`
        )
        const {
          bairro: neighborhood,
          localidade: city,
          logradouro: street,
          uf: state,
        } = data
        setLoading(false)
        return setForm({
          ...form,
          neighborhood,
          city,
          street,
          state,
          [name]: value,
        })
      } else {
        return setForm({ ...form, [name]: value })
      }
    }

    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const err = await submit('condos', form, Boolean(editingCondo))

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
          {!!editingCondo ? 'Editando' : 'Novo'} Condomínio
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Razão Social"
            margin="normal"
            name="name"
            onChange={({ target }) => handleChange(target)}
            type="text"
            value={form.name || ''}
            variant="outlined"
            required
          />
          <InputMask
            name="code"
            onChange={({ target }) => handleChange(target)}
            value={form.code || ''}
            mask="99.999.999/9999-99"
            maskChar="_"
          >
            {(inputProps) => (
              <TextField
                {...inputProps}
                fullWidth
                label="CNPJ"
                margin="normal"
                variant="outlined"
              />
            )}
          </InputMask>

          <InputMask
            name="zipcode"
            onChange={({ target }) => handleChange(target)}
            value={form.zipcode || ''}
            mask="99999-999"
            maskChar="_"
          >
            {(inputProps) => (
              <TextField
                {...inputProps}
                fullWidth
                label="CEP"
                margin="normal"
                variant="outlined"
                required
              />
            )}
          </InputMask>

          <TextField
            fullWidth
            label="Rua/Av"
            margin="normal"
            name="street"
            onChange={({ target }) => handleChange(target)}
            type="text"
            value={form.street || ''}
            variant="outlined"
            required
            disabled={loading}
          />

          <div style={{ display: 'flex' }}>
            <TextField
              fullWidth
              label="Prédio"
              margin="normal"
              name="building"
              onChange={({ target }) => handleChange(target)}
              type="text"
              value={form.building || ''}
              variant="outlined"
              required
            />

            <TextField
              fullWidth
              label="Núcleo"
              margin="normal"
              name="core"
              onChange={({ target }) => handleChange(target)}
              type="text"
              value={form.core || ''}
              variant="outlined"
              style={{ marginRight: 6, marginLeft: 6 }}
            />

            <TextField
              fullWidth
              label="Bloco"
              margin="normal"
              name="block"
              onChange={({ target }) => handleChange(target)}
              type="text"
              value={form.block || ''}
              variant="outlined"
              required
            />
          </div>

          <TextField
            fullWidth
            label="Bairro"
            margin="normal"
            name="neighborhood"
            onChange={({ target }) => handleChange(target)}
            type="text"
            value={form.neighborhood || ''}
            variant="outlined"
            required
            disabled={loading}
          />
          <TextField
            fullWidth
            label="Cidade"
            margin="normal"
            name="city"
            onChange={({ target }) => handleChange(target)}
            type="text"
            value={form.city || ''}
            variant="outlined"
            required
            disabled={loading}
          />
          <TextField
            fullWidth
            label="Estado"
            margin="normal"
            name="state"
            onChange={({ target }) => handleChange(target)}
            type="text"
            value={form.state || ''}
            variant="outlined"
            required
            disabled={loading}
          />

          <TextField
            fullWidth
            label="Síndico"
            margin="normal"
            name="manager"
            onChange={({ target }) => handleChange(target)}
            type="text"
            value={form.manager || ''}
            variant="outlined"
            required
          />

          <DatePicker
            fullWidth
            label="Data de Início"
            format="LL"
            margin="normal"
            name="initial_date"
            onChange={(dateTime) => {
              setDate(dateTime)
              let date = {}
              date.value = dateTime.format()
              date.name = 'initial_date'
              handleChange(date)
            }}
            value={date}
            inputVariant="outlined"
            required
          />
          <TextField
            fullWidth
            label="Número da UC (CEEE/RGE)"
            margin="normal"
            name="energy"
            onChange={({ target }) => handleChange(target)}
            value={form.energy || ''}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Ramal de água (DMAE/Corsan)"
            margin="normal"
            name="water"
            onChange={({ target }) => handleChange(target)}
            value={form.water || ''}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Código do cliente (Cia de gás)"
            margin="normal"
            name="gas"
            onChange={({ target }) => handleChange(target)}
            value={form.gas || ''}
            variant="outlined"
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

export default CondoModal
