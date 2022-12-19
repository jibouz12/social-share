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
    this.tiktok = this.authService.getUserTiktok();
    this.insta = 'https://instagram.com/' + this.authService.getUserInsta();
    this.snap = this.authService.getUserSnap();


    this.user = this.authService.getUserId();
    this.GPS$ = this.GPSService.getGPSByUserId(this.user);

  }

  createGPS() {
    this.latitude = 1.2;
    this.longitude = 5.14;

    this.GPSService.createGPS(this.latitude, this.longitude).subscribe()
  }
}
