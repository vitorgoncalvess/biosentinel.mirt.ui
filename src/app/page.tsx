import LoginForm from "@/components/login/login-form";

export default function Home() {
  return (
    <main className="p-4 flex min-h-screen">
      <div className="w-[800px] bg-zinc-300 rounded-xl"></div>
      <section className="py-20 px-10 grow">
        <LoginForm />
      </section>
    </main>
  );
}
