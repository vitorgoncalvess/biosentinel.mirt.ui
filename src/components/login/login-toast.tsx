"use client";

import useToast from "@/hooks/useToast";
import React, { useEffect, useState } from "react";
import Toast from "../toast";
import { useSearchParams } from "next/navigation";

const LoginToast = () => {
  const { show, toast } = useToast();
  const [state, setState] = useState("");

  const searchParams = useSearchParams();

  useEffect(() => {
    setState(Array.from(searchParams.keys())[0]);
  }, [searchParams]);

  useEffect(() => {
    if (state === "account-created") {
      toast();
    }
  }, [state]);

  return (
    <Toast show={show}>
      <div className="flex flex-col gap-1 p-2">
        <header className="font-semibold">Conta criada com sucesso!</header>
        <div className="text-sm opacity-80">
          Você já pode fazer login usando o acesso que acabou de criar
        </div>
      </div>
    </Toast>
  );
};

export default LoginToast;
