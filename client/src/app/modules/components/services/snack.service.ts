import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Alert } from '../interfaces/interface';

@Injectable({
  providedIn: 'root',
})
export class SnackService {
  private _alert: Subject<Alert> = new Subject<Alert>();

  public alert: Observable<Alert>;
  public counter: number = 0;

  constructor() {
    this.alert = this._alert.asObservable();
  }

  showSnack(alert: Omit<Alert, 'i'>) {
    this._alert.next({ ...alert, i: this.counter++ });
  }

  showSuccessSnack(msg: string) {
    this.showSnack({ msg, success: true });
  }

  showErrorSnack(msg: string) {
    this.showSnack({ msg, success: false });
  }
}
