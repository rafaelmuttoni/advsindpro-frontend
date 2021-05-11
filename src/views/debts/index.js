import React, { useEffect, useState } from 'react'
import { Box, Container, makeStyles } from '@material-ui/core'

import Page from 'src/components/Page'
import Toolbar from 'src/components/Toolbar'
import { useData } from 'src/context/DataContext'

import DebtsTable from './DebtsTable'
import DebtModal from './DebtModal'
import ReminderDialog from './ReminderDialog'
import DealModal from './DealModal'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}))

const DebtsView = () => {
  const classes = useStyles()
  const { data, condo } = useData()

  const [editingDebt, setEditingDebt] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [remindDebt, setRemindDebt] = useState(false)
  const [dealModal, setDealModal] = useState(false)

  const [filter, setFilter] = useState('')

  const filteredDebts = data
    ? data.debts
        .filter((d) => {
          if (condo) {
            const { condo_id: condoId } = data.residents.find(
              (r) => r.id === d.resident_id
            )
            return condoId === condo.id
          }
          return d
        })
        .filter((debt) => {
          const { name: residentName } = data.residents.find(
            (r) => r.id === debt.resident_id
          )
          const name = residentName.toLowerCase()
          return name.includes(filter.toLowerCase())
        })
    : []

  useEffect(() => {
    !!editingDebt && setIsModalOpen(true)
  }, [editingDebt])

  const closeModal = () => {
    setEditingDebt(false)
    setIsModalOpen(false)
  }

  const openDealModal = (dealData) => {
    setDealModal(dealData)
  }

  return (
    <Page className={classes.root} title="Inadimplências">
      <Container maxWidth={false}>
        <Toolbar
          name="Inadimplência"
          search="Inadimplente"
          filter={filter}
          setFilter={setFilter}
          openModal={setIsModalOpen}
        />
        <Box mt={3}>
          <DebtsTable
            debts={filteredDebts}
            editDebt={setEditingDebt}
            reminder={(event) => setRemindDebt(event)}
            openDealModal={openDealModal}
          />
        </Box>
      </Container>
      <DebtModal
        open={isModalOpen}
        close={closeModal}
        editingDebt={editingDebt}
      />
      <DealModal
        open={Boolean(dealModal)}
        close={() => setDealModal(false)}
        dealData={dealModal}
      />
      <ReminderDialog
        isOpen={Boolean(remindDebt)}
        close={() => setRemindDebt(false)}
        event={remindDebt}
      />
    </Page>
  )
}

export default DebtsView
