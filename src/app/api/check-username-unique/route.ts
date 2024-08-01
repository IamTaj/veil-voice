import { z } from "zod"
import dbConnect from "@/lib/databaseConnect"
import UserModel from "@/models/User.model"
import { userNameValidation } from "@/schemas/signUpSchema"
import { ApiResponse } from "@/utils/ApiResponse"

const UserNameQuerySchema = z.object({
  userName: userNameValidation,
})

export async function GET(request: Request) {
  await dbConnect()

  try {
    const { searchParams } = new URL(request.url)

    const queryParam = {
      userName: searchParams.get("username"),
    }

    //validate with zod
    const result = UserNameQuerySchema.safeParse(queryParam)
    if (!result?.success) {
      const userNameErrors = result?.error?.format().userName?._errors || []

      return ApiResponse(
        false,
        userNameErrors?.length > 0
          ? userNameErrors.join(",")
          : "Invalid query parameters",
        400,
      )
    }
    const { userName } = result.data
    if (userName) {
      const existingUser = await UserModel.findOne({
        userName,
        isVerified: true,
      })
      if (existingUser) {
        return ApiResponse(false, "Username is already taken", 201)
      }
      return ApiResponse(false, "Username is unique", 201)
    }
  } catch (error: any) {
    console.error("Error checking username", error)
    return ApiResponse(false, "Error checking username", 500)
  }
}
