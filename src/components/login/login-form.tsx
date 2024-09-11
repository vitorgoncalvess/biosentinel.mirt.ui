import React from "react";
import Input from "../input";
import authService from "@/services/auth-service";
import { LoginSchema } from "@/types/auth";
import LoginButton from "./login-button";
import { redirect } from "next/navigation";
import Link from "next/link";

type Props = {
  invalid: boolean;
};

const LoginForm = ({ invalid }: Props) => {
  const handleForm = async (formData: FormData) => {
    "use server";

    const payload = {
      email: formData.get("email"),
      password: formData.get("password"),
    } as LoginSchema;

    const data = await authService.login(payload);

    if (data?.status === 200) {
      redirect("/teste");
    }

    redirect("/?invalid-credentials=true");
  };

  return (
    <div className="flex flex-col gap-4 animate-enter-left w-full">
      <header>
        <h1 className="text-[32px] font-semibold">Bem vindo</h1>
        <h2 className="font-medium opacity-30">Entre agora em nosso sistema</h2>
      </header>
      <form action={handleForm} className="w-full flex flex-col gap-5">
        <Input label="E-mail" name="email" invalid={invalid} />
        <Input
          label="Senha"
          name="password"
          invalid={invalid}
          type="password"
        />
        <div className="w-full flex items-center justify-between text-[14px]">
          <LoginButton invalid={invalid} />
          <span className="opacity-30 cursor-pointer">Esqueci minha senha</span>
        </div>
        <div className="flex items-center justify-center">
          <hr className="w-full" />
          <h1 className="absolute bg-white p-3 text-sm opacity-60">ou</h1>
        </div>
        <div className="flex flex-col gap-2">
          <label className="opacity-50">Não tem conta?</label>
          <Link
            href="/sign-in"
            className="border border-[#68DD70] text-[#68DD70] py-[10px] px-10 rounded-lg font-semibold w-fit"
          >
            Registre-se
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

export default LoginForm;
