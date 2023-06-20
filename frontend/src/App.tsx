import './App.css'
import Login from './pages/Login/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/Register/Register'
import Layout from './components/Layout/Layout'
import NoPage from './pages/NoPage/NoPage'
import { RequireAuth } from 'react-auth-kit'
import Dashboard from './pages/Dashboard/Dashboard'

const App = () => {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/dashboard' element={<RequireAuth loginPath='/login'>
            <Dashboard />
          </RequireAuth>} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
