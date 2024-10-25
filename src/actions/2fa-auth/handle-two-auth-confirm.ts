"use server";

import authService from "@/services/auth-service";

export const handleTwoAuthConfirm = async (code: string) => {
  return await authService.confirmTwoAuth(code);
};
