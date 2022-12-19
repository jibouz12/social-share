import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit {
  insta!: string;

  constructor(private authService : AuthService) { }

  ngOnInit() {
    this.insta = 'https://instagram.com/' + this.authService.getUserInsta();
  }

}
