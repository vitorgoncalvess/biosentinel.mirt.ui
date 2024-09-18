"use server";

import authService from "@/services/auth-service";
import { registerSchema, RegisterSchema } from "@/types/auth";
import { formToObject } from "@/utils/formatters";
import bcrypt from "bcrypt";

type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
        c_password?: string[];
      };
    }
  | {
      message: string;
    };

const handleSignForm = async (_: FormState | undefined, formData: FormData) => {
  const payload = formToObject<RegisterSchema>(formData);

  const validatedFields = await registerSchema.safeParseAsync(payload);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const password = formData.get("password") as string;

  const _payload = {
    ...validatedFields.data,
    password: await bcrypt.hash(password, 10),
  };

  const response = await authService.register(_payload);

  return {
    message: response.message,
  };
};

export default handleSignForm;
