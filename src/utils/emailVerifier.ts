import { VerifyEmailTemplate } from "@/emails/verifyOtpEmail.component"
import { ApiResponse } from "@/types/ApiResponseTypes"
import nodemailer from "nodemailer"

export async function SendVerificationEmail(
  email: string,
  userName: string,
  otp: string,
): Promise<ApiResponse> {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      //email id from where you have generated the pass key
      user: "sktajuddinali23@gmail.com",
      //pass key
      pass: "mkga mgvo zxei heyf",
    },
  })
  console.log("transporter: ", transporter)

  try {
    await transporter.sendMail({
      from: "",
      to: email,
      subject: `Welcome to Veil Voice 🐾`,
      html: VerifyEmailTemplate({ userName, otp }),
    })
    return { success: true, message: "Verification email send successfully" }
  } catch (error: any) {
    console.error("Error sending verfication", error)
    return { success: false, message: "Failed to send verification email" }
  }
}
