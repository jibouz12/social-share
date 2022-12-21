import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
  })

  export class SignupService {
    private signEmail = '';
    private signPass = '';


    saveEmail(email : string) {
      this.signEmail = email
    }

    savePass(pass : string) {
      this.signPass = pass
    }

    getEmail() : string {
      return this.signEmail
    }

    getPass() : string {
      return this.signPass
    }
    
  }