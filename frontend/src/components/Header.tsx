import { AppBar, Container, Toolbar, Typography } from '@mui/material'
import { FC, useState } from 'react'
import { appBarStyle, toolbarStyle } from '../styles/Header'
import { Link } from 'react-router-dom'
import Navigation from './Navigation/Navigation'
import HamburgerMenu from './Navigation/HamburgerMenu'
import { useIsAuthenticated } from 'react-auth-kit'

const Header: FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const isAuthenticated = useIsAuthenticated()

  return (
    <AppBar sx={appBarStyle}>
      <Container maxWidth={false}>
        <Toolbar sx={toolbarStyle}>
          <Typography variant="h6" component="h1">
            {isAuthenticated() ? (
              <Link to="/dashboard">_bookstore</Link>
            ) : (
              <Link to="/">_bookstore</Link>
            )}
          </Typography>
          <Navigation setIsOpen={setIsOpen} />
        </Toolbar>
      </Container>
      <HamburgerMenu setIsOpen={setIsOpen} isOpen={isOpen} />
    </AppBar>
  )
}

export default Header
