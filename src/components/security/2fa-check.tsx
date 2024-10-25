"use client";

import React, { useEffect, useState } from "react";
import { generateQrCode } from "@/actions/2fa-auth/generate-qr-code";
import Image from "next/image";
import Input from "../input";
import { Auth } from "@/types/auth";

type Props = {
  enabled: boolean;
  auths: Auth;
};

const TwoFaCheck = ({ enabled, auths }: Props) => {
  const [qr, setQr] = useState<string | undefined>(undefined);
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (false) {
        let _data;
        const resp = await fetch("https://api.ipify.org/?format=json");

        if (resp.ok) {
          _data = await resp.json();
        }

        const data = await generateQrCode(_data?.ip);
        if (data.status === 201) {
          setQr(data.data);
        }
      }
    };

    fetchData();
  }, [enabled]);

  return (
    <li className="flex flex-col items-start gap-2">
      <header className="flex items-center justify-between w-full">
        <div>
          <h1 className="font-medium">Autenticação de dois fatores (TOAP)</h1>
          <h2 className="text-sm opacity-50">
            Nescessitar de uma chave de acesso em adição ao login.
          </h2>
        </div>
      </header>
      {qr && (
        <section className="flex flex-col gap-2">
          <Image alt="auth" width={200} height={200} src={qr} />
          <h1 className="text-sm opacity-60">
            Escaneie o QRCODE acima em qualquer aplicativo de autenticação
            (TOAP) e insira o codigo abaixo.
          </h1>
          <Input label="Codigo" />
          <div>
            <button
              onClick={() =>
                setTimeout(() => {
                  setConfirm(true);
                }, 1000)
              }
              className="bg-green-500 text-white p-2 px-4 rounded"
            >
              Confirmar
            </button>
            {confirm && (
              <h1 className="text-green-500 text-sm opacity-80 mt-2">
                Autenticação Ativada!
              </h1>
            )}
          </div>
        </section>
      )}
      <div className="w-full border border-zinc-200"></div>
      <h1 className="font-medium text-sm opacity-80">Chaves de segurança</h1>
      <ul>{auths}</ul>
      <button className="border rounded-lg px-2 py-1 text-sm">
        Adicionar chave
      </button>
    </li>
  );
};

export default TwoFaCheck;
