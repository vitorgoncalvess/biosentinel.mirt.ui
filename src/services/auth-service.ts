import {
  AuthSchema,
  loginSchema,
  LoginSchema,
  RegisterSchema,
} from "@/types/auth";
import { cookies } from "next/headers";
import { Service } from "./service";

class AuthService extends Service {
  constructor(url: string) {
    super(url);
  }

  async login(payload: LoginSchema, rm: boolean) {
    const res = loginSchema.safeParse(payload);

    if (res.error) {
      return {
        status: 404,
        ...res.error,
      };
    }

    try {
      const resp = await this.api(`${this.url}/login`, {
        method: "POST",
        body: payload,
      });

      const data = await resp.json();

      const cookiesStore = cookies();
      cookiesStore.set("email", data.email);
      cookiesStore.set("name", data.name);

      if (!data.twoFactorEnabled || rm) {
        cookiesStore.set("token", data.access_token);
      }

      return {
        status: resp.status,
        ...data,
      };
    } catch (err) {
      return null;
    }
  }

  async login2fa(payload: AuthSchema) {
    const cookieStore = cookies();

    try {
      const resp = await this.api(`${this.url}/2fa/authenticate`, {
        method: "POST",
        body: { ...payload, email: cookieStore.get("email")?.value },
      });

      const data = await resp.json();

      cookieStore.delete("name");

      cookieStore.set("email", data.email);
      cookieStore.set("token", data.access_token);

      if (resp.ok) {
        return {
          status: resp.status,
          message: "authenticated",
        };
      }

      return {
        status: resp.status,
        message: "unauthorized",
      };
    } catch (err) {
      return {
        status: 500,
        error: err,
      };
    }
  }

  async register(payload: Partial<RegisterSchema>) {
    try {
      const resp = await this.api(`${this.url}/register`, {
        method: "POST",
        body: payload,
      });

      return {
        status: resp.status,
        message: "created",
      };
    } catch (err) {
      return {
        status: 500,
        error: err,
      };
    }
  }
}

const authService = new AuthService("authentication");

export default authService;
