import { Message } from "./ModelsTypes"

export interface ApiResponse {
  success: boolean
  message: string
  isAcceptingMessage?: boolean
  userMessage?: Array<Message>
}
