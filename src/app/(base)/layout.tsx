import Sidebar from "@/components/sidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const cookieStore = cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="bg-white grow">{children}</main>
    </div>
  );
};

export default Layout;
