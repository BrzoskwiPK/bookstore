import { CSSProperties } from 'react'

export const containerStyle: CSSProperties = {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

export const boundaryDivStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: '2px solid #121212',
  height: '70%',
  width: '80%',
}

export const imageDivStyle: CSSProperties = {
  width: '50%',
  height: '100%',
  backgroundImage: 'url(../../../assets/city2.jpg)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
}

export const formDivStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '50%',
  height: '100%',
}

export const formStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'space-between',
  justifyContent: 'center',
}

export const headerStyle: CSSProperties = {
  fontSize: '28px',
  marginBottom: '15px',
  fontWeight: 'bold',
}

export const textFieldStyle: CSSProperties = {
  marginBottom: '10px',
}

export const linkStyle: CSSProperties = {
  color: '#5a228b',
  fontWeight: 'bold',
}

export const paragraphStyle: CSSProperties = {
  marginTop: '5px',
}

export const smallParagraphStyle: CSSProperties = {
  ...paragraphStyle,
  textAlign: 'center',
}

export const smallHeaderStyle: CSSProperties = {
  ...headerStyle,
  textAlign: 'center',
}

export const smallTextFieldStyle: CSSProperties = {
  ...textFieldStyle,
  width: '180px',
  alignSelf: 'center',
  margin: '10px 0',
}

export const smallFormControlStyle: CSSProperties = {
  alignSelf: 'center',
  margin: '10px 0',
}

export const smallButtonStyle: CSSProperties = {
  width: '180px',
  marginTop: '10px',
  marginBottom: '10px',
}

export const errorStyle: CSSProperties = {
  color: 'red',
  fontWeight: 'bold',
}
