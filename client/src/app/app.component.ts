import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { SocketService } from './services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public loading: boolean;
  public loggedIn: boolean;

  constructor(private io: SocketService, private auth: AuthService) {
    this.auth.state.subscribe((dt) => {
      this.loading = !dt;
      this.loggedIn = dt == 'logged_in';
    });
  }
}
