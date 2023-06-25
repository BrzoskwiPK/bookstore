interface LoginRequest {
  email: string
  password: string
}

interface RegisterRequest {
  username: string
  email: string
  password: string
  passwordConfirmation: string
}

interface Book {
  title: string
  author: string
  availability: string
  description: string
  price: number
  rate: number
}
