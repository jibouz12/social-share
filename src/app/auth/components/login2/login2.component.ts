import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from 'src/app/core/services/signup.service';

@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.scss'],
})
export class Login2Component implements OnInit {
  loginForm!: FormGroup;

  constructor(private router : Router,
              private formBuilder : FormBuilder,
              private signupService : SignupService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      loginEmail: [null, [Validators.required, Validators.email]],
    });
  }

  login() {
    const email = this.loginForm.get('loginEmail')!.value;
    this.signupService.saveEmail(email);
    this.router.navigateByUrl('login')
  }

////////////////////
/// lien vers la page d'inscription
  goToSignup() {
    this.router.navigateByUrl("auth/step1");
  }

}
