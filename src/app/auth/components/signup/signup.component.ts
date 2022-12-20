import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, EMPTY, switchMap, take, tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { GPSService } from 'src/app/core/services/GPS.service';
import { SignupService } from 'src/app/core/services/signup.service';


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
              private GPSService : GPSService,
              private signupService : SignupService) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      insta: [null, Validators.required],
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
/// --> + créer géolocalisation
/// --> redirection vers feed
  signUp() {
    const email = this.signupService.getEmail();
    const password = this.signupService.getPass();
    const pseudo = this.signupService.getPseudo();
    const insta = this.signupForm.get('insta')!.value;
    this.auth.createUser(email, password, pseudo, insta).pipe(
      take(1),
      switchMap(() => this.auth.loginUser(email, password)),
      tap(() => {    
        this.GPSService.createGPS(this.latitude, this.longitude, pseudo, insta).pipe(
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
