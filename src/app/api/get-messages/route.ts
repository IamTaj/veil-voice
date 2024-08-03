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
    // return Response.json(
    //   { success: false, message: "Not authenticated" },
    //   { status: 401 },
    // )
    return ApiResponse(false, "Not authenticated", 401)
  }
  const userId = new mongoose.Types.ObjectId(_user._id)
  try {
    const user = await UserModel.aggregate([
      { $match: { _id: userId } },
      { $unwind: "$message" },
      { $sort: { "message.createdAt": -1 } },
      { $group: { _id: "$_id", message: { $push: "$message" } } },
    ]).exec()

    if (!user || user.length === 0) {
      // return Response.json(
      //   { message: "User not found", success: false },
      //   { status: 404 },
      // )
      return ApiResponse(false, "User not found", 404)
    }

    // return Response.json(
    //   { messages: user[0].messages },
    //   {
    //     status: 200,
    //   },
    // )
    return ApiResponse(true, user[0].message, 200)
  } catch (error) {
    console.error("An unexpected error occurred:", error)
    // return Response.json(
    //   { message: "Internal server error", success: false },
    //   { status: 500 },
    // )
    return ApiResponse(false, "Internal server error", 500)
  }
}
