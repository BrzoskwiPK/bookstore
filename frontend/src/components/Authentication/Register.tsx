import {
  Alert,
  Button,
  Container,
  Hidden,
  TextField,
  Typography,
  styled,
  useMediaQuery,
} from '@mui/material'
import { FC, useState } from 'react'
import { AxiosError } from 'axios'
import { Link, useNavigate } from 'react-router-dom'
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
  smallButtonStyle,
} from '../../styles/Register'
import { useSignIn } from 'react-auth-kit'
import { loadUser, loginUser, registerUser } from '../../services/api'

const Register: FC = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [error, setError] = useState('')

  const signIn = useSignIn()
  const navigate = useNavigate()

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault()

    const userData: RegisterRequest = {
      username,
      email,
      password,
      passwordConfirmation,
    }

    const loginData: LoginRequest = {
      email,
      password,
    }

    try {
      setError('')
      const response = await registerUser(userData)
      if (!response.data.error) {
        const loginResponse = await loginUser(loginData)
        if (!loginResponse.data.error) {
          const user = await loadUser(loginResponse.data.accessToken)
          signIn({
            token: loginResponse.data.accessToken,
            expiresIn: 15,
            tokenType: 'Bearer',
            refreshToken: loginResponse.data.refreshToken,
            refreshTokenExpireIn: 30,
            authState: {
              username: user.data.username,
            },
          })

          navigate('/dashboard')
        } else 
            setError(response.data.error)
      } else 
          setError(response.data.error)
    } catch (error) {
      if (error && error instanceof AxiosError)
        setError(error.response?.data.message)
      else if (error && error instanceof Error)
        setError(error.message)
    }
  }

  const isSubmitButtonDisabled =
    !username ||
    !email ||
    !password ||
    !passwordConfirmation ||
    password !== passwordConfirmation
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
            Welcome!
          </Typography>
          <form style={formStyle}>
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
              type="email"
              label="Email"
              variant="outlined"
              value={email}
              onChange={e => setEmail(e.currentTarget.value)}
              sx={isSmallDevice ? smallTextFieldStyle : textFieldStyle}
            />
            <PurpleTextField
              required
              type="password"
              label="Password"
              variant="outlined"
              value={password}
              onChange={e => setPassword(e.currentTarget.value)}
              sx={isSmallDevice ? smallTextFieldStyle : textFieldStyle}
            />
            <PurpleTextField
              required
              type="password"
              label="Confirm Password"
              variant="outlined"
              value={passwordConfirmation}
              onChange={e => setPasswordConfirmation(e.currentTarget.value)}
              sx={isSmallDevice ? smallTextFieldStyle : textFieldStyle}
            />
            <FormButton
              disableRipple
              disabled={isSubmitButtonDisabled}
              variant="contained"
              type="submit"
              sx={isSmallDevice ? smallButtonStyle : null}
              onClick={handleRegister}
            >
              REGISTER
            </FormButton>
            <Typography
              paragraph={true}
              sx={isSmallDevice ? smallParagraphStyle : paragraphStyle}
            >
              Already registered?{' '}
              <Link to="/login" style={linkStyle}>
                Sign in
              </Link>
            </Typography>
          </form>
          {error && <Alert severity="error">{error}</Alert>}
        </div>
      </div>
    </Container>
  )
}

export default Register

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
