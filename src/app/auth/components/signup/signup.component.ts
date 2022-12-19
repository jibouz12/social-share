import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, EMPTY, switchMap, take, tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { GPSService } from 'src/app/core/services/GPS.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  errorMsg!: string;

  latitude!: number;
  longitude!: number;

  constructor(private formBuilder : FormBuilder,
              private auth : AuthService,
              private router : Router,
              private geolocation: Geolocation,
              private GPSService : GPSService) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      signupEmail: [null, [Validators.required, Validators.email]],
      signupPassword: [null, Validators.required],
      tiktok: [null],
      insta: [null],
      snap: [null]
    });

    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

/////////////////////
/// s'inscrire (créer nouvel utilisateur)
/// --> + fonction connection
/// --> redirection vers feed
  signUp() {
    const email = this.signupForm.get('signupEmail')!.value;
    const password = this.signupForm.get('signupPassword')!.value;
    const tiktok = this.signupForm.get('tiktok')!.value;
    const insta = this.signupForm.get('insta')!.value;
    const snap = this.signupForm.get('snap')!.value;
    this.auth.createUser(email, password, tiktok, insta, snap).pipe(
      take(1),
      switchMap(() => this.auth.loginUser(email, password)),
      tap(() => {    
        this.GPSService.createGPS(this.latitude, this.longitude).pipe(
          take(1)
        ).subscribe();
      }),
      tap(() => {
        this.router.navigate(['']);
      }),
      catchError(error => {
        this.errorMsg = error.message;
        return EMPTY;
      })
    ).subscribe();
  }

}
