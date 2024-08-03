import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/options"
import dbConnect from "@/lib/databaseConnect"
import UserModel from "@/models/User.model"
import { User } from "next-auth"
import { ApiResponse } from "@/utils/ApiResponse"
import mongoose from "mongoose"

export async function GET(request: Request) {
  await dbConnect()

  const session = await getServerSession(authOptions)
  const user: User = session?.user as User

  if (!session?.user || !session) {
    return ApiResponse(false, "Not authenticated", 401)
  }

  const userId = new mongoose.Types.ObjectId(user._id)

  try {
    const user = await UserModel.aggregate([
      { $match: { _id: userId } },
      { $unwind: "$message" },
      { $sort: { "message.createdAt": -1 } },
      { $group: { _id: "$_id", messages: { $push: "$message" } } },
    ])

    console.log("user: ", user)
    if (!user) {
      return ApiResponse(false, "No user found", 404)
    }
    return ApiResponse(true, user?.[0]?.messages, 404)
  } catch (error) {
    console.log("Unexpected Error: ", error)
    return ApiResponse(false, "Not Authenticated", 404)
  }
}
