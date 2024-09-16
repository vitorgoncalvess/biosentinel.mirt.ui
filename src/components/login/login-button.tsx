"use client";

import React, { useEffect, useState } from "react";
import Button from "../button";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";
import useToast from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import saveRmIntoCookies from "@/actions/login/save-rm-into-cookies";

type Props = {
  label?: string;
  invalid?: boolean;
};

const LoginButton = ({ label, invalid }: Props) => {
  const { pending } = useFormStatus();
  const { toast } = useToast();
  const [state, setState] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    setState(Array.from(searchParams.keys())[0]);

    const rmDate = localStorage.getItem("rm-auth");

    if (rmDate) {
      saveRmIntoCookies(rmDate);
    }
  }, [searchParams]);

  useEffect(() => {
    if (state === "account-created") {
      toast({
        header: "Conta criada com sucesso!",
        body: "Você já pode fazer login usando o acesso que acabou de criar.",
      });
      router.push("/");
    }
    // eslint-disable-next-line
  }, [state]);

  return (
    <>
      <div className="relative flex flex-col">
        <Button
          loading={pending}
          className="bg-[#68DD70] py-[10px] px-10 w-fit rounded-lg text-white font-semibold disabled:bg-zinc-300"
        >
          {label || "Entrar"}
        </Button>
        {invalid && (
          <span className="text-red-500 font-medium text-sm">
            Credenciais Invalidas
          </span>
        )}
      </div>
    </>
  );
};

export default LoginButton;
