import { cookies } from "next/headers";
import React from "react";
import TwoFactorForm from "./two-factor-form";

const TwoFactorAuth = () => {
  const cookieStore = cookies();
  const name = cookieStore.get("name")?.value || "";

  return <TwoFactorForm name={name} />;
};

export default TwoFactorAuth;
