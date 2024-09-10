"use client";

import React from "react";
import Button from "../button";
import { useFormStatus } from "react-dom";
import { ToastContainer } from "react-toastify";

type Props = {
  label?: string;
  invalid?: boolean;
};

const LoginButton = ({ label, invalid }: Props) => {
  const { pending } = useFormStatus();

  return (
    <div className="relative flex flex-col">
      <Button
        disabled={pending}
        className="bg-[#68DD70] py-[10px] px-10 w-fit rounded-lg text-white font-semibold disabled:bg-zinc-300"
      >
        {label || "Entrar"}
      </Button>
      {invalid && (
        <span className="text-red-500 font-medium text-sm">
          Credenciais Invalidas
        </span>
      )}
      <ToastContainer />
    </div>
  );
};

export default LoginButton;
