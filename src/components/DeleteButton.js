import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'
import { useState } from 'react'

import { useAlert } from 'src/context/AlertContext'
import { useData } from 'src/context/DataContext'

export default function DeleteButton({ category, id, closeAndClear }) {
  const { alert } = useAlert()
  const { erase } = useData()

  const [isOpen, setIsOpen] = useState(false)

  const handleDelete = async () => {
    const err = await erase(category, id)

    if (err) {
      alert('Ocorreu um erro na sua solicitação', 'error')
    } else {
      alert()
      setIsOpen(false)
      closeAndClear()
    }
  }

  return (
    <>
      <Button
        variant="contained"
        style={{ marginRight: 'auto', background: '#e86c6c', color: '#fff' }}
        onClick={() => setIsOpen(true)}
      >
        Apagar
      </Button>
      <Dialog open={isOpen} onClose={() => setIsOpen(!isOpen)}>
        <DialogTitle>Você tem certeza?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Todos os dados relacionados serão apagados. Essa ação é
            irreversível.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsOpen(!isOpen)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDelete} color="primary" variant="contained">
            Quero apagar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
