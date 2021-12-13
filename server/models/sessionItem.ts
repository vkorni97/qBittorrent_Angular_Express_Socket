export class SessionItem {
  public maxAge: number = 4 * 60 * 60 * 1000;
  public expire: number;
  private _data: { [key: string]: any } = {};
  private _id: string;

  constructor(obj: Partial<Pick<SessionItem, "maxAge">> = {}) {
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

  set data(val: any) {
    if (!this.isExpired()) this._data = val;
  }

  private isExpired(): boolean {
    if (Date.now() > this.expire) {
      return true;
    }
    this.expire = Date.now() + this.maxAge;
    return false;
  }
}
