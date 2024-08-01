export interface Message extends Document {
    content: string
    createdAt: Date
}

export interface User extends Document {
    email: string
    userName: string
    fullName: string
    avatar: string
    password: string
    verifyCode: string
    verifyExpiryCode: Date
    isVerified: boolean
    isAcceptingMessage: boolean
    message: Message[]
    refreshToken: string
    accessToken: string
}