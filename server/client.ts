import { HttpClient } from "./httpClient";
import { MainDataRes } from "./interfaces/http";
import { Store } from "./store";
import { BehaviorSubject, Subject } from "rxjs";

export class Client {
  private http: HttpClient = global.http;
  private _data: BehaviorSubject<MainDataRes> =
    new BehaviorSubject<MainDataRes>(undefined);
  private rid: number = 0;

  private timer: any;

  constructor() {}

  get data() {
    return this._data.asObservable();
  }

  public resetRid() {
    this.rid = 0;
  }

  public startMainDataTimer() {
    if (!this.timer) {
      this.timer = setInterval(() => {
        this.getMainData();
      }, 500);
    } else this.rid = 0;
  }

  public clearTimer() {
    if (this.timer) clearInterval(this.timer);
    this.timer = undefined;
    this.rid = 0;
  }

  public async getMainData() {
    const res = await this.http.get<MainDataRes>({
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
      } else {
        this.rid = res.data.rid;
        this._data.next(res.data);
      }
    } else if (res.status == 403) {
    }
    //return res.data;
  }
}
