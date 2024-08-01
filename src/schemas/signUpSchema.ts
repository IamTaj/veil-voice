import {z} from 'zod'

export const userNameValidation = z
    .string()
    .min(2, "Username should be greater than 2 characters")
    .max(20, "Username must be no more than 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username should not contains special character")



export const SignUpSchema = z.object({
    userName: userNameValidation,
    email: z.string().email({message:"Invalid email address"}),
    password: z.string().min(6,{message:"Password should be at least greater than 6 character"})
})