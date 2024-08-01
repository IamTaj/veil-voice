export function ApiResponse(
  success: boolean,
  message: string,
  status: number,
  responseData?: {},
) {
  return Response.json(
    {
      success: success,
      message: message,
      responseData,
    },
    {
      status: status,
    },
  )
}
