import { z } from "zod"
import dbConnect from "@/lib/databaseConnect"
import UserModel from "@/models/User.model"
import { userNameValidation } from "@/schemas/signUpSchema"
import { ApiResponse } from "@/utils/ApiResponse"

export async function POST(request: Request) {
  await dbConnect()

  try {
    const { userName, code } = await request.json()

    const decodedUserName = decodeURIComponent(userName)
    const user = await UserModel?.findOne({
      userName: decodedUserName,
    })

    if (!user) {
      return ApiResponse(false, "User not found", 500)
    }

    const isCodeValid = user.verifyCode === code
    const isCodeNotExpired = new Date(user.verifyExpiryCode) > new Date()


    if (isCodeValid && isCodeNotExpired) {
      user.isVerified = true
      await user.save()

      return ApiResponse(true, "Account verified successfully", 201)
      
    } else if (!isCodeNotExpired) {
      return ApiResponse(
        false,
        "Verification code is expired. Please sign in again to get a new code",
        400,
      )
    } else {
      return ApiResponse(false, "Incorrect Verification code", 400)
    }
  } catch (error: any) {
    console.log("fiError verifying user", error)
    return ApiResponse(false, "Error verifying user", error)
  }
}
