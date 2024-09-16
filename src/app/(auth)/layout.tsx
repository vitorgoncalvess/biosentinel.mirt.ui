import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <main className="p-4 flex min-h-screen min-w-screen gap-8">
      <div className="md:w-6/12 lg:w-8/12 bg-zinc-300 rounded-xl shrink-0"></div>
      <section className="py-20 pr-4 grow flex items-center">
        {children}
      </section>
    </main>
  );
};

export default Layout;
