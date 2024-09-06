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

      return fetch(url, opt as RequestInit);
    };
  }
}
