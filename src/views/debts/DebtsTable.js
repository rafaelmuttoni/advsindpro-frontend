import React, { useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'

import {
  Card,
  CardHeader,
  Divider,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core'

import DebtRow from './DebtRow'

const useStyles = makeStyles((theme) => ({
  topCard: {
    marginBottom: theme.spacing(3),
  },
  head: {
    background: theme.palette.secondary.main,
    color: '#fff',
  },
  paper: {
    height: 50,
    padding: 15,
    fontWeight: 400,
  },
}))

const DebtsTable = ({ debts, editDebt, reminder, openDealModal }) => {
  const classes = useStyles()
  const [anchorEls, setAnchorEls] = React.useState([])

  const handleActionClick = (id, event) => {
    let anchorElsCopy = [...anchorEls]
    anchorElsCopy[id] = event.target
    setAnchorEls(anchorElsCopy)
  }

  const handleActionClose = (id) => {
    let anchorElsCopy = [...anchorEls]
    anchorElsCopy[id] = null
    setAnchorEls(anchorElsCopy)
  }

  const [topPagination, setTopPagination] = useState({
    limit: 10,
    page: 0,
  })

  const [bottomPagination, setBottomPagination] = useState({
    limit: 10,
    page: 0,
  })

  const handleLimitChange = (event, table) => {
    if (table === 'top') {
      setTopPagination({
        ...topPagination,
        limit: event.target.value,
      })
    }

    if (table === 'bottom') {
      setBottomPagination({
        ...bottomPagination,
        limit: event.target.value,
      })
    }
  }

  const handlePageChange = (event, newPage, table) => {
    if (table === 'top') {
      setTopPagination({
        ...topPagination,
        page: newPage,
      })
    }

    if (table === 'bottom') {
      setBottomPagination({
        ...bottomPagination,
        page: newPage,
      })
    }
  }

  const openPayments = debts.filter(({ payment_status }) => !payment_status)

  const confirmedPayments = debts.filter(({ payment_status }) => payment_status)

  return (
    <>
      <Card className={classes.topCard}>
        <CardHeader title="Pagamentos em Aberto" className={classes.head} />
        <Divider />
        {openPayments.length === 0 ? (
          <Paper className={classes.paper}>Nenhum resultado encontrado.</Paper>
        ) : (
          <>
            <PerfectScrollbar>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Condômino</TableCell>
                    <TableCell>Título</TableCell>
                    <TableCell>Valor</TableCell>
                    <TableCell>Vencimento</TableCell>
                    <TableCell>Gerar PDF</TableCell>
                    <TableCell>Gerar PDF</TableCell>
                    <TableCell>Opções</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {openPayments
                    .sort((a, b) => new Date(a.date) - new Date(b.date))
                    .slice(
                      topPagination.limit * topPagination.page,
                      topPagination.limit * (topPagination.page + 1)
                    )
                    .map((event, index) => (
                      <DebtRow
                        key={index}
                        event={event}
                        editDebt={editDebt}
                        reminder={reminder}
                        anchorEl={anchorEls[event.id]}
                        openMenu={handleActionClick}
                        closeMenu={handleActionClose}
                        openDealModal={openDealModal}
                      />
                    ))}
                </TableBody>
              </Table>
            </PerfectScrollbar>
            <TablePagination
              component="div"
              count={openPayments.length}
              onChangeRowsPerPage={(e) => handleLimitChange(e, 'top')}
              onChangePage={(e, newPage) => handlePageChange(e, newPage, 'top')}
              page={topPagination.page}
              rowsPerPage={topPagination.limit}
              rowsPerPageOptions={[5, 10, 25]}
              labelRowsPerPage="Linhas"
              labelDisplayedRows={({ from, to, count }) =>
                `${from} a ${to} de ${count}`
              }
            />
          </>
        )}
      </Card>
      <Card>
        <CardHeader title="Pagamentos Confirmados" className={classes.head} />
        <Divider />
        {confirmedPayments.length === 0 ? (
          <Paper className={classes.paper}>Nenhum resultado encontrado.</Paper>
        ) : (
          <>
            <PerfectScrollbar>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Condômino</TableCell>
                    <TableCell>Título</TableCell>
                    <TableCell>Valor</TableCell>
                    <TableCell>Vencimento</TableCell>
                    <TableCell>Gerar PDF</TableCell>
                    <TableCell>Gerar PDF</TableCell>
                    <TableCell>Opções</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {confirmedPayments
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .slice(
                      bottomPagination.limit * bottomPagination.page,
                      bottomPagination.limit * (bottomPagination.page + 1)
                    )
                    .map((event, index) => (
                      <DebtRow
                        key={index}
                        event={event}
                        editDebt={editDebt}
                        reminder={reminder}
                        anchorEl={anchorEls[event.id]}
                        openMenu={handleActionClick}
                        closeMenu={handleActionClose}
                        openDealModal={openDealModal}
                      />
                    ))}
                </TableBody>
              </Table>
            </PerfectScrollbar>
            <TablePagination
              component="div"
              count={confirmedPayments.length}
              onChangeRowsPerPage={(e) => handleLimitChange(e, 'bottom')}
              onChangePage={(e, newPage) =>
                handlePageChange(e, newPage, 'bottom')
              }
              page={bottomPagination.page}
              rowsPerPage={bottomPagination.limit}
              rowsPerPageOptions={[5, 10, 25]}
              labelRowsPerPage="Linhas"
              labelDisplayedRows={({ from, to, count }) =>
                `${from} a ${to} de ${count}`
              }
            />
          </>
        )}
      </Card>
    </>
  )
}

export default DebtsTable
