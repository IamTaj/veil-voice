import { Message } from "./ModelsTypes"

export interface ApiResponse {
  success: boolean
  message: string
  isAcceptingMessage?: boolean
  messages?: Array<Message>
}
