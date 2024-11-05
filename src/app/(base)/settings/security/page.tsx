import TwoFaCheck from "@/components/security/2fa-check";
import authService from "@/services/auth-service";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

const Page = async () => {
  const data = await authService.getTwoAuths();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-medium">Segurança</h1>
      {!data.auths?.length && (
        <div className="border-yellow-200 rounded-lg border bg-yellow-100 p-4 flex gap-4 text-yellow-700 items-center">
          <Icon icon="material-symbols:warning-outline" className="h-6 w-6" />
          <div>
            <h1>Autenticação de dois fatores não ativada</h1>
            <h2 className="text-sm opacity-50">
              Habilite a autenticação de dois fatores para aumentar a segurança
              de sua conta.
            </h2>
          </div>
        </div>
      )}
      <ul className="w-full border [&>li]:p-4 [&>li]:flex rounded-lg">
        <TwoFaCheck auths={data.auths} />
      </ul>
    </div>
  );
};

export default Page;
