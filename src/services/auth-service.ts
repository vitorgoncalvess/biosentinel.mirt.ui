import {
  Auth,
  AuthSchema,
  loginSchema,
  LoginSchema,
  RegisterSchema,
} from "@/types/auth";
import { cookies } from "next/headers";
import { Service } from "./service";
import { revalidateTag } from "next/cache";

class AuthService extends Service {
  constructor(url: string) {
    super(url);
  }

  async login(payload: LoginSchema, rm: boolean) {
    const res = loginSchema.safeParse(payload);

    if (res.error) {
      return this.resolve(404, { ...res.error });
    }

    try {
      const resp = await this.api(`/login`, {
        method: "POST",
        body: payload,
      });

      const data = await resp.json();

      const cookiesStore = cookies();
      cookiesStore.set("email", data.email);
      cookiesStore.set("name", data.name);
      cookiesStore.set("two-auth-enabled", data.twoFactorEnabled);

      if (!data.twoFactorEnabled || rm) {
        cookiesStore.set("token", data.access_token);
      }

      return this.resolve(resp.status, { ...data });
    } catch (err) {
      return null;
    }
  }

  async login2fa(payload: AuthSchema) {
    const cookieStore = cookies();

    try {
      const resp = await this.api(`/2fa/authenticate`, {
        method: "POST",
        body: { ...payload, email: cookieStore.get("email")?.value },
      });

      const data = await resp.json();

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
      const resp = await this.api(`/register`, {
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

  async generateQrCode(ip?: string) {
    const token = this.getToken();

    try {
      const resp = await this.api(`/2fa/generate`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: {
          ip,
        },
      });

      const data = await resp.text();

      return {
        status: resp.status,
        data,
      };
    } catch (err) {
      return {
        status: 500,
        message: err,
      };
    }
  }

  async confirmTwoAuth(code: string) {
    const token = this.getToken();

    try {
      const resp = await this.api(`/2fa/confirm`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: { code },
      });

      const data = await resp.json();

      return {
        status: resp.status,
        data,
      };
    } catch (err) {
      return {
        status: 500,
        message: err,
      };
    }
  }

  async getTwoAuths() {
    const token = this.getToken();

    try {
      const resp = await this.api(`/2fa`, {
        headers: {
          Authorization: "Bearer " + token,
        },
        next: {
          tags: ["auths"],
        },
      });

      const data = await resp.json();

      return {
        status: resp.status,
        auths: (data as Auth[]) || [],
      };
    } catch (err) {
      return {
        status: 500,
        message: err,
      };
    }
  }

  async deleteAuth(id: number) {
    const token = this.getToken();

    try {
      const resp = await this.api(`/2fa/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const data = await resp.json();

      revalidateTag("auths");

      return this.resolve(resp.status, { data });
    } catch (err) {
      return this.resolve(500, { message: err });
    }
  }
}

const authService = new AuthService("authentication");

export default authService;
