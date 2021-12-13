import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { InitStates } from '../interfaces/service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private initState: BehaviorSubject<InitStates | undefined>;
  public state: Observable<InitStates | undefined>;

  constructor(private route: Router) {
    this.initState = new BehaviorSubject<InitStates | undefined>(undefined);
    this.state = this.initState.asObservable();
  }

  public get currentState(): InitStates | undefined {
    return this.initState.value;
  }

  public setState(state: InitStates) {
    this.initState.next(state);
    if (state == 'login') this.route.navigate(['Login']);
    else if (state == 'register') this.route.navigate(['Register']);
  }
}
