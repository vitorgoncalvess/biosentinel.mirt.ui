"use client";

import React from "react";
import Input from "../input";
import Link from "next/link";
import SignInButton from "./sign-in-button";
import formToObject from "@/utils/formatters/form-to-object";
import authService from "@/services/auth-service";
import { RegisterSchema } from "@/types/auth";
import { useRouter } from "next/navigation";

type Props = {
  invalid?: boolean;
};

const SignInForm = ({ invalid }: Props) => {
  const router = useRouter();

  const handleForm = async (formData: FormData) => {
    const payload = formToObject<RegisterSchema>(formData, [""]);

    if (payload.password !== formData.get("c_password")) {
      router.push("?=password-mismatch=true");
    }

    const data = await authService.register(payload);

    if (data.status === 201) {
      router.push("/?account-created=true");
    }
  };

  return (
    <div className="flex flex-col gap-4 animate-enter-right w-full">
      <header>
        <h1 className="text-[32px] font-semibold">Cadastre-se agora</h1>
        <h2 className="font-medium opacity-30">
          Crie uma conta em nosso sistema
        </h2>
      </header>
      <form action={handleForm} className="w-full flex flex-col gap-5">
        <Input label="Nome completo" name="name" invalid={invalid} />
        <Input label="E-mail" name="email" invalid={invalid} />
        <div className="flex gap-4 [&>*]:grow">
          <Input
            label="Senha"
            name="password"
            invalid={invalid}
            type="password"
          />
          <Input
            label="Confirmar senha"
            name="c_password"
            invalid={invalid}
            type="password"
          />
        </div>
        <SignInButton invalid={invalid} />
        <div className="flex items-center justify-center">
          <hr className="w-full" />
          <h1 className="absolute bg-white p-3 text-sm opacity-60">ou</h1>
        </div>
        <div className="flex flex-col gap-2">
          <label className="opacity-50">Já possui uma conta?</label>
          <Link
            href="/"
            className="border border-[#68DD70] text-[#68DD70] py-[10px] px-10 rounded-lg font-semibold w-fit"
          >
            Entre Agora
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <label className="opacity-30" htmlFor="">
            Tendo problemas para entrar?
          </label>
          <h2 className="underline cursor-pointer">Fale com o suporte</h2>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
