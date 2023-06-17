import { Button, Container, Hidden, TextField, Typography, styled, useMediaQuery } from "@mui/material"
import { FC, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
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
} from './Styles'

const Register: FC = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault()
    
    // TBD handling request
    // axios.post('http://localhost:3003/auth/register', {
    //   username,
    //   email,
    //   password,
    // })
  }
  const isSubmitButtonDisabled = !username || !email || !password || !confirmPassword
  const isSmallDevice = useMediaQuery('(max-width: 450px)')

  return (
    <Container maxWidth={false} disableGutters sx={containerStyle}>
      <div style={boundaryDivStyle}>
        <Hidden mdDown>
          <div style={imageDivStyle}></div>
        </Hidden>
        <div style={formDivStyle}>
          <Typography variant='h1' sx={isSmallDevice ? smallHeaderStyle : headerStyle}>
            Welcome!
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
              type='email'
              label='Email'
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
            <PurpleTextField
              required
              type='password'
              label="Confirm Password"
              variant="outlined"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.currentTarget.value)}
              sx={isSmallDevice ? smallTextFieldStyle : textFieldStyle}
            />
            <FormButton
              disableRipple
              disabled={isSubmitButtonDisabled}
              variant="contained"
              type="submit"
              sx={isSmallDevice ? smallButtonStyle : null}
            >
              REGISTER
            </FormButton>
            <Typography paragraph={true} sx={isSmallDevice ? smallParagraphStyle : paragraphStyle}>
              Already registered? <Link to="/login" style={linkStyle}>Sign in</Link>
            </Typography>
          </form>
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