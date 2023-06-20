interface LoginRequest {
    email: string
    password: string
}

interface RegisterRequest {
    username: string,
    email: string,
    password: string,
    passwordConfirmation: string
}