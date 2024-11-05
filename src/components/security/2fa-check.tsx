"use client";

import React, { useState } from "react";
import { deleteAuth, generateQrCode } from "@/actions/2fa-auth";
import Image from "next/image";
import Input from "../input";
import { Auth } from "@/types/auth";
import Button from "../button";

type Props = {
  auths?: Auth[];
};

const TwoFaCheck = ({ auths }: Props) => {
  const [qr, setQr] = useState<string | undefined>(undefined);

  const generateQr = async () => {
    let _data;
    const resp = await fetch("https://api.ipify.org/?format=json");

    if (resp.ok) {
      _data = await resp.json();
    }

    const data = await generateQrCode(_data?.ip);
    if (data.status === 201) {
      setQr(data.data);
    }
  };

  const deleteAuthentication = async (id: number) => {
    await deleteAuth(id);
  };

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
      <div className="w-full border border-zinc-100"></div>
      <h1 className="font-medium text-sm opacity-80">Chaves de segurança</h1>
      <ul className="w-full flex flex-col border rounded-lg divide-y">
        {auths?.map((auth) => (
          <li
            className="p-3 flex items-center justify-between w-full"
            key={auth.id}
          >
            <div className="[&_h1]:font-medium [&_h1]:text-sm flex flex-col gap-2">
              <div className="flex gap-2">
                <h1 className="!font-semibold">{auth.city}</h1>
                <h1>{auth.ip}</h1>
              </div>
              <h1>Metodo {auth.method}</h1>
              <h1 className="!text-xs !font-semibold opacity-50">
                {auth.country}
              </h1>
            </div>
            <Button
              onClick={() => deleteAuthentication(auth.id)}
              className="text-sm font-semibold border rounded-lg py-1 px-2 text-red-800"
            >
              Excluir
            </Button>
          </li>
        ))}
        {auths?.length === 0 && (
          <div className="flex items-center justify-center p-4 opacity-40 font-medium">
            Nenhuma chave registrada.
          </div>
        )}
      </ul>
      <Button
        onClick={generateQr}
        className="border rounded-lg px-4 border-zinc-300 py-2 font-medium"
      >
        Adicionar chave
      </Button>
      {qr && (
        <section className="flex flex-col gap-2">
          <Image alt="auth" width={200} height={200} src={qr} />
          <h1 className="text-sm opacity-60">
            Escaneie o QRCODE acima em qualquer aplicativo de autenticação
            (TOAP) e insira o codigo abaixo.
          </h1>
          <Input label="Codigo" />
          <div>
            <button className="bg-green-500 text-white p-2 px-4 rounded">
              Confirmar
            </button>
          </div>
        </section>
      )}
    </li>
  );
};

export default TwoFaCheck;
