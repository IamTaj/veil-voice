import { Message } from "postcss"

export type MessageCardProps = {
  message: Message
  onMessageDelete: (messageId: string) => void
}
