import { Button, Hidden, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { FC } from 'react'
import { navBarItemStyle } from '../../styles/Header'
import { pageRoutes } from '../../routes/pageRoutes'
import { useIsAuthenticated, useSignOut } from 'react-auth-kit'
import { useNavigate } from 'react-router-dom'

interface Props {
  setIsOpen: (flag: boolean) => void
}

const Navigation: FC<Props> = ({ setIsOpen }) => {
  const signOut = useSignOut()
  const navigate = useNavigate()
  const isAuthenticated = useIsAuthenticated()
  
  const handleLogout = (e: React.FormEvent) => {
    e.preventDefault()
    signOut()
    navigate('/login')
  }

  return (
    <div>
      <Hidden smDown>
        {isAuthenticated() && pageRoutes.map(({ label, href }) => (
          <Button href={href} key={label} sx={navBarItemStyle}>
            {label}
          </Button>
        ))}
        {isAuthenticated() ?
         <Button onClick={handleLogout} sx={navBarItemStyle}>Logout</Button> :
         <Button onClick={() => navigate('/login')} sx={navBarItemStyle}>Login</Button>}
      </Hidden>
      <Hidden smUp>
        <IconButton onClick={() => setIsOpen(true)}>
          <MenuIcon className="hamburgerIcon" />
        </IconButton>
      </Hidden>
    </div>
  )
}

export default Navigation
