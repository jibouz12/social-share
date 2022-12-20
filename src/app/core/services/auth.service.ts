import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { Constants } from 'src/app/constants/constants';

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    private userId = "";
    private authToken = "";
    private pseudo = "";
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
/// récupérer pseudo
/// ( même principe que pour getToken() )
getUserPseudo(): string {
    if(localStorage.getItem("rs") != null) {
        return localStorage.getItem("rs")!.slice(0, -3);
    } else {
        return this.pseudo;
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
createUser(email: string, password: string, pseudo: string, insta: string) {
    return this.http.post<{ message: string }>(`${this.constants.protocol}://${this.constants.domain}/api/auth/signup`, {email: email, password: password, pseudo: pseudo, insta: insta});
}

//////////////////////
/// connection utilisateur
/// + ajouter infos sécurisées dans le LS
loginUser(email: string, password: string) {
    return this.http.post<{ userId: string, token: string, pseudo: string, insta: string }>(`${this.constants.protocol}://${this.constants.domain}/api/auth/login`, {email: email, password: password}).pipe(
        tap(({ userId, token, pseudo, insta}) => {
            this.userId = userId;
            this.authToken = token;
            this.pseudo = pseudo;
            this.insta = insta;
        }),
        tap(() => {
            localStorage.setItem("xs", this.authToken + this.makeRandom(9, "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890,./;'-*&^%$#@!~`"));
            localStorage.setItem("xl", this.userId + this.makeRandom(6, "abcdefghijklmnopqrstuvwxyz1234567890"));
            localStorage.setItem("rs", this.pseudo + this.makeRandom(3, "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890"));
            localStorage.setItem("insta", this.insta);
        })
    );
}

/////////////////////////
/// deconnexion utilisateur
logout() {
    this.authToken = '';
    this.router.navigate(['auth/login']);
    localStorage.clear();
}

}