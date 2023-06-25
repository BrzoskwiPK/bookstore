import axios from 'axios'

const BASE_URL = 'http://localhost:SERVICE_PORT'
const authPort = '3003'
const booksPort = '3001'

export const loginUser = async (loginData: LoginRequest) =>
  axios.post(`${BASE_URL.replace('SERVICE_PORT', authPort)}/login`, loginData)

export const loadUser = async (accessToken: string) =>
  axios.get(`${BASE_URL.replace('SERVICE_PORT', authPort)}/loadUser`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

export const registerUser = async (registerData: RegisterRequest) =>
  axios.post(
    `${BASE_URL.replace('SERVICE_PORT', authPort)}/register`,
    registerData,
  )

export const fetchBooks = async () =>
  axios.get(`${BASE_URL.replace('SERVICE_PORT', booksPort)}/books`)
