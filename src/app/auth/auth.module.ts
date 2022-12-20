import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { PseudoComponent } from './components/pseudo/pseudo.component';
import { EmailComponent } from './components/email/email.component';
import { PasswordComponent } from './components/password/password.component';
import { Login2Component } from './components/login2/login2.component';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    PseudoComponent,
    EmailComponent,
    PasswordComponent,
    Login2Component,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
  ],
  exports: [
    LoginComponent,
    SignupComponent,
    PseudoComponent,
    EmailComponent,
    PasswordComponent,
    Login2Component,
  ]
})
export class AuthModule { }
