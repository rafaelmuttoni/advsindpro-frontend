import React, { useState } from 'react'
import moment from 'moment'
import PerfectScrollbar from 'react-perfect-scrollbar'

import {
  Button,
  Card,
  CardHeader,
  Chip,
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

import { useData } from 'src/context/DataContext'

import { PDFDownloadLink } from '@react-pdf/renderer'
import Letter from 'src/pdf/Letter'

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

const DebtsTable = ({ debts, togglePayment }) => {
  const classes = useStyles()
  const { data } = useData()

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

  const residentData = (id, key) => {
    const resident = data.residents.find((r) => r.id === id)
    return resident[key]
  }

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
                      <TableRow key={index}>
                        <TableCell>
                          {residentData(event.resident_id, 'name')}
                        </TableCell>
                        <TableCell>{event.title}</TableCell>
                        <TableCell>
                          {event.price.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </TableCell>
                        <TableCell>
                          {moment(event.due_date).format('DD/MM/YYYY')}
                        </TableCell>
                        <TableCell>
                          <PDFDownloadLink
                            document={
                              <Letter
                                title={event.tile}
                                resident={residentData(
                                  event.resident_id,
                                  'name'
                                )}
                                address={residentData(
                                  event.resident_id,
                                  'address'
                                )}
                                price={event.price.toLocaleString('pt-BR', {
                                  style: 'currency',
                                  currency: 'BRL',
                                })}
                              />
                            }
                            fileName="letter.pdf"
                          >
                            <Button color="secondary" variant="contained">
                              Gerar PDF
                            </Button>
                          </PDFDownloadLink>
                        </TableCell>
                      </TableRow>
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
                      <TableRow key={index}>
                        <TableCell>
                          {residentData(event.resident_id, 'name')}
                        </TableCell>
                        <TableCell>{event.title}</TableCell>
                        <TableCell>
                          {event.price.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </TableCell>
                        <TableCell>
                          {moment(event.due_date).format('DD/MM/YYYY')}
                        </TableCell>
                        <TableCell>
                          <Button color="secondary" variant="contained">
                            Gerar PDF
                          </Button>
                        </TableCell>
                      </TableRow>
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
