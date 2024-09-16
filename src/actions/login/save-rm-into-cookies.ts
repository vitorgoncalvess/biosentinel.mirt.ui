"use server";

import { cookies } from "next/headers";

const saveRmIntoCookies = async (rmDate: string) => {
  const cookieStore = cookies();

  cookieStore.set("rm-auth", rmDate);
};

export default saveRmIntoCookies;
