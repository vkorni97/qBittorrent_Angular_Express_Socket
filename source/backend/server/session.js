"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
const sessionItem_1 = require("./models/sessionItem");
class Session {
    constructor(sessions) {
        this._sessions = [];
        if (sessions) {
            this._sessions = sessions;
        }
    }
    getSession(id) {
        const session = this._sessions.find((session) => session.id == id);
        if (session) {
            if (!session.data) {
                this.removeSession(session.id);
                return this.createSession();
            }
            else {
                return session;
            }
        }
        else {
            return this.createSession();
        }
    }
    createSession() {
        const newSession = new sessionItem_1.SessionItem();
        this._sessions.push(newSession);
        return newSession;
    }
    removeSession(id) {
        this._sessions = this._sessions.filter((s) => s.id != id);
    }
}
exports.Session = Session;
