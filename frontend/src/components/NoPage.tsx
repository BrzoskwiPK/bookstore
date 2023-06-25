import {
  Button,
  Container,
  Hidden,
  Typography,
  styled,
  useMediaQuery,
} from '@mui/material'
import { Link } from 'react-router-dom'
import {
  avatarStyle,
  containerStyle,
  headingStyle,
  smallDeviceButton,
  smallDeviceParagraphStyle,
  smallDeviceHeadingStyle,
  paragraphStyle,
  textStyle,
} from '../styles/NoPage'
import { FC } from 'react'

const NoPage: FC = () => {
  const isSmallDevice = useMediaQuery('(max-width: 450px)')

  return (
    <Container disableGutters sx={containerStyle}>
      <Hidden mdDown>
        <div style={avatarStyle}></div>
      </Hidden>
      <div style={textStyle}>
        <Typography
          variant="h3"
          sx={isSmallDevice ? smallDeviceHeadingStyle : headingStyle}
        >
          OOPS! <br /> PAGE NOT FOUND.
        </Typography>
        <Typography
          variant="subtitle2"
          sx={isSmallDevice ? smallDeviceParagraphStyle : paragraphStyle}
        >
          You must have picked the wrong door because I haven't been able to lay
          my eye on the page you've been searching for.
        </Typography>
        <StyledButton
          variant="contained"
          sx={isSmallDevice ? smallDeviceButton : null}
        >
          <Link to="/dashboard">BACK TO HOME</Link>
        </StyledButton>
      </div>
    </Container>
  )
}

export default NoPage

export const StyledButton = styled(Button)({
  backgroundColor: '#5a228b',
  alignSelf: 'flex-start',
  marginTop: '30px',
  '&:hover': {
    backgroundColor: '#752eb3',
  },
})
