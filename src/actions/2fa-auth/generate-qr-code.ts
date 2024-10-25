"use server";

import authService from "@/services/auth-service";

export const generateQrCode = async (ip?: string) => {
  return await authService.generateQrCode(ip);
};
