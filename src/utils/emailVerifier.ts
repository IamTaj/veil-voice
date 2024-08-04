import { VerifyEmailTemplate } from "@/emails/verifyOtpEmail.component"
import { ApiResponse } from "@/types/ApiResponseTypes"
import nodemailer from "nodemailer"

export async function SendVerificationEmail(
  email: string,
  capitalizeUserName: string,
  otp: string,
): Promise<ApiResponse> {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      //email id from where you have generated the pass key
      user: "echoes.veilvoice@gmail.com",
      //pass key
      pass: process.env.NODEMAILER_PASSKEY,
    },
  })

  try {
    await transporter.sendMail({
      from: "",
      to: email,
      subject: `Welcome! Your Veil Voice Verification Code Inside 🥷`,
      html: VerifyEmailTemplate({ capitalizeUserName, otp }),
    })
    return { success: true, message: "Verification email send successfully" }
  } catch (error: any) {
    console.error("Error sending verfication", error)
    return { success: false, message: "Failed to send verification email" }
  }
}
