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
import InputMask from 'react-input-mask'

import { useAlert } from 'src/context/AlertContext'
import { useData } from 'src/context/DataContext'
import { parseCondoAddress } from 'src/utils/parsers'
import DeleteButton from 'src/components/DeleteButton'

const ResidentModal = ({ open, close, editingResident }) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const { alert } = useAlert()
  const { data, submit } = useData()

  const [form, setForm] = useState({})

  const closeAndClear = () => {
    setForm({})
    close()
  }

  useEffect(() => {
    !!editingResident &&
      setForm({
        ...editingResident,
        address: parseCondoAddress(
          data.condos.find((c) => c.id === Number(editingResident.condo_id))
        ),
      })
  }, [editingResident])

  const handleChange = (target) => {
    const { name, value } = target

    if (name === 'condo_id') {
      const condo = data.condos.find((c) => c.id === Number(value))
      const condoAddress = parseCondoAddress(condo)
      setForm({ ...form, address: condoAddress, [name]: value })
    } else {
      setForm({ ...form, [name]: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formToSubmit = {
      ...form,
      phone: form.phone.replace(/_|-/g, ''),
    }

    const err = await submit(
      'residents',
      formToSubmit,
      Boolean(editingResident)
    )

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
          {!!editingResident ? 'Editando' : 'Novo'} Condômino
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Nome"
            margin="normal"
            name="name"
            onChange={({ target }) => handleChange(target)}
            value={form.name || ''}
            variant="outlined"
            required
          />

          <InputMask
            name="document"
            onChange={({ target }) => handleChange(target)}
            value={form.document || ''}
            mask="999.999.999-99"
            maskChar="_"
          >
            {(inputProps) => (
              <TextField
                {...inputProps}
                fullWidth
                label="CPF"
                margin="normal"
                variant="outlined"
              />
            )}
          </InputMask>
          <TextField
            select
            variant="outlined"
            margin="normal"
            name="condo_id"
            label="Condomínio"
            type="text"
            fullWidth
            value={form.condo_id || ''}
            onChange={({ target }) => handleChange(target)}
            required
          >
            {data &&
              data.condos.map((condo) => (
                <MenuItem key={condo.id} value={condo.id}>
                  {condo.name}
                </MenuItem>
              ))}
          </TextField>
          <TextField
            fullWidth
            label="Endereço"
            margin="normal"
            name="address"
            value={form.address || ''}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Apartamento"
            margin="normal"
            name="apartment"
            onChange={({ target }) => handleChange(target)}
            value={form.apartment || ''}
            variant="outlined"
            required
          />
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
          {!!editingResident && (
            <DeleteButton
              category="residents"
              id={editingResident.id}
              closeAndClear={closeAndClear}
            />
          )}
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

export default ResidentModal
