import fs from "fs";
import crypto from "crypto";
import path from "path";
import { HttpClient } from "./httpClient";

interface StoreConfig {
  user?: {
    username: string;
    password: string;
  };
  client?: {
    host: string;
    port: string;
    username: string;
    password: string;
  };
}

export class Store {
  private secret: string = process.env.SECRET || "asddsa.";
  private config: StoreConfig;
  private http: HttpClient = global.http;

  constructor() {
    if (fs.existsSync(path.join("store", "config.json"))) {
      Object.assign(
        (this.config = {}),
        JSON.parse(fs.readFileSync(path.join("store", "config.json"), "utf8"))
      );
    }
  }

  get hasConfig() {
    return !!this.config;
  }
  get clientData() {
    return this.config.client;
  }
  get userData() {
    return this.config.user;
  }

  private md5(string: string) {
    return crypto
      .createHash("md5")
      .update(this.secret + string + this.secret)
      .digest("hex");
  }

  public registerClient(args: StoreConfig) {
    return new Promise((resolve, reject) => {
      if (!this.config) {
        console.log(args);
        const { username, password, ...client } = args.client;
        this.http
          .post({ url: "api/v2/auth/login", username, password, client })
          .then((res) => {
            if (res.data != "Ok.") {
              resolve({
                success: false,
                msg: "Wrong client username or password",
              });
            } else {
              this.registerUser({ ...args.user });
              this.config.client = args.client;
              if (!fs.existsSync("store")) fs.mkdirSync("store");
              fs.writeFileSync(
                path.join("store", "config.json"),
                JSON.stringify(this.config)
              );
              resolve({
                success: true,
                msg: "Sikeres bejelentkezés",
              });
            }
          })
          .catch((err) => {
            const res = err.response;
            console.log(err);
            reject(res);
          });
      }
    });
  }

  public verifyUser(username: string, password: string) {
    return new Promise((resolve, reject) => {
      if (this.config) {
        const { user } = this.config;
        if (user) {
          if (
            user.password == this.md5(password) &&
            user.username == username
          ) {
            const { username, password, ...client } = this.config.client;
            this.http
              .post({ url: "api/v2/auth/login", username, password, client })
              .then((res) => {
                if (res.data != "Ok.") {
                  resolve({
                    success: false,
                    msg: "Wrong client username or password",
                  });
                } else {
                  resolve({
                    success: true,
                    msg: "Sikeres bejelentkezés",
                  });
                }
              })
              .catch((err) => {
                const res = err.response;
                console.log(err);
                reject(res);
              });
          } else {
            resolve({
              success: false,
              msg: "Helytelen bejelentkezési adatok!",
            });
          }
        } else {
          resolve({ success: false, msg: "Nincs bejelentkezett felhasználó!" });
        }
      } else {
        resolve({ success: false, msg: "A beállítások hiányoznak" });
      }
    });
  }

  public registerUser(userData: StoreConfig["user"]) {
    if (!this.config) this.config = {};
    const { user } = this.config;
    if (!user) {
      this.config["user"] = {
        username: userData.username,
        password: this.md5(userData.password),
      };
    } else {
      console.log("Már létezik felhasználó!");
    }
  }
}
