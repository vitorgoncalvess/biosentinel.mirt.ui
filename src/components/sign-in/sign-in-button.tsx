"use client";

import React from "react";
import LoginButton from "../login/login-button";

type Props = {
  invalid?: boolean;
};

const SignInButton = ({ invalid }: Props) => {
  return <LoginButton label="Criar Conta" invalid={invalid} />;
};

export default SignInButton;
