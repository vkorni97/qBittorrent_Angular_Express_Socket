"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const rxjs_1 = require("rxjs");
class Client {
    constructor() {
        this.http = global.http;
        this._data = new rxjs_1.BehaviorSubject(undefined);
        this.rid = 0;
    }
    get data() {
        return this._data.asObservable();
    }
    resetRid() {
        this.rid = 0;
    }
    startMainDataTimer() {
        if (!this.timer) {
            this.timer = setInterval(() => {
                this.getMainData();
            }, 500);
        }
        else
            this.rid = 0;
    }
    clearTimer() {
        if (this.timer)
            clearInterval(this.timer);
        this.timer = undefined;
        this.rid = 0;
    }
    getMainData() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.http.get({
                url: "api/v2/sync/maindata",
                rid: this.rid,
                client: {
                    host: "http://localhost",
                    port: "37188",
                },
            });
            if (res.status == 200) {
                if (res.data.full_update && this.rid != 0) {
                    this.rid = 1;
                }
                else {
                    this.rid = res.data.rid;
                    this._data.next(res.data);
                }
            }
            else if (res.status == 403) {
            }
            //return res.data;
        });
    }
}
exports.Client = Client;
