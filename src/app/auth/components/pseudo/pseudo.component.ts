import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from 'src/app/core/services/signup.service';

@Component({
  selector: 'app-pseudo',
  templateUrl: './pseudo.component.html',
  styleUrls: ['./pseudo.component.scss'],
})
export class PseudoComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private formBuilder : FormBuilder,
              private router : Router,
              private signupService : SignupService) { }

  ngOnInit() : void {
    this.signupForm = this.formBuilder.group({
      signupPseudo: [null, Validators.required],
    });
  }

  signUp() {
    const pseudo = this.signupForm.get('signupPseudo')!.value;
    this.signupService.savePseudo(pseudo);
    this.router.navigateByUrl('step2')
  }

}
