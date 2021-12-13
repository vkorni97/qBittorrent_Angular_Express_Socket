import { SessionItem } from "./models/sessionItem";

export class Session {
  private _sessions: SessionItem[] = [];

  constructor(sessions?: SessionItem[]) {
    if (sessions) {
      this._sessions = sessions;
    }
  }

  public getSession(id: string) {
    const session = this._sessions.find((session) => session.id == id);
    if (session) {
      if (!session.data) {
        this.removeSession(session.id);
        return this.createSession();
      } else {
        return session;
      }
    } else {
      return this.createSession();
    }
  }

  public createSession(): SessionItem {
    const newSession: SessionItem = new SessionItem();
    this._sessions.push(newSession);
    return newSession;
  }

  public removeSession(id: string) {
    this._sessions = this._sessions.filter((s) => s.id != id);
  }
}
