import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <main className="p-4 flex min-h-screen">
      <div className="w-[800px] bg-zinc-300 rounded-xl shrink-0"></div>
      <section className="py-20 px-10 grow">{children}</section>
    </main>
  );
};

export default Layout;
