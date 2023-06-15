import {
  AppBar,
  Container,
  Hidden,
  Toolbar,
  Typography,
  SwipeableDrawer,
  Divider,
  List,
  Button,
} from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from 'react'
import { IconButton } from '@mui/material'
import {
  appBarStyle,
  hamburgerItemStyle,
  listStyle,
  navBarItemStyle,
  toolbarStyle,
} from './Styles'

const navItems = [
  {
    label: 'Login',
    href: '/login',
  },
  {
    label: 'Search',
    href: '/search',
  },
  {
    label: 'My Cart',
    href: '/cart',
  },
]

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <AppBar position="sticky" sx={appBarStyle}>
      <Container maxWidth="xl">
        <Toolbar sx={toolbarStyle}>
          <Typography variant="h6" component="h1">
            _bookstore
          </Typography>
          <div>
            <Hidden smDown>
              {navItems.map(({ label, href }) => (
                <Button href={href} key={label} sx={navBarItemStyle}>
                  {label}
                </Button>
              ))}
            </Hidden>
            <Hidden smUp>
              <IconButton onClick={() => setIsOpen(true)}>
                <MenuIcon className="hamburgerIcon" />
              </IconButton>
            </Hidden>
          </div>
        </Toolbar>
      </Container>
      <SwipeableDrawer
        anchor="right"
        open={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
      >
        <div
          onClick={() => setIsOpen(false)}
          onKeyDown={() => setIsOpen(false)}
          role="button"
          tabIndex={0}
        >
          <IconButton>
            <ChevronRightIcon />
          </IconButton>
        </div>
        <Divider />
        <List sx={listStyle}>
          <Hidden>
            {navItems.map(({ label, href }) => (
              <Button href={href} key={label} sx={hamburgerItemStyle}>
                {label}
              </Button>
            ))}
          </Hidden>
        </List>
      </SwipeableDrawer>
    </AppBar>
  )
}

export default Header