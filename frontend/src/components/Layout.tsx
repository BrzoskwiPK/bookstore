import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import { FC } from 'react'
import { containerStyle, outletStyle } from '../styles/Layout'

const Layout: FC = () => {
  return (
    <div style={containerStyle}>
      <Header />
      <div style={outletStyle}>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Layout
