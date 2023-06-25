import { Container, Toolbar } from '@mui/material'
import { footerStyle } from '../styles/Footer'
import { FC } from 'react'

const Footer: FC = () => {
  return (
    <Container component="footer" maxWidth={false} sx={footerStyle}>
      <Toolbar>Copyright &copy; 2023 brzoskwi</Toolbar>
    </Container>
  )
}

export default Footer
