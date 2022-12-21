import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  insta!: string;

  constructor(private authService : AuthService) {}

  ngOnInit() {
    this.insta = this.authService.getUserInsta();
  }

  logOut() {
    this.authService.logout()
  }

}
