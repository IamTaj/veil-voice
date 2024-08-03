import dbConnect from "@/lib/databaseConnect"
import UserModel from "@/models/User.model"
import { ApiResponse } from "@/utils/ApiResponse"
import { Message } from "@/types/ModelsTypes"

export async function POST(request: Request) {
  await dbConnect()

  const { userName, content } = await request.json()

  try {
    const user = await UserModel.findOne({ userName }).exec()

    if (!user) {
      return ApiResponse(false, "User not found", 404)
    }

    if (!user.isAcceptingMessage) {
      return ApiResponse(false, "User is not accepting messages", 402)
    }

    const newMessage = { content, createdAt: new Date() }

    user.userMessage.push(newMessage as Message)
    await user.save()
    return ApiResponse(true, "Message sent successfully", 200)
  } catch (error) {
    console.log("Unexpected Error: ", error)
    return ApiResponse(false, "Not Authenticated", 404)
  }
}
