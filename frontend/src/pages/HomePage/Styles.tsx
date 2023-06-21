import { CSSProperties } from 'react'

export const containerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
}

export const avatarStyle: CSSProperties = {
  width: '60%',
  height: '100%',
  backgroundImage: 'url(../../../assets/sulley.webp)',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover'
}

export const textStyle: CSSProperties = {
  width: '40%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
}

export const paragraphStyle: CSSProperties = {
  fontWeight: 'bold',
  fontSize: '20px',
  textAlign: 'justify',
  marginTop: '20px',
}

export const headingStyle: CSSProperties = {
  width: '100%',
  fontWeight: 'bold',
}

export const smallDeviceHeadingStyle: CSSProperties = {
  ...headingStyle,
  width: '100%',
  fontWeight: 'bold',
  textAlign: 'center',
}

export const smallDeviceParagraphStyle: CSSProperties = {
  ...paragraphStyle,
  fontWeight: 'bold',
  fontSize: '20px',
  textAlign: 'center',
  marginTop: '20px',
}

export const smallDeviceButton: CSSProperties = {
  alignSelf: 'center',
}
