import {
  Button,
  Divider,
  Hidden,
  IconButton,
  List,
  SwipeableDrawer,
} from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { FC, FormEvent } from 'react'
import { listStyle, navBarItemStyle } from '../../styles/HamburgerMenu'
import { pageRoutes } from '../../routes/pageRoutes'
import { useIsAuthenticated, useSignOut } from 'react-auth-kit'
import { useNavigate } from 'react-router-dom'

interface Props {
  isOpen: boolean
  setIsOpen: (flag: boolean) => void
}

const HamburgerMenu: FC<Props> = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate()
  const isAuthenticated = useIsAuthenticated()
  const signOut = useSignOut()

  const handleLogout = (e: FormEvent) => {
    e.preventDefault()
    signOut()
    navigate('/login')
  }

  return (
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
          {isAuthenticated() &&
            pageRoutes.map(({ label, href }) => (
              <Button href={href} key={label} sx={navBarItemStyle}>
                {label}
              </Button>
            ))}
          {isAuthenticated() ? (
            <Button onClick={handleLogout} sx={navBarItemStyle}>
              Logout
            </Button>
          ) : (
            <Button onClick={() => navigate('/login')} sx={navBarItemStyle}>
              Login
            </Button>
          )}
        </Hidden>
      </List>
    </SwipeableDrawer>
  )
}

export default HamburgerMenu
