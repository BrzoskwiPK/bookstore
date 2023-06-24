import './styles/App.css'
import Login from './components/Authentication/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './components/Authentication/Register'
import Layout from './components/Layout'
import NoPage from './components/NoPage'
import { RequireAuth } from 'react-auth-kit'
import Dashboard from './components/Dashboard'
import HomePage from './components/HomePage'
import Bookshelf from './components/Bookshelf'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth loginPath="/login">
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/bookshelf"
            element={
              <RequireAuth loginPath="/login">
                <Bookshelf />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
