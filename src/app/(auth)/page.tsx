import TwoFactorAuth from "@/components/2fa-auth/two-factor-auth";
import LoginForm from "@/components/login/login-form";

type Props = {
  searchParams: { "invalid-credentials": boolean; "2fa-auth": boolean };
};

export default function Home({ searchParams }: Props) {
  const invalid = !!searchParams["invalid-credentials"];
  const twoFactor = !!searchParams["2fa-auth"];
  if (twoFactor) {
    return <TwoFactorAuth />;
  }
  return <LoginForm invalid={invalid} />;
}
