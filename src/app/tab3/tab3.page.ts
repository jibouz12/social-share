import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  insta!: string;

  constructor(private authService : AuthService,
              private router : Router) {}

  ionViewDidEnter() {
    this.insta = this.authService.getUserInsta();
  }

  changeAvatar() {
    this.router.navigateByUrl('avatar');
  }

  logOut() {
    this.authService.logout()
  }

}
