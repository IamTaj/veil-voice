import { Resend } from "resend"
import { VerifyEmailTemplate } from "@/emails/verifyOtpEmail.component"
import { resend } from "@/lib/resend"
import { ApiResponse } from "@/types/ApiResponseTypes"

export async function SendVerificationEmail(
  email: string,
  userName: string,
  otp: string,
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "night123fever@gmail.com",
      to: email,
      subject: "Veil Voice | Verification Code",
      react: VerifyEmailTemplate({ userName, otp }),
    })

    return { success: true, message: "Verification email send successfully" }
  } catch (emailError: any) {
    console.error("Error sending verfication", emailError)
    return { success: false, message: "Failed to send verification email" }
  }
}
