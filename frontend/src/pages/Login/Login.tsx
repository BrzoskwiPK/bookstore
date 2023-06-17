import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Hidden,
  TextField,
  Typography,
  styled,
  useMediaQuery,
} from '@mui/material'
import axios from 'axios'
import { FC, useState } from 'react'
import {
  boundaryDivStyle,
  containerStyle,
  formDivStyle,
  formStyle,
  headerStyle,
  imageDivStyle,
  textFieldStyle,
  linkStyle,
  paragraphStyle,
  smallParagraphStyle,
  smallTextFieldStyle,
  smallHeaderStyle,
  smallFormControlStyle,
  smallButtonStyle,
} from './Styles'
import { Link } from 'react-router-dom'

const Login: FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault()

  // TBD handling request
  //   axios.post('http://localhost:3003/auth/login', {
  //     username,
  //     password,
  //   })
  }

  const isSubmitButtonDisabled = !username || !password
  const isSmallDevice = useMediaQuery('(max-width: 450px)')

  return (
    <Container maxWidth={false} disableGutters sx={containerStyle}>
      <div style={boundaryDivStyle}>
        <Hidden mdDown>
          <div style={imageDivStyle}></div>
        </Hidden>
        <div style={formDivStyle}>
          <Typography
            variant="h1"
            sx={isSmallDevice ? smallHeaderStyle : headerStyle}
          >
            Hello Again!
          </Typography>
          <form method="post" onSubmit={e => handleLogin(e)} style={formStyle}>
            <PurpleTextField
              required
              label="Username"
              variant="outlined"
              value={username}
              onChange={e => setUsername(e.currentTarget.value)}
              sx={isSmallDevice ? smallTextFieldStyle : textFieldStyle}
            />
            <PurpleTextField
              required
              label="Password"
              variant="outlined"
              value={password}
              onChange={e => setPassword(e.currentTarget.value)}
              sx={isSmallDevice ? smallTextFieldStyle : textFieldStyle}
            />
            <FormGroup>
              <FormControlLabel
                control={
                  <FormattedCheckbox
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                }
                label="Remember me"
                sx={isSmallDevice ? smallFormControlStyle : null}
              />
            </FormGroup>
            <FormButton
              disableRipple
              disabled={isSubmitButtonDisabled}
              variant="contained"
              type="submit"
              sx={isSmallDevice ? smallButtonStyle : null}
            >
              LOGIN
            </FormButton>
            <Typography
              paragraph={true}
              sx={isSmallDevice ? smallParagraphStyle : paragraphStyle}
            >
              Don't have an account yet?{' '}
              <Link to="/register" style={linkStyle}>
                Sign up
              </Link>
            </Typography>
          </form>
        </div>
      </div>
    </Container>
  )
}

export default Login

export const FormattedCheckbox = styled(Checkbox)`
  && {
    color: #5a228b;

    &:checked {
      color: #5a228b;
    }
  }
`

export const FormButton = styled(Button)({
  width: '300px',
  backgroundColor: '#000000',
  '&:hover': {
    backgroundColor: '#1f1f1f',
  },
  '&:active': {
    backgroundColor: '#1f1f1f',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
})

const PurpleTextField = styled(TextField)`
  && {
    & .MuiOutlinedInput-root {
      & fieldset {
        border-color: #5a228b;
      }
      &:hover fieldset {
        border-color: #5a228b;
      }
      &.Mui-focused fieldset {
        border-color: #5a228b;
      }
    }
    & .MuiInputLabel-root {
      color: black;
    }
    &:hover .MuiInputLabel-root {
      color: #5a228b;
    }
    &.Mui-focused .MuiInputLabel-root {
      color: #5a228b;
    }
  }
`
