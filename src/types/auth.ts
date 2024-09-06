import { z } from "zod";

export const loginSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});

export type LoginSchema = z.infer<typeof loginSchema>;
