import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from 'src/app/core/services/signup.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
})
export class EmailComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private formBuilder : FormBuilder,
              private router : Router,
              private signupService : SignupService) { }

  ngOnInit() : void {
    this.signupForm = this.formBuilder.group({
      signupEmail: [null, [Validators.required, Validators.email]],
    });
  }

  signUp() {
    const email = this.signupForm.get('signupEmail')!.value;
    this.signupService.saveEmail(email);
    this.router.navigateByUrl('step2')
  }

}
