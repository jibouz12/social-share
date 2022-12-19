import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  pseudo!: string;

  constructor(private authService : AuthService) {}

  ngOnInit() {
    this.pseudo = this.authService.getUserPseudo()
  }

}
