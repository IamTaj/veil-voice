import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/options"
import dbConnect from "@/lib/databaseConnect"
import UserModel from "@/models/User.model"
import { User } from "next-auth"
import { ApiResponse } from "@/utils/ApiResponse"

export async function DELETE(
  request: Request,
  { params }: { params: { messageid: string } },
) {
  const messageId = params.messageid
  await dbConnect()

  const session = await getServerSession(authOptions)
  const user: User = session?.user as User

  if (!session?.user || !session) {
    return ApiResponse(false, "Not authenticated", 401)
  }

  try {
    const updatedResult = await UserModel.updateOne(
      {
        _id: user._id,
      },
      { $pull: { message: { _id: messageId } } },
    )

    if (updatedResult.modifiedCount == 0) {
      return ApiResponse(false, "Message not found already deleted", 404)
    }

    return ApiResponse(true, "Message Deleted", 201)
  } catch (error) {
    console.log('Error for deleting messages: ', error);
    return ApiResponse(false, "Error Deleting Messages", 500)
  }
}
