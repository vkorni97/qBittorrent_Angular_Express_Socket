import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import {
  LoginClientArgs,
  RegisterClientArgs,
  SocketEmit,
} from '../interfaces/service';
import { AuthService } from './auth.service';
import { TorrentService } from './torrent.service';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  public io: Socket;
  private token: string | null;

  constructor(
    private authService: AuthService,
    private torrent: TorrentService
  ) {
    this.token = localStorage.getItem('sessionToken');
    this.io = io('http://localhost:3000', {
      auth: (cb) => cb({ token: this.token }),
    });

    this.io.on('session', (token) => {
      if (this.token != token) {
        localStorage.setItem('sessionToken', token);
        this.token = token;
      }
    });

    this.io.on(SocketEmit.MAINDATA, (data) => {
      this.torrent.setMainData(data);
    });

    this.io.on(SocketEmit.MISSING_SETTINGS, () => {
      this.authService.setState('register');
    });

    this.io.on(SocketEmit.LOGGED_IN, (loggedIn) => {
      if (loggedIn) this.authService.setState('logged_in');
      else this.authService.setState('login');
    });
  }

  public registerClient(args: RegisterClientArgs): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.authService.currentState == 'register') {
        this.io.emit(SocketEmit.REGISTER, args, (response: any) => {
          resolve(response);
        });
      }
    });
  }

  public loginClient(args: LoginClientArgs): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.authService.currentState == 'login') {
        this.io.emit(SocketEmit.LOGIN, args, (response: any) => {
          resolve(response);
        });
      }
    });
  }
}
