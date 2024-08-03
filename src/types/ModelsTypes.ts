export interface Message extends Document {
    _id?: any
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