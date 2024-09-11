import {
  loginSchema,
  LoginSchema,
  registerSchema,
  RegisterSchema,
} from "@/types/auth";
import { cookies } from "next/headers";
import { Service } from "./service";

class AuthService extends Service {
  constructor(url: string) {
    super(url);
  }

  async login(payload: LoginSchema) {
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
      cookiesStore.set("token", data.accessToken);

      return {
        status: resp.status,
        ...data,
      };
    } catch (err) {
      return null;
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
