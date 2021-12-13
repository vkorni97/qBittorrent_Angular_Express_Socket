import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { HomePageComponent } from './view/home-page/home-page.component';
import { LoginPageComponent } from './view/login-page/login-page.component';
import { RegisterPageComponent } from './view/register-page/register-page.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardGuard],
    children: [
      {
        path: '',
        component: HomePageComponent,
      },
    ],
  },
  {
    path: 'Login',
    canActivate: [AuthGuardGuard],
    component: LoginPageComponent,
  },
  {
    path: 'Register',
    canActivate: [AuthGuardGuard],
    component: RegisterPageComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
