"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = void 0;
const fs_1 = __importDefault(require("fs"));
const crypto_1 = __importDefault(require("crypto"));
const path_1 = __importDefault(require("path"));
class Store {
    constructor() {
        this.secret = process.env.SECRET || "asddsa.";
        this.http = global.http;
        if (fs_1.default.existsSync(path_1.default.join("store", "config.json"))) {
            Object.assign((this.config = {}), JSON.parse(fs_1.default.readFileSync(path_1.default.join("store", "config.json"), "utf8")));
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
    md5(string) {
        return crypto_1.default
            .createHash("md5")
            .update(this.secret + string + this.secret)
            .digest("hex");
    }
    registerClient(args) {
        return new Promise((resolve, reject) => {
            if (!this.config) {
                console.log(args);
                const _a = args.client, { username, password } = _a, client = __rest(_a, ["username", "password"]);
                this.http
                    .post({ url: "api/v2/auth/login", username, password, client })
                    .then((res) => {
                    if (res.data != "Ok.") {
                        resolve({
                            success: false,
                            msg: "Wrong client username or password",
                        });
                    }
                    else {
                        this.registerUser(Object.assign({}, args.user));
                        this.config.client = args.client;
                        if (!fs_1.default.existsSync("store"))
                            fs_1.default.mkdirSync("store");
                        fs_1.default.writeFileSync(path_1.default.join("store", "config.json"), JSON.stringify(this.config));
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
    verifyUser(username, password) {
        return new Promise((resolve, reject) => {
            if (this.config) {
                const { user } = this.config;
                if (user) {
                    if (user.password == this.md5(password) &&
                        user.username == username) {
                        const _a = this.config.client, { username, password } = _a, client = __rest(_a, ["username", "password"]);
                        this.http
                            .post({ url: "api/v2/auth/login", username, password, client })
                            .then((res) => {
                            if (res.data != "Ok.") {
                                resolve({
                                    success: false,
                                    msg: "Wrong client username or password",
                                });
                            }
                            else {
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
                    else {
                        resolve({
                            success: false,
                            msg: "Helytelen bejelentkezési adatok!",
                        });
                    }
                }
                else {
                    resolve({ success: false, msg: "Nincs bejelentkezett felhasználó!" });
                }
            }
            else {
                resolve({ success: false, msg: "A beállítások hiányoznak" });
            }
        });
    }
    registerUser(userData) {
        if (!this.config)
            this.config = {};
        const { user } = this.config;
        if (!user) {
            this.config["user"] = {
                username: userData.username,
                password: this.md5(userData.password),
            };
        }
        else {
            console.log("Már létezik felhasználó!");
        }
    }
}
exports.Store = Store;
