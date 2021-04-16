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

import { useAlert } from 'src/context/AlertContext'
import { useData } from 'src/context/DataContext'

import InputMask from 'react-input-mask'

const ProviderModal = ({ open, close, editingProvider }) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const { alert } = useAlert()
  const { submit } = useData()

  const [form, setForm] = useState({})

  const closeAndClear = () => {
    setForm({})
    close()
  }

  useEffect(() => {
    !!editingProvider && setForm(editingProvider)
  }, [editingProvider])

  const handleChange = (target) => {
    const { name, value } = target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const err = await submit('providers', form, Boolean(editingProvider))

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
          {!!editingProvider ? 'Editando' : 'Novo'} Prestador
        </DialogTitle>
        <DialogContent>
          <TextField
            select
            variant="outlined"
            margin="normal"
            name="type"
            label="Tipo"
            type="text"
            fullWidth
            value={form.type || ''}
            onChange={({ target }) => handleChange(target)}
            required
          >
            <MenuItem value={'cpf'}>Pessoa física (CPF)</MenuItem>
            <MenuItem value={'cnpj'}>Pessoa física (CNPJ)</MenuItem>
          </TextField>
          <InputMask
            name="code"
            onChange={({ target }) => handleChange(target)}
            value={form.code || ''}
            required
            mask={
              form.type === 'cnpj' ? '99.999.999/9999-99' : '999.999.999-99'
            }
            maskChar="_"
          >
            {(inputProps) => (
              <TextField
                {...inputProps}
                fullWidth
                label={form.type === 'cnpj' ? 'CNPJ' : 'CPF'}
                margin="normal"
                variant="outlined"
              />
            )}
          </InputMask>

          <TextField
            fullWidth
            label={form.type === 'cnpj' ? 'Razão Social' : 'Nome Completo'}
            margin="normal"
            name="name"
            onChange={({ target }) => handleChange(target)}
            value={form.name || ''}
            variant="outlined"
            required
          />

          <TextField
            fullWidth
            label="Endereço"
            margin="normal"
            name="address"
            onChange={({ target }) => handleChange(target)}
            value={form.address || ''}
            variant="outlined"
          />
          <InputMask
            type="phone"
            name="phone"
            onChange={({ target }) => handleChange(target)}
            value={form.phone || ''}
            mask="(99)99999-9999"
            maskChar="_"
          >
            {(inputProps) => (
              <TextField
                {...inputProps}
                fullWidth
                label="Telefone"
                margin="normal"
                variant="outlined"
              />
            )}
          </InputMask>

          <TextField
            fullWidth
            label="E-mail"
            margin="normal"
            name="email"
            onChange={({ target }) => handleChange(target)}
            value={form.email || ''}
            variant="outlined"
            type="email"
          />

          <TextField
            fullWidth
            label="Descrição"
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

export default ProviderModal
