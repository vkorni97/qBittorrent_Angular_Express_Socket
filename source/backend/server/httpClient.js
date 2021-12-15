"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClient = void 0;
const axios_1 = __importDefault(require("axios"));
const form_data_1 = __importDefault(require("form-data"));
const url_1 = require("url");
class HttpClient {
    constructor() {
        this.http = axios_1.default;
        this.cookieExpire = Date.now();
        this.cookieTime = 4 * 60 * 60 * 1000;
    }
    get(args) {
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
                    this.setCookie(res.headers["set-cookie"].find((str) => str.includes("SID")));
                resolve(res);
            })
                .catch(reject);
        });
    }
    post(args) {
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
                    this.setCookie(res.headers["set-cookie"].find((str) => str.includes("SID")));
                resolve(res);
            })
                .catch(reject);
        });
    }
    setCookie(cookie) {
        if (cookie) {
            this.cookie = cookie;
            this.cookieExpire = Date.now() + this.cookieTime;
        }
    }
    checkCookie() {
        if (this.cookieExpire < Date.now()) {
            this.cookie = undefined;
        }
    }
    createUrlByParams(args) {
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
exports.HttpClient = HttpClient;
function createFormData(args) {
    let formData = new form_data_1.default();
    Object.entries(args).forEach(([key, value]) => {
        formData.append(key, encodeURIComponent(value));
    });
    return formData;
}
function createSearchParams(args) {
    let params = new url_1.URLSearchParams();
    Object.entries(args).forEach(([key, value]) => {
        params.append(key, value);
    });
    return params;
}
