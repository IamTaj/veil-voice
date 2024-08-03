import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/options"
import dbConnect from "@/lib/databaseConnect"
import UserModel from "@/models/User.model"
import { User } from "next-auth"
import { ApiResponse } from "@/utils/ApiResponse"

export async function POST(request: Request) {
  await dbConnect()

  const session = await getServerSession(authOptions)
  const user: User = session?.user as User

  if (!session?.user || !session) {
    return ApiResponse(false, "Not authenticated", 401)
  }

  const userId = user._id
  const { acceptMessages } = await request?.json()

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        isAcceptingMessage: acceptMessages,
      },
      { new: true },
    )

    if (!updatedUser) {
      return ApiResponse(
        false,
        "Failed to update the user status to accept messages",
        400,
      )
    }

    return ApiResponse(
      true,
      "Message acceptance status updated successfully",
      200,
      updatedUser,
    )
  } catch (error: any) {
    console.log(
      "Failed to update the user status to accept messages hehe",
      error,
    )
    return ApiResponse(
      false,
      "Failed to update the user status to accept messages",
      500,
    )
  }
}

export async function GET(request: Request) {
  await dbConnect()

  const session = await getServerSession(authOptions)
  const user: User = session?.user as User

  if (!session?.user || !session) {
    return ApiResponse(false, "Not authenticated", 401)
  }

  const userId = user?._id
  try {
    const foundUser = await UserModel?.findById(userId)

    if (!foundUser) {
      return ApiResponse(false, "User not found", 404)
    }
    return ApiResponse(
      true,
      "User found",
      200,
      {},
      foundUser?.isAcceptingMessage,
    )
  } catch (error: any) {
    console.log("Failed to get the user status to accept messages", error)
    return ApiResponse(false, "Error in getting user status", 500)
  }
}
