import dbConnect from "@/lib/databaseConnect"
import UserModel from "@/models/User.model"
import { ApiResponse } from "@/utils/ApiResponse"
import { SendVerificationEmail } from "@/utils/emailVerifier"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  await dbConnect()

  try {
    const { userName, email, password, fullName } = await request.json()

    const existingUserVerifiedByUserName = await UserModel.findOne({
      userName,
      isVerified: true,
    })

    if (existingUserVerifiedByUserName) {
      return ApiResponse(false, "Username is already taken", 400)
    }

    const existingUserVerifiedByEmail = await UserModel.findOne({
      email,
    })

    const verifyCodeOtp = Math.floor(100000 + Math.random() * 900000).toString()

    if (existingUserVerifiedByEmail) {
      if (existingUserVerifiedByEmail.isVerified) {
        return ApiResponse(false, "User already exist with this email", 400)
      } else {
        const hashPassword = await bcrypt.hash(password, 10)
        existingUserVerifiedByEmail.password = hashPassword
        existingUserVerifiedByEmail.verifyCode = verifyCodeOtp
        existingUserVerifiedByEmail.verifyExpiryCode = new Date(
          Date.now() + 3600000,
        )
        await existingUserVerifiedByEmail.save()
      }
    } else {
      const hashPassword = await bcrypt.hash(password, 10)
      const expiryDate = new Date()
      expiryDate.setHours(expiryDate.getHours() + 1)

      const newUser = new UserModel({
        email,
        userName,
        fullName,
        password: hashPassword,
        verifyCode: verifyCodeOtp,
        verifyExpiryCode: expiryDate,
        isVerified: false,
        isAcceptingMessage: true,
        message: [],
      })

      await newUser.save()
    }

    //send verification email
    const emailResponse = await SendVerificationEmail(
      email,
      userName,
      verifyCodeOtp,
    )

    if (!emailResponse?.success) {
      return ApiResponse(false, emailResponse?.message, 500)
    }
    return ApiResponse(true, "User Registered Successfully", 200)
  } catch (error: any) {
    console.error("Error in registering user ", error)
  }
  return ApiResponse(false, "Error Registering User", 500)
}
