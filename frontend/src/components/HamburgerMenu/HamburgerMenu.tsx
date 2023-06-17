import {
  Button,
  Divider,
  Hidden,
  IconButton,
  List,
  SwipeableDrawer,
} from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { FC } from 'react'
import { hamburgerItemStyle, listStyle } from '../Header/Styles'
import { pageRoutes } from '../../routes/pageRoutes'

interface Props {
  isOpen: boolean
  setIsOpen: (flag: boolean) => void
}

const HamburgerMenu: FC<Props> = ({ isOpen, setIsOpen }) => {
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
          {pageRoutes.map(({ label, href }) => (
            <Button href={href} key={label} sx={hamburgerItemStyle}>
              {label}
            </Button>
          ))}
        </Hidden>
      </List>
    </SwipeableDrawer>
  )
}

export default HamburgerMenu
