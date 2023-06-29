import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { AuthProvider, createRefresh } from 'react-auth-kit'
import { refreshAuthToken } from './services/api.ts'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store.ts'
import { PersistGate } from 'redux-persist/integration/react'

const refreshToken = createRefresh({
  interval: 120,
  refreshApiCallback: async ({ authToken, refreshToken }) => {
    try {
      const response = await refreshAuthToken(authToken, refreshToken)
      return {
        isSuccess: true,
        newAuthToken: response.data.accessToken,
        newAuthTokenExpireIn: 120,
        newRefreshToken: refreshToken,
        newRefreshTokenExpiresIn: 120,
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
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider
          authType={'cookie'}
          authName={'_auth'}
          cookieDomain={window.location.hostname}
          cookieSecure={window.location.protocol === 'https:'}
          refresh={refreshToken}
        >
          <App />
        </AuthProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
