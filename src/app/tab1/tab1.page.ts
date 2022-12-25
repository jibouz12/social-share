import { Component } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Observable, tap } from 'rxjs';
import { take } from 'rxjs/internal/operators/take';
import { GPS } from 'src/app/core/models/GPS.model';
import { AuthService } from '../core/services/auth.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  post$!: Observable<GPS[]>;
  latitude!: number;
  longitude!: number;
  spinner!: boolean;
  test!: string

  constructor(private geolocation: Geolocation,
              private authService : AuthService) {}

  
  ionViewDidEnter() {
    this.test = 'test'
  }


//////////////////////////////////////
//////////////////////////////////////
  handleRefresh(event : any) {
    setTimeout(() => {
      this.getLocation()
      event.target.complete();
    }, 1500);
  };

/////////////////////////////////////
////////////////////////////////////
  getLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
     }).catch((error) => {
       console.log('Error getting location', error);
     });

     this.authService.modifyGPS(this.latitude, this.longitude).pipe(
      take(1),
      tap(() => {
        this.post$ = this.authService.closeGPS(this.latitude, this.longitude)
      })
     ).subscribe();
  }


}


