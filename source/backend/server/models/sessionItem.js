"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionItem = void 0;
class SessionItem {
    constructor(obj = {}) {
        this.maxAge = 4 * 60 * 60 * 1000;
        this._data = {};
        Object.assign(this, obj);
        this._id = "id_" + Math.random().toString(16).slice(2);
        this.expire = Date.now() + this.maxAge;
    }
    get id() {
        if (this.isExpired()) {
            return undefined;
        }
        return this._id;
    }
    get data() {
        if (this.isExpired()) {
            return undefined;
        }
        return this._data;
    }
    set data(val) {
        if (!this.isExpired())
            this._data = val;
    }
    isExpired() {
        if (Date.now() > this.expire) {
            return true;
        }
        this.expire = Date.now() + this.maxAge;
        return false;
    }
}
exports.SessionItem = SessionItem;
