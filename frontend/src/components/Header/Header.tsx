import { AppBar, Container, Toolbar, Typography } from '@mui/material'
import { FC, useState } from 'react'
import { appBarStyle, toolbarStyle } from './Styles'
import { Link } from 'react-router-dom'
import Navigation from '../Navigation/Navigation'
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu'

const Header: FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <AppBar sx={appBarStyle}>
      <Container maxWidth={false}>
        <Toolbar sx={toolbarStyle}>
          <Typography variant="h6" component="h1">
            <Link to="/">_bookstore</Link>
          </Typography>
          <Navigation setIsOpen={setIsOpen} />
        </Toolbar>
      </Container>
      <HamburgerMenu setIsOpen={setIsOpen} isOpen={isOpen} />
    </AppBar>
  )
}

export default Header
