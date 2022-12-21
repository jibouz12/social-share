import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { Constants } from 'src/app/constants/constants';
import { Observable } from 'rxjs/internal/Observable';
import { GPS } from '../models/GPS.model';

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    private userId = "";
    private authToken = "";
    private insta = "";

    constructor(private http: HttpClient,
                private router: Router,
                private constants: Constants) {}

////////////////////////
/// fonction créer chaine de caractères aléatoires
makeRandom(lengthOfCode: number, possible: string) {
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
        return text;
}

////////////////////
/// récupérer le token
/// si il y a un token (xs) dans le LS --> retirer les derniers caractères
/// ( derniers caractètes ont été ajoutés par sécurité)
/// sinon --> récupérer le token Auth
getToken(): string {
    if (localStorage.getItem("xs") != null) {
        return localStorage.getItem("xs")!.slice(0, -9);
    } else {
        return this.authToken;
    }
}

////////////////////
/// récupérer userId
/// ( même principe que pour getToken() )
getUserId(): string {
    if (localStorage.getItem("xl") != null) {
        return localStorage.getItem("xl")!.slice(0, -6);
    } else {
        return this.userId;
    }
}

////////////////////
/// récupérer insta
/// ( même principe que pour getToken() )
getUserInsta(): string {
    if(localStorage.getItem("insta") != null) {
        return localStorage.getItem("insta")!;
    } else {
        return this.insta;
    }
}

////////////////////////////////
/// créer nouvel utilisateur
createUser(email: string, password: string, latitude: number, longitude: number, insta: string) {
    return this.http.post<{ message: string }>(`${this.constants.protocol}://${this.constants.domain}/api/auth/signup`, {email: email, password: password, latitude: latitude, longitude: longitude, insta: insta});
}

//////////////////////
/// connection utilisateur
/// + ajouter infos sécurisées dans le LS
loginUser(email: string, password: string) {
    return this.http.post<{ userId: string, token: string, latitude: number, longitude: number, insta: string }>(`${this.constants.protocol}://${this.constants.domain}/api/auth/login`, {email: email, password: password}).pipe(
        tap(({ userId, token, insta}) => {
            this.userId = userId;
            this.authToken = token;
            this.insta = insta;
        }),
        tap(() => {
            localStorage.setItem("xs", this.authToken + this.makeRandom(9, "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890,./;'-*&^%$#@!~`"));
            localStorage.setItem("xl", this.userId + this.makeRandom(6, "abcdefghijklmnopqrstuvwxyz1234567890"));
            localStorage.setItem("insta", this.insta);
        })
    );
}

/////////////////////////
/// deconnexion utilisateur
logout() {
    this.authToken = '';
    this.router.navigate(['auth/login2']);
    localStorage.clear();
}

/////////////////
/// modifier la localisation
modifyGPS(latitude : number, longitude : number) {
    return this.http.put<{ message: string }>(`${this.constants.protocol}://${this.constants.domain}/api/auth/gps`, {latitude: latitude, longitude: longitude});
}
  
/////////////////
///  localisation proche
closeGPS(latitude: number, longitude: number) : Observable<GPS[]> {
    return this.http.get<GPS[]>(`${this.constants.protocol}://${this.constants.domain}/api/auth/gps/${latitude}+${longitude}`);
}

}