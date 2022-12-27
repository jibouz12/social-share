import { Component } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { interval, Observable } from 'rxjs';
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

  constructor(private geolocation: Geolocation,
              private authService : AuthService) {}


  ionViewDidEnter() {
    this.getLocation();
    this.updateGps();

    interval(60000).subscribe(() => {
      this.updateGps();
    })
  }


//////////////////////////////////////
//////////////////////////////////////
  handleRefresh(event : any) {
    setTimeout(() => {
      this.getLocation();
      this.updateGps();
      event.target.complete();
    }, 1500);
  };

/////////////////////////////////////
////////////////////////////////////
  getLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.post$ = this.authService.closeGPS(this.latitude, this.longitude)
    }).catch((error) => {
       console.log('Error getting location', error);
    });
  }

  updateGps() {
    this.authService.modifyGPS(this.latitude, this.longitude).pipe(
      take(1),
    ).subscribe();
  }

}


