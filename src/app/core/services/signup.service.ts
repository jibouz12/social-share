import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
  })

  export class SignupService {
    private signPseudo = '';
    private signEmail = '';
    private signPass = '';


    savePseudo(pseudo : string) {
      this.signPseudo = pseudo
    }

    saveEmail(email : string) {
      this.signEmail = email
    }

    savePass(pass : string) {
      this.signPass = pass
    }

    getPseudo() : string {
      return this.signPseudo
    }

    getEmail() : string {
      return this.signEmail
    }

    getPass() : string {
      return this.signPass
    }
    
  }