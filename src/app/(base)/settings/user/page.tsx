import { logout } from "@/actions/user/logout";
import { cookies } from "next/headers";
import React from "react";

const Page = () => {
  const cookieStore = cookies();
  const name = cookieStore.get("name")?.value;
  const email = cookieStore.get("email")?.value;
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-medium">Perfil</h1>
      <div>
        <h2 className="text-3xl font-semibold">{name}</h2>
        <h3 className="text-lg opacity-50">{email}</h3>
      </div>
      <form action={logout}>
        <button className="border p-2 px-4 rounded-lg text-red-600">
          Deslogar
        </button>
      </form>
    </div>
  );
};

export default Page;
