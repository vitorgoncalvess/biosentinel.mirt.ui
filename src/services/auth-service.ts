import { LoginSchema } from "@/types/auth";
import { cookies } from "next/headers";
import { Service } from "./service";

class AuthService extends Service {
  constructor(url: string) {
    super(url);
  }

  async login(formData: LoginSchema) {
    try {
      const resp = await this.api(`${this.url}/login`, {
        method: "POST",
        body: formData,
      });

      console.log(formData, `${this.url}/login`);

      const data = await resp.json();

      const cookiesStore = cookies();
      cookiesStore.set("token", data.accessToken);

      return data;
    } catch (err) {
      return null;
    }
  }
}

const authService = new AuthService("authentication");

export default authService;
