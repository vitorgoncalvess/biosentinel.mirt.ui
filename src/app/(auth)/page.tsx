import LoginForm from "@/components/login/login-form";

type Props = {
  searchParams: { "invalid-credentials": boolean };
};

export default function Home({ searchParams }: Props) {
  const invalid = !!searchParams["invalid-credentials"];
  return <LoginForm invalid={invalid} />;
}
