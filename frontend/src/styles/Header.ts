import { CSSProperties } from 'react'

export const appBarStyle: CSSProperties = {
  backgroundColor: '#5a228b',
  height: '7vh',
}

export const toolbarStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
}

export const listStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'black',
  minWidth: '250px',
}

export const navBarItemStyle: CSSProperties = {
  fontWeight: 700,
  fontSize: '15px',
  marginLeft: '25px',
  color: 'white',
  textDecoration: 'none',
}

export const hamburgerItemStyle: CSSProperties = {
  fontWeight: 700,
  fontSize: '18px',
  marginLeft: '25px',
  color: 'black',
  textDecoration: 'none',
}
