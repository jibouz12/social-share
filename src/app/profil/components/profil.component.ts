import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit {
  tiktok!: string;
  insta!: string;
  snap!: string;

  constructor(private authService : AuthService) { }

  ngOnInit() {
    this.tiktok = this.authService.getUserTiktok();
    this.insta = 'https://instagram.com/' + this.authService.getUserInsta();
    this.snap = this.authService.getUserSnap();
  }
}
