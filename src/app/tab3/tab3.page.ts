import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  insta!: string;

  constructor(private authService : AuthService,
              private router : Router) {}

  ngOnInit() {
    this.insta = this.authService.getUserInsta();
  }

  changeAvatar() {
    this.router.navigateByUrl('avatar');
  }

  logOut() {
    this.authService.logout()
  }

}
