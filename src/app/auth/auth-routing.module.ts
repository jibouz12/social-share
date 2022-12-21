import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailComponent } from './components/email/email.component';
import { LoginComponent } from './components/login/login.component';
import { Login2Component } from './components/login2/login2.component';
import { PasswordComponent } from './components/password/password.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  { path: "login2", component: Login2Component },
  { path: "login", component: LoginComponent },
  { path: "signup", component : SignupComponent },
  { path: "step1", component : EmailComponent },
  { path: "step2", component : PasswordComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],

  exports: [
    RouterModule
  ],
})
export class AuthRoutingModule { }
