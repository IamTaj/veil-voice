import { OPENAI_KEY } from "@/lib/constant"
import { ApiResponse } from "@/utils/ApiResponse"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(OPENAI_KEY)

export async function POST(request: Request) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What's a hobby you've recently started? || If you could have dinner with any historical figure, who would it be?|| What's a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment."

    const response = await model.generateContent(prompt)

    return ApiResponse(
      true,
      "AI Message Generated successfully",
      201,
      response?.response?.candidates?.[0]?.content?.parts?.[0]?.text,
    )
  } catch (err: any) {
    return ApiResponse(true, err, 500)
  }
}
