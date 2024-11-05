"use server";

import authService from "@/services/auth-service";
import { authSchema } from "@/types/auth";
import { formToObject } from "@/utils/formatters";

export const generateQrCode = async (ip?: string) => {
  return await authService.generateQrCode(ip);
};

type FormState =
  | {
      errors?: {
        twoFactorAuthenticationCode?: string[];
      };
    }
  | {
      message: string;
    };

export const handle2FaAuth = async (
  _: FormState | undefined,
  formData: FormData
) => {
  const payload = formToObject(formData);

  const validatedFields = await authSchema.safeParseAsync(payload);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const response = await authService.login2fa(validatedFields.data);

  return {
    status: response.status,
    message: response.message,
  };
};

export const handleTwoAuthConfirm = async (code: string) => {
  return await authService.confirmTwoAuth(code);
};

export const deleteAuth = async (id: number) => {
  return await authService.deleteAuth(id);
};
