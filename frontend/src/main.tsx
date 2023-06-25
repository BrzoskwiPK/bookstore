import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { AuthProvider, createRefresh } from 'react-auth-kit'
import axios from 'axios'

const refreshToken = createRefresh({
  interval: 30,
  refreshApiCallback: async ({
    authToken,
    refreshToken,
    refreshTokenExpiresAt,
  }) => {
    try {
      const response = await axios.post(
        'http://localhost:3003/refreshToken',
        { refresh: refreshToken },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        },
      )

      console.log(refreshTokenExpiresAt)
      return {
        isSuccess: true,
        newAuthToken: response.data.accessToken,
        newAuthTokenExpireIn: 30,
        newRefreshToken: refreshToken,
        newRefreshTokenExpiresIn: 60,
      }
    } catch (error) {
      console.error(error)
      return {
        isSuccess: false,
        newAuthToken: '',
        newRefreshToken: '',
        newRefreshTokenExpiresIn: 0,
      }
    }
  },
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider
      authType={'cookie'}
      authName={'_auth'}
      cookieDomain={window.location.hostname}
      cookieSecure={window.location.protocol === 'https:'}
      refresh={refreshToken}
    >
      <App />
    </AuthProvider>
  </React.StrictMode>,
)
