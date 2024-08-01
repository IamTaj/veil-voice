import { z } from "zod"

export const signInScehma = z.object({
  identifier: z.string(),
  password: z.string(),
})
