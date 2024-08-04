import mongoose from "mongoose"
import { User } from "next-auth"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/options"
import UserModel from "@/models/User.model"
import dbConnect from "@/lib/databaseConnect"
import { ApiResponse } from "@/utils/ApiResponse"

export async function GET(request: Request) {
  await dbConnect()
  const session = await getServerSession(authOptions)
  const _user: User = session?.user as User

  if (!session || !_user) {
    return ApiResponse(false, "Not authenticated", 401)
  }
  const userId = new mongoose.Types.ObjectId(_user._id)
  try {
    const isMessagePresent = await UserModel.findById(_user._id)
    if (isMessagePresent?.userMessage?.length > 0) {
      const user = await UserModel.aggregate([
        { $match: { _id: userId } },
        { $unwind: "$userMessage" },
        { $sort: { "userMessage.createdAt": -1 } },
        { $group: { _id: "$_id", userMessage: { $push: "$userMessage" } } },
      ]).exec()

      if (!user || user.length === 0) {
        return ApiResponse(false, "User not found", 404)
      }
      return ApiResponse(
        true,
        "User Message Fetched Successfully",
        200,
        user[0].userMessage,
      )
    } else {
      return ApiResponse(true, "Currently you didn't received any message", 201)
    }
  } catch (error) {
    console.error("An unexpected error occurred:", error)

    return ApiResponse(false, "Internal server error", 500)
  }
}
