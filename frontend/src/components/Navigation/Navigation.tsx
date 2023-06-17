import { Button, Hidden, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { FC } from 'react'
import { navBarItemStyle } from '../Header/Styles'
import { pageRoutes } from '../../routes/pageRoutes'

interface Props {
  setIsOpen: (flag: boolean) => void
}

const Navigation: FC<Props> = ({ setIsOpen }) => {
  return (
    <div>
      <Hidden smDown>
        {pageRoutes.map(({ label, href }) => (
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
  )
}

export default Navigation
