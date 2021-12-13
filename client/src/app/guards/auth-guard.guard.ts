import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import {
  filter,
  first,
  map,
  Observable,
  retryWhen,
  Subscription,
  take,
  takeWhile,
} from 'rxjs';
import { InitStates } from '../interfaces/service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardGuard implements CanActivate {
  constructor(private auth: AuthService, private route: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const { currentState } = this.auth;

    if (currentState) return this.checkState(currentState, route);
    else {
      return this.auth.state.pipe(
        filter((cs) => cs != undefined),
        map((cs) => {
          return this.checkState(cs, route);
        })
      );
    }
  }

  private checkState(
    currentState: InitStates | undefined,
    route: ActivatedRouteSnapshot
  ) {
    console.log(currentState);
    if (currentState == 'logged_in') {
      if (['Login', 'Register'].includes(route.routeConfig?.path || '')) {
        this.route.navigate(['']);
      } else return true;
    } else if (currentState == 'login') {
      if (route.routeConfig?.path != 'Login') {
        this.route.navigate(['Login']);
      } else return true;
    } else if (currentState == 'register') {
      if (route.routeConfig?.path != 'Register') {
        this.route.navigate(['Register']);
      } else return true;
    }
    return false;
  }
}
