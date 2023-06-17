import { Container, Toolbar } from '@mui/material'
import { footerStyle } from './Styles'
import { FC } from 'react'

const Footer: FC = () => {
  return (
    <Container maxWidth={false} sx={footerStyle}>
      <Toolbar>Copyright &copy; 2023 brzoskwi</Toolbar>
    </Container>
  )
}

export default Footer
