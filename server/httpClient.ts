import { AxiosResponse, default as axios } from "axios";
import { LoginArgs, MainDataArgs } from "./interfaces/http";
import FormData from "form-data";
import { URLSearchParams } from "url";

export class HttpClient {
  private http: typeof axios = axios;
  private cookie: string;
  private cookieExpire: number = Date.now();
  private cookieTime: number = 4 * 60 * 60 * 1000;

  constructor() {}

  public get<T>(args: MainDataArgs): Promise<AxiosResponse<T>> {
    this.checkCookie();
    return new Promise((resolve, reject) => {
      //const { host, port } = this.store.clientData;
      // const baseUrl =
      let url = this.createUrlByParams(args);
      delete args.url;

      const params = [];
      Object.keys(args).forEach((key) => {
        params.push(`${key}=${args[key]}`);
      });
      url = [url, params.join("&")].join("?");

      this.http
        .get(url, {
          headers: { Cookie: this.cookie || "" },
        })
        .then((res) => {
          if (res.headers["set-cookie"])
            this.setCookie(
              res.headers["set-cookie"].find((str) => str.includes("SID"))
            );
          resolve(res);
        })
        .catch(reject);
    });
  }

  public post<T>(args: LoginArgs): Promise<AxiosResponse<T>> {
    this.checkCookie();
    return new Promise((resolve, reject) => {
      const url = this.createUrlByParams(args);
      this.http
        .post(url, createSearchParams(args), {
          headers: {
            Cookie: this.cookie || "",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        })
        .then((res) => {
          if (res.headers["set-cookie"])
            this.setCookie(
              res.headers["set-cookie"].find((str) => str.includes("SID"))
            );
          resolve(res);
        })
        .catch(reject);
    });
  }

  private setCookie(cookie: string) {
    if (cookie) {
      this.cookie = cookie;
      this.cookieExpire = Date.now() + this.cookieTime;
    }
  }
  private checkCookie() {
    if (this.cookieExpire < Date.now()) {
      this.cookie = undefined;
    }
  }
  private createUrlByParams(args: any) {
    let url = "";
    if (args.client) {
      url += args.client.host;
      if (args.client.port) {
        url += `:${args.client.port}`;
      }
      url += "/";
    }
    delete args.client;
    url += args.url;
    delete args.url;
    return url;
  }
}

function createFormData(args: Object): FormData {
  let formData: FormData = new FormData();

  Object.entries(args).forEach(([key, value]) => {
    formData.append(key, encodeURIComponent(value));
  });

  return formData;
}
function createSearchParams(args: Object): URLSearchParams {
  let params: URLSearchParams = new URLSearchParams();

  Object.entries(args).forEach(([key, value]) => {
    params.append(key, value);
  });

  return params;
}
