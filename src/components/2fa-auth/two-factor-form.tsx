"use client";

import handle2FaAuth from "@/actions/2fa-auth/handle-2fa-auth";
import { Icon } from "@iconify/react";
import Input from "../input";
import Button from "../button";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  name: string;
};

const TwoFactorForm = ({ name }: Props) => {
  const [state, action] = useFormState(handle2FaAuth, undefined);
  const [rm, setRm] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (state?.status === 200) {
      if (rm) {
        localStorage.setItem("rm-auth", JSON.stringify(new Date()));
      }

      router.push("/home");
    }
  }, [state]);

  return (
    <form
      action={action}
      className="flex flex-col gap-4 px-8 items-center border py-12 rounded-lg"
    >
      <h1 className="text-lg">
        Entrando como <span className="font-semibold">{name}</span>
      </h1>
      <Icon className="h-8 w-8" icon="mdi:password-outline" />
      <Input
        name="twoFactorAuthenticationCode"
        label="Código de Autenticação"
        placeholder="XXXXXX"
        invalid={state?.message === "unauthorized"}
        error="Código invalido"
      />
      <label htmlFor="" className="flex gap-2 items-center text-sm">
        <input
          checked={rm}
          onChange={({ target }) => setRm(target.checked)}
          className="h-4 w-4 rounded-lg"
          type="checkbox"
          name="remember"
        />
        <span className="opacity-60">
          Lembrar deste dispositivo pelos proximos 30 dias.
        </span>
      </label>
      <Button className="bg-[#68DD70] py-[8px] px-8 w-fit rounded-lg text-white font-semibold disabled:bg-zinc-300">
        Verificar
      </Button>
      <h2 className="text-sm opacity-80">
        Abra seu aplicativo ou extensão de navegador de autenticação de dois
        fatores (TOTP) para visualizar seu código de autenticação.
      </h2>
    </form>
  );
};

export default TwoFactorForm;
