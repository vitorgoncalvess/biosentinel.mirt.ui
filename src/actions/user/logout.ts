"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logout = async () => {
  const cookieStore = cookies();

  cookieStore.getAll().forEach((cookie) => {
    cookieStore.delete(cookie.name);
  });

  redirect("/");
};
