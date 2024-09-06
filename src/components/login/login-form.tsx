import React from "react";
import Input from "../input";
import Button from "../button";
import authService from "@/services/auth-service";
import { LoginSchema } from "@/types/auth";

const LoginForm = () => {
  const handleForm = async (formData: FormData) => {
    "use server";

    const payload = {
      email: formData.get("email"),
      password: formData.get("password"),
    } as LoginSchema;

    const data = await authService.login(payload);

    console.log(data);
  };

  return (
    <div className="flex flex-col gap-4">
      <header>
        <h1 className="text-[32px] font-semibold">Bem vindo</h1>
        <h2 className="font-medium opacity-30">Entre agora em nosso sistema</h2>
      </header>
      <form action={handleForm} className="w-full flex flex-col gap-5">
        <Input label="E-mail" name="email" />
        <Input label="Senha" name="password" />
        <div className="w-full flex items-center justify-between text-[14px]">
          <Button className="bg-[#68DD70] py-[10px] px-10 rounded-lg text-white font-semibold">
            Entrar
          </Button>
          <span className="opacity-30 cursor-pointer">Esqueci minha senha</span>
        </div>
        <div className="flex items-center justify-center">
          <hr className="w-full" />
          <h1 className="absolute bg-white p-3 text-sm opacity-60">ou</h1>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="">Não tem conta?</label>
          <Button className="border border-[#68DD70] text-[#68DD70] py-[10px] px-10 rounded-lg font-semibold w-fit">
            Registre-se
          </Button>
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
