import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackService } from 'src/app/modules/components/services/snack.service';
import { AuthService } from 'src/app/services/auth.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  public userGroup: FormGroup;
  public clientGroup: FormGroup;
  public loading: boolean = false;

  constructor(
    private socket: SocketService,
    private route: Router,
    private snack: SnackService,
    private auth: AuthService
  ) {
    this.userGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
    this.clientGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl(''),
      host: new FormControl('', [Validators.required]),
      port: new FormControl(''),
    });
  }

  ngOnInit(): void {}

  @HostListener('document:keyup.enter')
  handleSubmit() {
    if (this.userGroup.valid && this.clientGroup.valid) {
      this.loading = true;
      this.socket
        .registerClient({
          user: this.userGroup.value,
          client: this.clientGroup.value,
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
      if (!this.userGroup.valid) {
        this.snack.showErrorSnack(
          'Must give username and password for your new account!'
        );
      } else {
        this.snack.showErrorSnack('Must fill required fields!');
      }
    }
  }
}
