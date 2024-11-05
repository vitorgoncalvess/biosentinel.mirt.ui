import { cookies } from "next/headers";

type Options = {
  method?: RequestInit["method"];
  headers?: RequestInit["headers"];
  body?: Record<string, unknown> | string;
};

export class Service {
  url: string;
  api: (url: string, options: Options) => Promise<Response>;

  constructor(url: string) {
    if (url[0] !== "/") {
      url = "/" + url;
    }
    this.url = process.env.NEXT_PUBLIC_API_URL + url;
    this.api = (url, options) => {
      const opt = {
        method: "GET",
        ...options,
        headers: {
          "content-type": "application/json",
          ...options.headers,
        },
      };

      if (options.body && typeof options.body === "object") {
        opt.body = JSON.stringify(options.body);
      }

      return fetch(this.url + url, opt as RequestInit);
    };
  }

  getToken() {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (token) {
      return token;
    }

    return null;
  }

  resolve<T>(status: number, props: T): { status: number; data: T } {
    return {
      status,
      data: props,
    };
  }
}
