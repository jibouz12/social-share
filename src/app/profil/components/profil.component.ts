import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { GPSService } from 'src/app/core/services/GPS.service';
import { Observable } from 'rxjs';
import { GPS } from 'src/app/core/models/GPS.model';



@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit {
  tiktok!: string;
  insta!: string;
  snap!: string;

  latitude!: number;
  longitude!: number;

  user!: string;
  GPS$!: Observable<GPS>;

  constructor(private authService : AuthService,
              private GPSService : GPSService) { }

  ngOnInit() {
    this.tiktok = 'https://tiktok.com/' + this.authService.getUserTiktok();
    this.insta = 'https://instagram.com/' + this.authService.getUserInsta();
    this.snap = 'https://snapchat.com/' + this.authService.getUserSnap();
  }

}
