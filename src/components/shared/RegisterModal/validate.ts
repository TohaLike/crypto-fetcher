import { z } from "zod";

export const registrationSchema = z.object({
  name: z.string().min(1, { message: "Введите имя" }).max(55, { message: "Слишком длинное имя" }),
  email: z.string().email({ message: "Некорректная почта" }),
  day: z.string().min(1, { message: "Укажите день" }),
  month: z.string().min(1, { message: "Укажите месяц" }),
  year: z.string().min(1, { message: "Укажите год" }),
  password: z
    .string()
    .min(6, { message: "Минимальная длина символов должна быть не менее 6 символов!" })
    .max(150, { message: "Слишком длинный пароль!" }),
});
