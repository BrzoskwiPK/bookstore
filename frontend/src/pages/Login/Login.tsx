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
import axios, { AxiosError } from 'axios'
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
import { Link, useNavigate } from 'react-router-dom'
import { useSignIn } from 'react-auth-kit'

const Login: FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')

  const signIn = useSignIn()
  const navigate = useNavigate()

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      const userData: LoginRequest = {
        email,
        password
      }

      const response = await axios.post('http://localhost:3003/login', userData)

      const user = await axios.get('http://localhost:3003/loadUser', {
        headers: {
          'Authorization': `Bearer ${response.data.accessToken}`
        }
      })

      signIn({
        token: response.data.accessToken,
        expiresIn: 15,
        tokenType: 'Bearer',
        refreshToken: response.data.refreshToken,
        authState: {
          username: user.data.username
        }
      })

      navigate('/dashboard')
    } catch (error) {
      if (error && error instanceof AxiosError) 
        setError(error.response?.data.message)
      
      else if (error && error instanceof Error)
        setError(error.message)
    }
  }

  const isSubmitButtonDisabled = !email || !password
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
          <form style={formStyle}>
            <PurpleTextField
              required
              label="Email"
              variant="outlined"
              value={email}
              onChange={e => setEmail(e.currentTarget.value)}
              sx={isSmallDevice ? smallTextFieldStyle : textFieldStyle}
            />
            <PurpleTextField
              required
              type='password'
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
              onClick={handleLogin}
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
          {error && <Typography paragraph={true}>{error}</Typography>}
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
