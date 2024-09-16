import { z } from "zod";

export const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const v_pass = z
  .string()
  .min(8, { message: "Conter pelo menos 8 caracteres." })
  .regex(/[a-zA-Z]/, { message: "Conter pelo menos uma letra." })
  .regex(/[0-9]/, { message: "Conter pelo menos um numero." })
  .regex(/[^a-zA-Z0-9]/, {
    message: "Conter pelo menos um caracter especial.",
  })
  .trim();

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Nome tem que conter pelo menos 2 letras" })
      .trim(),
    email: z.string().email({ message: "E-mail invalido" }).trim(),
    password: v_pass,
    c_password: z.string(),
  })
  .refine((obj) => obj.c_password === obj.password, {
    message: "Senhas não coincidem",
    path: ["c_password"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;

export const authSchema = z.object({
  twoFactorAuthenticationCode: z.string().trim(),
});

export type AuthSchema = z.infer<typeof authSchema>;
