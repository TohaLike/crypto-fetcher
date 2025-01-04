import { z } from "zod";

export const messageSchema = z.object({
  message: z.string().min(1, { message: "" }).max(2400, { message: "Максимально количество символов 2400" }),
});
