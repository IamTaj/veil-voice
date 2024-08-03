import mongoose, { Schema, Document } from "mongoose"
import { Message, User } from "../types/ModelsTypes"

const MessageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
})

const UserSchema: Schema<User> = new Schema({
  userName: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
    trim: true,
    index: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please use a valid email",
    ],
  },
  fullName: {
    type: String,
    require: [true, "Please provide your name"],
    trim: true,
    index: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  verifyCode: {
    type: String,
    required: [true, "Verify code is required"],
  },
  verifyExpiryCode: {
    type: Date,
    required: [true, "Verify expiry code is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptingMessage: {
    type: Boolean,
    default: true,
  },
  userMessage: [MessageSchema],
})

const UserModel =
  mongoose.models.Users || mongoose.model<User>("Users", UserSchema)

export default UserModel
