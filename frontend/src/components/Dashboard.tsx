import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  styled,
} from '@mui/material'
import { useAuthUser } from 'react-auth-kit'
import { containerStyle, listStyle } from '../styles/Dashboard'
import { Link } from 'react-router-dom'
import { FC } from 'react'

const Dashboard: FC = () => {
  const authData = useAuthUser()

  return (
    <Container disableGutters sx={containerStyle} maxWidth={false}>
      <Paper elevation={3} sx={{ padding: '20px', height: '100%' }}>
        <Grid container spacing={3} sx={{ width: '100%', height: '100%' }}>
          <Grid item xs={12}>
            <Typography variant="h4" align="center" gutterBottom>
              Welcome to Our Bookstore, <strong>{authData()?.username}</strong>!
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography align="center" gutterBottom>
              Step into a realm of captivating stories and limitless knowledge
              at our bookstore. <br /> Whether you're a bookworm or simply
              looking for your next great read, we have a wide selection of
              books waiting to be explored.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" align="center" gutterBottom>
              Why should you choose us?
            </Typography>
          </Grid>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              mx: 'auto',
            }}
          >
            <Typography variant="body1" sx={{ mb: 3, textAlign: 'center' }}>
              <strong>
                These are our five distinguishing market characteristics:
              </strong>
              <ol style={listStyle}>
                <li>A curated collection</li>
                <li>Expert Reccomendations</li>
                <li>Convenient Online Shopping</li>
                <li>Secure and Reliable</li>
                <li>Special Deals and Discounts</li>
              </ol>
            </Typography>
          </Box>
          <Grid item xs={12}>
            <Typography variant="body1" align="center">
              Embark on a book-buying adventure today and let the magic of
              storytelling ignite your imagination!
            </Typography>
          </Grid>
          <StyledButton variant="contained" sx={{ margin: '0 auto' }}>
            <Link to="/bookshelf">EXPLORE BOOKS</Link>
          </StyledButton>
        </Grid>
      </Paper>
    </Container>
  )
}

export default Dashboard

export const StyledButton = styled(Button)({
  backgroundColor: '#5a228b',
  alignSelf: 'flex-start',
  marginTop: '30px',
  '&:hover': {
    backgroundColor: '#752eb3',
  },
})
