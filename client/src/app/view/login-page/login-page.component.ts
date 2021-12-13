import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackService } from 'src/app/modules/components/snack.service';
import { AuthService } from 'src/app/services/auth.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  public userGroup: FormGroup;
  public loading: boolean = false;

  constructor(
    private socket: SocketService,
    private route: Router,
    private snack: SnackService,
    private auth: AuthService
  ) {
    this.userGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl(''),
    });
  }

  ngOnInit(): void {}

  @HostListener('document:keyup.enter')
  handleSubmit() {
    if (this.userGroup.valid) {
      this.loading = true;
      this.socket
        .loginClient({
          ...this.userGroup.value,
        })
        .then((res) => {
          if (res['success']) {
            this.auth.setState('logged_in');
            this.route.navigate(['']);
          } else {
            this.snack.showSnack(res);
          }
          this.loading = false;
        });
    } else {
      this.snack.showErrorSnack('Must give username for your new account!');
    }
  }
}
