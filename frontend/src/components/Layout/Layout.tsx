import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import { FC } from 'react'
import { containerStyle, outletStyle } from './Styles'
import Login from '../../pages/Login/Login'

interface LayoutProps {
  isLoggedIn: boolean
}

const Layout: FC<LayoutProps> = ({ isLoggedIn }) => {
  return (
    <div style={containerStyle}>
      <Header />
      <div style={outletStyle}>
        {isLoggedIn ? <Outlet /> : <Login />}
      </div>
      <Footer />
    </div>
  )
}

export default Layout
