"use client";

import React, { useEffect, useState } from "react";
import Input from "../input";
import Link from "next/link";
import SignInButton from "./sign-in-button";
import { useFormState } from "react-dom";
import handleSignForm from "@/actions/sign-in/handle-sign-form";
import { v_pass } from "@/types/auth";
import { ZodIssue } from "zod";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";

const SignInForm = () => {
  const [state, action] = useFormState(handleSignForm, undefined);
  const [pass, setPass] = useState("");
  const [errors, setErrors] = useState<ZodIssue[]>([]);

  const router = useRouter();

  useEffect(() => {
    const validatePass = v_pass.safeParse(pass);

    if (validatePass.error) {
      setErrors(validatePass.error.errors);
    } else {
      setErrors([]);
    }
  }, [pass]);

  useEffect(() => {
    if (state?.message) {
      router.push("/?account-created=true");
    }
  }, [state, router]);

  return (
    <div className="flex flex-col gap-4 animate-enter-right w-full">
      <header>
        <h1 className="text-[32px] font-semibold">Cadastre-se agora</h1>
        <h2 className="font-medium opacity-30">
          Crie uma conta em nosso sistema
        </h2>
      </header>
      <form action={action} className="w-full flex flex-col gap-5">
        <Input
          label="Nome completo"
          name="name"
          invalid={state?.errors?.name}
          error={state?.errors?.name?.[0]}
        />
        <Input
          label="E-mail"
          name="email"
          invalid={state?.errors?.email}
          error={state?.errors?.email?.[0]}
        />
        <div className="flex gap-4 [&>*]:grow">
          <div className="relative">
            <Input
              label="Senha"
              name="password"
              type="password"
              invalid={state?.errors?.password}
              error="Sua senha tem que ser muito forte"
              value={pass}
              onChange={({ target }) => setPass(target.value)}
            />
          </div>
          <Input
            label="Confirmar senha"
            name="c_password"
            type="password"
            invalid={state?.errors?.c_password}
            error={state?.errors?.c_password?.[0]}
          />
        </div>
        <div className="flex flex-col gap-1 w-5/12">
          <div className="flex items-center justify-between gap-1">
            {Array.from({
              length: 4 - errors?.length,
            }).map((_, i) => (
              <div
                key={i}
                className={twMerge(
                  "w-full h-2 rounded bg-blue-300",
                  errors?.length > 0 && "bg-emerald-300",
                  errors?.length > 1 && "bg-yellow-300",
                  errors?.length > 2 && "bg-red-300"
                )}
              ></div>
            ))}
            {Array.from({
              length: errors?.length,
            }).map((_, i) => (
              <div key={i} className="bg-zinc-300 w-full h-2 rounded"></div>
            ))}
          </div>
          <h1 className="text-sm font-semibold opacity-80">
            Força da senha:{" "}
            {pass &&
              (errors.length > 2
                ? "Fraca"
                : errors.length > 1
                ? "Boa"
                : errors.length > 0
                ? "Forte"
                : "Muito forte")}
          </h1>
        </div>
        <SignInButton />
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
