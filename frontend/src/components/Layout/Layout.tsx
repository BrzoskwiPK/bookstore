import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import { FC } from 'react'
import { containerStyle, outletStyle } from './Styles'


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
