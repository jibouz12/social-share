import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from 'src/app/core/services/signup.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private formBuilder : FormBuilder,
              private router : Router,
              private signupService : SignupService) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      signupPassword: [null, Validators.required],
    });
  }

  signUp() {
    const password = this.signupForm.get('signupPassword')!.value;
    this.signupService.savePass(password);
    this.router.navigateByUrl('signup')
  }

}
