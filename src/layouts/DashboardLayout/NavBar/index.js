import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles,
} from '@material-ui/core'
import {
  Calendar as CalendarIcon,
  DollarSign as DollarIcon,
  Home as HomeIcon,
  Settings as SettingsIcon,
  Tag as TagIcon,
  Users as UsersIcon,
} from 'react-feather'
import NavItem from './NavItem'
import { useData } from 'src/context/DataContext'
import getInitials from 'src/utils/getInitials'

const items = [
  {
    href: '/',
    icon: HomeIcon,
    title: 'Início',
  },
  {
    href: '/calendar',
    icon: CalendarIcon,
    title: 'Agenda',
  },
  {
    href: '/residents',
    icon: UsersIcon,
    title: 'Condôminos',
  },
  {
    href: '/providers',
    icon: TagIcon,
    title: 'Prestadores',
  },
  {
    href: '/debts',
    icon: DollarIcon,
    title: 'Inadimplências',
  },
  {
    href: '/settings',
    icon: SettingsIcon,
    title: 'Configurações',
  },
]

const useStyles = makeStyles((theme) => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)',
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64,
    marginBottom: theme.spacing(1),
  },
  name: {
    textOverflow: 'ellipsis',
    maxWidth: '100%',
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': '2',
    '-webkit-box-orient': 'vertical',
  },
}))

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles()
  const location = useLocation()
  const { condo, openDrawer } = useData()

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Avatar className={classes.avatar} onClick={openDrawer}>
          {condo ? getInitials(condo.name) : 'TDS'}
        </Avatar>

        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
          align="center"
        >
          {condo ? condo.name : 'Todos Condomínios'}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
    </Box>
  )

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  )
}

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
}

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
}

export default NavBar
