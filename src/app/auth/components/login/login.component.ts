import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { catchError, EMPTY, take, tap } from 'rxjs';
import { GPSService } from 'src/app/core/services/GPS.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  errorMsg!: String;

  latitude!: number;
  longitude!: number;

  constructor(private formBuilder : FormBuilder,
              private auth : AuthService,
              private router: Router,
              private geolocation: Geolocation,
              private GPSService : GPSService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      loginEmail: [null, [Validators.required, Validators.email]],
      loginPassword: [null, Validators.required],
    });

    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

/////////////////////
/// connection utilisateur
/// --> redirection vers feed
  login() {
    const email = this.loginForm.get('loginEmail')!.value;
    const password = this.loginForm.get('loginPassword')!.value;
    this.auth.loginUser(email, password).pipe(
      take(1),
      tap(() => {
        this.GPSService.modifyGPS(this.latitude, this.longitude).pipe(
          take(1),
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

////////////////////
/// lien vers la page d'inscription
  goToSignup() {
    this.router.navigateByUrl("auth/signup");
  }


}
