import React, { useState } from 'react'
import moment from 'moment'
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
  makeStyles,
} from '@material-ui/core'

import EditIcon from '@material-ui/icons/Edit'

import CalendarIcon from '@material-ui/icons/CalendarToday'
import EnergyIcon from '@material-ui/icons/Power'
import WaterIcon from '@material-ui/icons/Waves'
import GasIcon from '@material-ui/icons/Whatshot'

import getInitials from 'src/utils/getInitials'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  avatar: {
    background: theme.palette.primary.main,

    cursor: 'pointer',
    '&:hover': {
      filter: 'brightness(0.9)',
    },
  },
  name: {
    textOverflow: 'ellipsis',
    maxWidth: '100%',
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': '2',
    '-webkit-box-orient': 'vertical',
  },
  divider: {
    marginBottom: theme.spacing(2),
  },
  statsItem: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    marginBottom: theme.spacing(2),
  },
  statsIcon: {
    marginRight: theme.spacing(1),
  },
}))

const CondoCard = ({ condo, editCondo }) => {
  const classes = useStyles()

  const [isEditVisible, setIsEditVisible] = useState(false)

  return (
    <Card className={classes.root}>
      <CardContent>
        <Box display="flex" justifyContent="center" mb={2}>
          <Avatar
            alt="Condo"
            variant="circular"
            className={classes.avatar}
            onMouseEnter={() => setIsEditVisible(true)}
            onMouseLeave={() => setIsEditVisible(false)}
            onClick={() => editCondo(condo)}
          >
            {isEditVisible ? (
              <EditIcon color="#fff" />
            ) : (
              getInitials(condo.name)
            )}
          </Avatar>
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
          className={classes.name}
        >
          {condo.name}
        </Typography>

        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
          gutterBottom
        >
          {condo.code ? condo.code : <i>N??o informado</i>}
        </Typography>

        <Typography align="center" color="textPrimary" variant="body1">
          {condo.address}
        </Typography>
      </CardContent>
      <Box flexGrow={1} />
      <Divider className={classes.divider} />
      <Box className={classes.statsItem}>
        <CalendarIcon className={classes.statsIcon} color="action" />
        <Typography color="textSecondary" display="inline" variant="body2">
          S??ndico desde: {moment(condo.initial_date).format('MM/YYYY')}
        </Typography>
      </Box>

      <Box className={classes.statsItem}>
        <EnergyIcon className={classes.statsIcon} color="action" />
        <Typography color="textSecondary" display="inline" variant="body2">
          N??mero UC: {condo.energy ? condo.energy : <i>N??o informado</i>}
        </Typography>
      </Box>

      <Box className={classes.statsItem}>
        <WaterIcon className={classes.statsIcon} color="action" />
        <Typography color="textSecondary" display="inline" variant="body2">
          Ramal de ??gua: {condo.water ? condo.water : <i>N??o informado</i>}
        </Typography>
      </Box>

      <Box className={classes.statsItem}>
        <GasIcon className={classes.statsIcon} color="action" />
        <Typography color="textSecondary" display="inline" variant="body2">
          C??digo do cliente: {condo.gas ? condo.gas : <i>N??o informado</i>}
        </Typography>
      </Box>
    </Card>
  )
}

export default CondoCard
