export function ApiResponse(
  success: boolean,
  message: string,
  status: number,
  userMessage?: {},
  isAcceptingMessage?: boolean,
  aiGeneratedMessage?: {},
) {
  return Response.json(
    {
      success: success,
      message: message,
      userMessage,
      isAcceptingMessage,
      aiGeneratedMessage,
    },
    {
      status: status,
    },
  )
}
